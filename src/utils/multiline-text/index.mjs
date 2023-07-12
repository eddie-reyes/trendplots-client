import Two from 'two.js';
import wrap from 'word-wrapper';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

const flag = (name) => (target, property) => {
    const privateProperty = `_${property}`;
    const flagproperty = `_flag${name[0].toUpperCase()}${name.slice(1)}`;
    Object.defineProperty(target, property, {
        get() {
            return this[privateProperty];
        },
        set(value) {
            this[privateProperty] = value;
            this[flagproperty] = true;
        }
    });
};
class MultilineText extends Two.Group {
    constructor(message, x = 0, y = 0, { width = Infinity, measure = 'font', mode = 'normal', family = 'sans-serif', size = 13, weight = 500, style = 'normal', leading = 1.2, absoluteLeading = false, alignment = 'middle', fill = '#000', stroke = 'transparent', linewidth = 1, decoration = 'none', baseline = 'middle', opacity = 1, visible = true } = {}) {
        super();
        this._flagWrapping = true;
        this._flagStyle = true;
        this._measureLength = (text, start, end, width) => ({
            start,
            end: start + Math.min(width, end - start)
        });
        this._measureFont = (text, start, end, width) => {
            while (this.context.measureText(text.slice(start, end)).width > width) {
                end--;
            }
            return { start, end };
        };
        this.translation.set(x, y);
        this.width = width;
        this.measure = measure;
        this.mode = mode;
        this.value = message;
        this.family = family;
        this.size = size;
        this.leading = leading;
        this.absoluteLeading = absoluteLeading;
        this.alignment = alignment;
        this.fill = fill;
        this.stroke = stroke;
        this.linewidth = linewidth;
        this.weight = weight;
        this.style = style;
        this.decoration = decoration;
        this.baseline = baseline;
        this.opacity = opacity;
        this.visible = visible;
    }
    get computedLeading() {
        return this.absoluteLeading ? this.leading : this.size * this.leading;
    }
    get context() {
        const value = (typeof OffscreenCanvas === 'function'
            ? new OffscreenCanvas(1, 1)
            : document.createElement('canvas')).getContext('2d');
        Object.defineProperty(MultilineText.prototype, 'context', {
            value,
            writable: false,
            configurable: false
        });
        return value;
    }
    get _measureMonospace() {
        const charWidth = this.context.measureText('M').width;
        return (text, start, end, width) => ({
            start,
            end: start + Math.min(end - start, ~~(width / charWidth), ~~((end - start) * charWidth))
        });
    }
    _prepareMeasureContext() {
        this.context.font = `${this.style} ${this.weight} ${this.size}px ${this.family}`;
    }
}
__decorate([
    flag('wrapping')
], MultilineText.prototype, "width", void 0);
__decorate([
    flag('wrapping')
], MultilineText.prototype, "measure", void 0);
__decorate([
    flag('wrapping')
], MultilineText.prototype, "mode", void 0);
__decorate([
    flag('wrapping')
], MultilineText.prototype, "value", void 0);
__decorate([
    flag('wrapping')
], MultilineText.prototype, "family", void 0);
__decorate([
    flag('wrapping')
], MultilineText.prototype, "size", void 0);
__decorate([
    flag('wrapping')
], MultilineText.prototype, "weight", void 0);
__decorate([
    flag('style')
], MultilineText.prototype, "style", void 0);
__decorate([
    flag('style')
], MultilineText.prototype, "leading", void 0);
__decorate([
    flag('style')
], MultilineText.prototype, "absoluteLeading", void 0);
__decorate([
    flag('style')
], MultilineText.prototype, "alignment", void 0);
__decorate([
    flag('style')
], MultilineText.prototype, "fill", void 0);
__decorate([
    flag('style')
], MultilineText.prototype, "stroke", void 0);
__decorate([
    flag('style')
], MultilineText.prototype, "linewidth", void 0);
__decorate([
    flag('style')
], MultilineText.prototype, "decoration", void 0);
__decorate([
    flag('style')
], MultilineText.prototype, "baseline", void 0);
__decorate([
    flag('style')
], MultilineText.prototype, "opacity", void 0);
__decorate([
    flag('style')
], MultilineText.prototype, "visible", void 0);
Object.assign(MultilineText.prototype, {
    _update(bubbles) {
        if (this._flagWrapping) {
            let measure;
            if (this.measure === 'length') {
                measure = this._measureLength;
            }
            else {
                this._prepareMeasureContext();
                measure = this.measure === 'monospace'
                    ? this._measureMonospace
                    : this._measureFont;
            }
            const texts = this.children;
            const lines = wrap
                .lines(this.value, {
                measure,
                width: this.width,
                mode: this.mode
            })
                .map(({ start, end }) => this.value.slice(start, end));
            while (texts.length > lines.length) {
                this.remove(texts[0]);
            }
            texts.forEach((text, index) => {
                text.value = lines[index].trim();
            });
            while (texts.length < lines.length) {
                this.add(new Two.Text(lines[texts.length].trim(), 0, 0));
            }
            this._flagStyle = true;
        }
        if (this._flagStyle) {
            const { family, size, computedLeading: leading, alignment, fill, stroke, linewidth, style, weight, decoration, baseline, opacity, visible } = this;
            let offset = 0;
            switch (alignment) {
                case 'end':
                    offset = this.width;
                    break;
                case 'center':
                    offset = this.width / 2;
                    break;
            }
            this.children.forEach((text, index) => {
                text.family = family;
                text.size = size;
                text.leading = leading;
                text.alignment = alignment;
                text.fill = fill;
                text.stroke = stroke;
                text.linewidth = linewidth;
                text.style = style;
                text.weight = weight;
                text.decoration = decoration;
                text.baseline = baseline;
                text.opacity = opacity;
                text.visible = visible;
                text.translation.set(offset, leading * index);
            });
        }
        Two.Group.prototype
            ._update.call(this, bubbles);
        return this;
    },
    flagReset() {
        this._flagWrapping = this._flagStyle = false;
        Two.Group.prototype
            .flagReset.call(this);
        return this;
    }
});

export { MultilineText };
//# sourceMappingURL=index.mjs.map
