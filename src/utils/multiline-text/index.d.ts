import Two from 'two.js';
type Text = Pick<
    InstanceType<typeof Two.Text>,
    | 'value'
    | 'family'
    | 'size'
    | 'leading'
    | 'alignment'
    | 'fill'
    | 'stroke'
    | 'linewidth'
    | 'style'
    | 'weight'
    | 'decoration'
    | 'baseline'
    | 'opacity'
    | 'visible'
    | 'rotation'
    | 'scale'
    | 'translation'
    | 'clone'
    | 'getBoundingClientRect'
>;
export declare class MultilineText extends Two.Group implements Text {
    private _flagWrapping;
    private _flagStyle;
    width: number;
    measure: 'font' | 'monospace' | 'length';
    mode: 'normal' | 'pre' | 'nowrap';
    value: string;
    family: string;
    size: number;
    weight: number;
    style: string;
    leading: number;
    absoluteLeading: boolean;
    alignment: string;
    fill: string;
    stroke: string;
    linewidth: number;
    decoration: string;
    baseline: string;
    opacity: number;
    visible: boolean;
    constructor(
        message: string,
        x?: number,
        y?: number,
        {
            width,
            measure,
            mode,
            family,
            size,
            weight,
            style,
            leading,
            absoluteLeading,
            alignment,
            fill,
            stroke,
            linewidth,
            decoration,
            baseline,
            opacity,
            visible,
        }?: {
            width?: number;
            measure?: 'font' | 'monospace' | 'length';
            mode?: 'normal' | 'pre' | 'nowrap';
            family?: string;
            size?: number;
            weight?: number;
            style?: string;
            leading?: number;
            absoluteLeading?: boolean;
            alignment?: string;
            fill?: string;
            stroke?: string;
            linewidth?: number;
            decoration?: string;
            baseline?: string;
            opacity?: number;
            visible?: boolean;
        }
    );
    get computedLeading(): number;
    private get context();
    private get _measureMonospace();
    private _measureLength;
    private _measureFont;
    private _prepareMeasureContext;
}
export {};
//# sourceMappingURL=multiline-text.d.ts.map
