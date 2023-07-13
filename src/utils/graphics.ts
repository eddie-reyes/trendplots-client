import Two from 'two.js';
import { ZUI } from 'two.js/extras/jsm/zui';

import { Position, DailyTrend, DailyInstance } from './types';
import { TrendGraphic } from './TrendGraphic';

export const SIZE_FACTOR = 0.015;

let trendGraphics: Array<TrendGraphic> = [];

const elem = document.getElementById('graphics')!;
export const two = new Two({
    type: Two.Types.canvas,
    fullscreen: true,
    autostart: true,
}).appendTo(elem);

const BOUNDS = {
    x: 2000,
    y: 1000,
};

const notAvailable = two.makeText('Data not available.', two.width / 2, two.height / 2);
notAvailable.opacity = 0.2;
notAvailable.visible = false;
notAvailable.scale = 2;

const zui = new ZUI(two.scene);
zui.addLimits(0.5, 200);
zui.zoomSet(1, two.width / 2, two.height / 2);

let mousePivot = new Two.Vector();
let isDragging = false;

export const createGraphics = (trends: DailyTrend[]) => {
    trends.forEach(trend => {
        const trendGraphic = new TrendGraphic(trend.name, trend.instances);
        trendGraphics.push(trendGraphic);
    });
};

export const setGraphics = (hour: number) => {
    trendGraphics.forEach(graphic => {
        const currentInstance = graphic.instances.find(instance => instance.hour === hour);

        currentInstance ? graphic.render(currentInstance.value * SIZE_FACTOR) : graphic.hide();
    });

    notAvailable.visible = trendGraphics.every(trend => !trend.graphicsGroup.visible)
        ? true
        : false;

    two.update();
};

export const resetGraphics = () => {
    trendGraphics.forEach(trend => trend.graphicsGroup.remove());
    trendGraphics = [];
};

export const getNonOverlappingPos = (instances: DailyInstance[]) => {
    const visibleTrendGraphics: Array<TrendGraphic> = trendGraphics.filter(
        graphic => graphic.graphicsGroup.visible === true
    );

    let randPos = getRandPos();
    let isOverlapping = true;

    while (isOverlapping) {
        const overlapTest = visibleTrendGraphics.every(graphic => {
            let graphicPos = graphic.graphicsGroup.position;
            let x = randPos.x - graphicPos.x;
            let y = randPos.y - graphicPos.y;
            let distance = Math.sqrt(x * x + y * y);

            return (
                distance >
                Math.max(...instances.map(instance => instance.value)) * SIZE_FACTOR +
                    Math.max(...graphic.instances.map(instance => instance.value)) * SIZE_FACTOR
            );
        });

        if (overlapTest) {
            return randPos;
        } else {
            randPos = getRandPos();
        }
    }
};

const getRandPos = () => {
    let randPos: Position = {
        x: Math.random() * BOUNDS.x - (BOUNDS.x - two.width) / 2,
        y: Math.random() * BOUNDS.y - (BOUNDS.y - two.height) / 2,
    };

    return randPos;
};

const checkOOB = () => {
    let projectedPos = zui.clientToSurface(two.width / 2, two.height / 2);
    let distfromCenter = new Two.Vector(
        projectedPos.x - two.width / 2,
        projectedPos.y - two.height / 2
    );

    if (Math.abs(distfromCenter.x) >= BOUNDS.x / 2) {
        zui.translateSurface(
            -((Math.sign(distfromCenter.x) * BOUNDS.x) / 2 - distfromCenter.clone().x),
            0
        );
    }
    if (Math.abs(distfromCenter.y) >= BOUNDS.y / 2) {
        zui.translateSurface(
            0,
            -((Math.sign(distfromCenter.y) * BOUNDS.y) / 2 - distfromCenter.clone().y)
        );
    }
};

['mousemove', 'touchmove'].forEach(type => {
    elem.addEventListener(type, (e: any) => {
        if (isDragging) {
            zui.translateSurface(e.clientX - mousePivot.x, e.clientY - mousePivot.y);

            mousePivot.set(e.clientX, e.clientY);
            checkOOB();
        }
    });
});

['mousedown', 'touchdown'].forEach(type => {
    elem.addEventListener(type, (e: any) => {
        isDragging = true;
        mousePivot.set(e.clientX, e.clientY);
    });
});

['mouseup', 'touchup'].forEach(type => {
    elem.addEventListener(type, () => {
        isDragging = false;
    });
});

elem.addEventListener('mouseleave', () => {
    isDragging = false;
});

elem.addEventListener('wheel', (e: WheelEvent) => {
    e.stopPropagation();

    let dy = -e.deltaY / 1000;
    zui.zoomBy(dy, e.clientX, e.clientY);

    checkOOB();
});
