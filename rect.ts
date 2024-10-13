namespace dot {
    export class Rect {
        constructor(public pos: Vec2, public size: Vec2) { }
    }
    export namespace rect {
        export function mk(pos: Vec2, size: Vec2): Rect {
            return new Rect(pos, size);
        }
        export function left(r: Rect): number {
            return r.pos.x;
        }
        export function top(r: Rect): number {
            return r.pos.y;
        }
        export function right(r: Rect): number {
            return left(r) + width(r);
        }
        export function bottom(r: Rect): number {
            return top(r) + height(r);
        }
        export function width(r: Rect): number {
            return r.size.x;
        }
        export function height(r: Rect): number {
            return r.size.y;
        }
        export function contains(r: Rect, v: Vec2): boolean {
            return util.isInRange(v.x, left(r), right(r)) && util.isInRange(v.y, top(r), bottom(r));
        }
        export function scale(r: Rect, s: number): Rect {
            return mk(
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