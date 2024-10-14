namespace dot {
    export class Collidable {
        constructor(
            public rect: Rect,
            public color: Color,
            public _mask: Color[]) { }
    }
    export class Collision {
        constructor(
            public src: Rect,
            public dst: Rect,
            public color: Color) { }
    }
    export class CollisionReporter {
        _id: number;
        _gen: number;
        _srcs: Collidable[];
        _collisions: Collision[];
        constructor() {
            this._srcs= [];
            this._collisions = [];
            collision._internal.register(this);
        }
        _add(rect: Rect, color: Color, mask: Color[]) {
            this._srcs.push(new Collidable(rect, color, mask));
            collision._internal.enqueue(this);
        }
        collisions(): Collision[] {
            if (this._gen !== collision._internal.gen) throw "Don't cache CollisionReporters across updates";
            collision._internal.calc();
            return this._collisions;
        }
    }
    export namespace collision {
        const reporters: CollisionReporter[] = [];
        const dirty: CollisionReporter[] = [];

        export namespace _internal {
            let nextId = 0;
            export let gen = 0;
            export function clear() {
                gen++;
                reporters.splice(0, reporters.length);
                dirty.splice(0, dirty.length);
            }
            export function register(reporter: CollisionReporter) {
                reporter._id = nextId++;
                reporter._gen = gen;
                reporters.push(reporter);
                enqueue(reporter);
            }
            export function enqueue(reporter: CollisionReporter) {
                if (reporter._gen !== gen) throw "Don't cache CollisionReporters across updates";
                if (!dirty.find(r => r._id === reporter._id)) {
                    dirty.push(reporter);
                }
            }
            function calcCollisions(r0: CollisionReporter, r1: CollisionReporter) {
                const srcs = r0._srcs;
                const dsts = r1._srcs;

                for (const src of srcs) {
                    for (const dst of dsts) {
                        if (rect.overlapping(src.rect, dst.rect)) {
                            r0._collisions.push(new Collision(
                                src.rect, dst.rect, dst.color))
                            r1._collisions.push(new Collision(
                                dst.rect, src.rect, dst.color))
                        }
                    }
                }
            }
            export function calc() {
                if (dirty.length) {
                    // if any are dirty, recalc all collisions -- can optimize later

                    // Clear all collisions
                    reporters.forEach(r => {
                        r._collisions.splice(0, r._collisions.length);
                    });

                    const n = reporters.length;
                    for (let i = 0; i < n; ++i) {
                        const r0 = reporters[i];
                        for (let j = i + 1; j < n; ++j) {
                            const r1 = reporters[j];
                            calcCollisions(r0, r1);
                        }
                    }

                    dirty.splice(0, dirty.length);
                }
            }
        }
    }
}
