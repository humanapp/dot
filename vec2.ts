namespace dot {
    export class Vec2 {
        constructor(public x: number, public y: number) { }
        public add(v: Vec2): this {
            this.x += v.x;
            this.y += v.y;
            return this;
        }
        public sub(v: Vec2): this {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        }
    }
    export namespace vec2 {
        export function left(v: Vec2): number {
            return v.x;
        }
        export function top(v: Vec2): number {
            return v.y;
        }
        export function add(a: Vec2, b: Vec2): Vec2 {
            return new Vec2(
                a.x + b.x,
                a.y + b.y
            );
        }
        export function sub(a: Vec2, b: Vec2): Vec2 {
            return new Vec2(
                a.x - b.x,
                a.y - b.y
            );
        }
        export function mul(a: Vec2, b: Vec2): Vec2 {
            return new Vec2(
                a.x * b.x,
                a.y * b.y
            );
        }
        export function div(a: Vec2, b: Vec2): Vec2 {
            return new Vec2(
                a.x / b.x,
                a.y / b.y
            );
        }
        export function scale(v: Vec2, s: number): Vec2 {
            return new Vec2(
                v.x * s,
                v.y * s
            );
        }
        export function clamp(v: Vec2, lo: Vec2, hi: Vec2): Vec2 {
            return new Vec2(
                Math.clamp(lo.x, hi.x, v.x),
                Math.clamp(lo.y, hi.y, v.y)
            );
        }
        export function wrap(v: Vec2, lo: Vec2, hi: Vec2): Vec2 {
            return new Vec2(
                util.wrap(lo.x, hi.x, v.x),
                util.wrap(lo.y, hi.y, v.y)
            );
        }
        export function transpose(v: Vec2): Vec2 {
            return new Vec2(v.y, v.x);
        }
        export function lengthSq(v: Vec2): number {
            return v.x * v.x + v.y * v.y;
        }
        export function length(v: Vec2): number {
            return Math.sqrt(lengthSq(v));
        }
        export function normal(v: Vec2): Vec2 {
            const len = length(v);
            if (len === 0) return v;
            return scale(v, 1 / len);
        }
        export function rotate(v: Vec2, a: number): Vec2 {
            return new Vec2(
                v.x * Math.cos(a) - v.y * Math.sin(a),
                v.x * Math.sin(a) + v.y * Math.cos(a)
            );
        }
        export function angle(v: Vec2): number {
            return Math.atan2(v.y, v.x);
        }
        export function angleTo(a: Vec2, b: Vec2): number {
            return Math.atan2(b.y - a.y, b.x - a.x);
        }
        export function distanceBetween(a: Vec2, b: Vec2): number {
            return length(sub(a, b))
        }
        export function equals(a: Vec2, b: Vec2): boolean {
            return (a.x === b.x && a.y === b.y);
        }
        export function floor(v: Vec2): Vec2 {
            return new Vec2(
                Math.floor(v.x),
                Math.floor(v.y)
            );
        }
        export function ceil(v: Vec2): Vec2 {
            return new Vec2(
                Math.ceil(v.x),
                Math.ceil(v.y)
            );
        }
        export function round(v: Vec2): Vec2 {
            return new Vec2(
                Math.round(v.x),
                Math.round(v.y)
            );
        }
        export function abs(v: Vec2): Vec2 {
            return new Vec2(
                Math.abs(v.x),
                Math.abs(v.y)
            );
        }
        export function min(v: Vec2): number {
            return Math.min(v.x, v.y);
        }
        export function max(v: Vec2): number {
            return Math.max(v.x, v.y);
        }
        export function maj(v: Vec2): Vec2 {
            return new Vec2(
                Math.abs(v.x) >= Math.abs(v.y) ? Math.sign(v.x) : 0,
                Math.abs(v.y) >= Math.abs(v.x) ? Math.sign(v.y) : 0,
            );
        }
    }
}
