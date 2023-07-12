import { Circle } from 'two.js/src/shapes/circle';
import { Group } from 'two.js/src/group';
import { DailyInstance } from './types';

import { MultilineText } from 'twojs-multiline-text-fixed';

import { two, getNonOverlappingPos, SIZE_FACTOR } from './graphics';

export class TrendGraphic {
    graphicsGroup: Group = two.makeGroup();
    isInitalized = false;
    label: MultilineText;
    circle: Circle;
    instances: DailyInstance[];

    constructor(text: string, instances: DailyInstance[]) {
        this.circle = two.makeCircle(0, 0, 0);
        this.label = new MultilineText(text, 0, 0, {
            width: 100,
        });

        this.graphicsGroup.add(this.circle, this.label);
        this.graphicsGroup.visible = false;

        this.circle.noStroke();
        this.circle.fill = `hsl(${Math.random() * 360}, 75%, 75%)`;

        this.label.noStroke();
        this.label.weight = 700;

        this.instances = instances;
    }

    render(radius: number) {
        this.graphicsGroup.visible = true;
        this.circle.radius = radius;
        this.label.scale = radius * SIZE_FACTOR;

        if (this.label.children.length === 2) {
            this.label.position.set(0, -radius * 0.1); //for some reason a for loop breaks two js so instead i check each length individually
        }

        if (this.label.children.length === 3) {
            this.label.position.set(0, -radius * 0.2);
        }

        if (!this.isInitalized) {
            const defaultPos = getNonOverlappingPos(this.instances);
            this.graphicsGroup.position.set(defaultPos!.x, defaultPos!.y);
            this.isInitalized = true;
        }
    }

    hide() {
        this.graphicsGroup.visible = false;
    }
}
