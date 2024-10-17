namespace dot {
    export class Vec {
        get left() { return this.x; }
        get top() { return this.y; }
        get width() { return this.x; }
        get height() { return this.y; }
        set left(v: number) { this.x = v; }
        set top(v: number) { this.y = v; }
        set width(v: number) { this.x = v; }
        set height(v: number) { this.y = v; }
        constructor(public x: number, public y: number) { }
        public add(v: Vec): this {
            this.x += v.x;
            this.y += v.y;
            return this;
        }
        public sub(v: Vec): this {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        }
        public mul(v: Vec): this {
            this.x *= v.x;
            this.y *= v.y;
            return this;
        }
        public scale(s: number): this {
            this.x *= s;
            this.y *= s;
            return this;
        }
        public rotate(a: number): this {
            const x = this.x * Math.cos(a) - this.y * Math.sin(a);
            const y = this.x * Math.sin(a) + this.y * Math.cos(a);
            this.x = x;
            this.y = y;
            return this;
        }
        public set(x: number, y: number): this {
            this.x = x;
            this.y = y;
            return this;
        }
        public setn(s: number): this {
            this.x = s;
            this.y = s;
            return this;
        }
        public setv(v: Vec): this {
            this.x = v.x;
            this.y = v.y;
            return this;
        }
        public length(): number {
            return vec.length(this);
        }
        public distanceTo(v: Vec): number {
            return vec.distanceBetween(this, v);
        }
        public addWithAngle(angle: number, length: number): this {
            this.x += Math.cos(angle) * length;
            this.y += Math.sin(angle) * length;
            return this;
        }
    }
    export namespace vec {
        export function make(x: number, y: number): Vec {
            return new Vec(x, y);
        }
        export function zero(): Vec {
            return new Vec(0, 0);
        }
        export function fromScalar(s: number): Vec {
            return new Vec(s, s);
        }
        export function fromAngle(a: number): Vec {
            const x = Math.cos(a);
            const y = Math.sin(a);
            return new Vec(x, y);
        }
        export function dup(v: Vec): Vec {
            return new Vec(v.x, v.y);
        }
        export function add(a: Vec, b: Vec): Vec {
            return new Vec(
                a.x + b.x,
                a.y + b.y
            );
        }
        export function sub(a: Vec, b: Vec): Vec {
            return new Vec(
                a.x - b.x,
                a.y - b.y
            );
        }
        export function mul(a: Vec, b: Vec): Vec {
            return new Vec(
                a.x * b.x,
                a.y * b.y
            );
        }
        export function div(a: Vec, b: Vec): Vec {
            return new Vec(
                a.x / b.x,
                a.y / b.y
            );
        }
        export function scale(v: Vec, s: number): Vec {
            return new Vec(
                v.x * s,
                v.y * s
            );
        }
        export function clamp(v: Vec, lo: Vec, hi: Vec): Vec {
            return new Vec(
                Math.clamp(lo.x, hi.x, v.x),
                Math.clamp(lo.y, hi.y, v.y)
            );
        }
        export function wrap(v: Vec, lo: Vec, hi: Vec): Vec {
            return new Vec(
                util.wrap(lo.x, hi.x, v.x),
                util.wrap(lo.y, hi.y, v.y)
            );
        }
        export function transpose(v: Vec): Vec {
            return new Vec(v.y, v.x);
        }
        export function lengthSq(v: Vec): number {
            return v.x * v.x + v.y * v.y;
        }
        export function length(v: Vec): number {
            return Math.sqrt(lengthSq(v));
        }
        export function normal(v: Vec): Vec {
            const len = length(v);
            if (len === 0) return v;
            return scale(v, 1 / len);
        }
        export function rotate(v: Vec, a: number): Vec {
            return new Vec(
                v.x * Math.cos(a) - v.y * Math.sin(a),
                v.x * Math.sin(a) + v.y * Math.cos(a)
            );
        }
        export function angle(v: Vec): number {
            return Math.atan2(v.y, v.x);
        }
        export function angleTo(a: Vec, b: Vec): number {
            return Math.atan2(b.y - a.y, b.x - a.x);
        }
        export function distanceBetween(a: Vec, b: Vec): number {
            return length(sub(a, b))
        }
        export function equals(a: Vec, b: Vec): boolean {
            return (a.x === b.x && a.y === b.y);
        }
        export function floor(v: Vec): Vec {
            return new Vec(
                Math.floor(v.x),
                Math.floor(v.y)
            );
        }
        export function ceil(v: Vec): Vec {
            return new Vec(
                Math.ceil(v.x),
                Math.ceil(v.y)
            );
        }
        export function round(v: Vec): Vec {
            return new Vec(
                Math.round(v.x),
                Math.round(v.y)
            );
        }
        export function abs(v: Vec): Vec {
            return new Vec(
                Math.abs(v.x),
                Math.abs(v.y)
            );
        }
        export function min(v: Vec): number {
            return Math.min(v.x, v.y);
        }
        export function max(v: Vec): number {
            return Math.max(v.x, v.y);
        }
        export function maj(v: Vec): Vec {
            return new Vec(
                Math.abs(v.x) >= Math.abs(v.y) ? Math.sign(v.x) : 0,
                Math.abs(v.y) >= Math.abs(v.x) ? Math.sign(v.y) : 0,
            );
        }
    }
}
