namespace dot {
    export class Rect {
        get left() { return this.pos.left; }
        get top() { return this.pos.top; }
        get width() { return this.pos.width; }
        get height() { return this.pos.height; }
        get right() { return this.left + this.width; }
        get bottom() { return this.top + this.height; }
        constructor(public pos: Vec2, public size: Vec2) { }
    }
    export namespace rect {
        export function contains(r: Rect, v: Vec2): boolean {
            return util.isInRange(v.x, r.left, r.right) && util.isInRange(v.y, r.top, r.bottom);
        }
        export function scale(r: Rect, s: number): Rect {
            return new Rect(
                vec2.scale(r.pos, s),
                vec2.scale(r.size, s)
            );
        }
        export function overlapping(a: Rect, b: Rect): boolean {
            const ox = b.pos.x - a.pos.x;
            const oy = b.pos.y - a.pos.y;
            return -b.size.x < ox && ox < a.size.x && -b.size.y < oy && oy < a.size.y;
        }
    }
}