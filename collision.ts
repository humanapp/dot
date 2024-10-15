namespace dot {
    export class Collidable {
        constructor(
            public id: string,
            public rect: Rect,
            public color: Color,
            public _mask: Color[]) { }
    }
    export class Collision {
        constructor(
            public src: Collidable,
            public dst: Collidable) { }
    }
    export class CollisionReporter {
        _id: number;
        _gen: number;
        _srcs: Collidable[];
        _collisions: Collision[];
        constructor(id: number, gen: number) {
            this._id = id;
            this._gen = gen;
            this._srcs = [];
            this._collisions = [];
        }
        _add(id: string, rect: Rect, c: Color, mask: Color[]) {
            if (!color.isNoncollidable(mask)) {
                this._srcs.push(new Collidable(id, rect, c, mask));
                collision._internal.enqueue(this);
            }
        }
        collisions(): Collision[] {
            if (this._gen !== collision._internal.gen) throw "Don't cache CollisionReporters across updates";
            collision._internal.calc();
            return this._collisions;
        }
        collidingWith(color: Color): boolean {
            const colls = this.collisions();
            for (const coll of colls) {
                if (coll.dst.color === color) return true;
            }
            return false;
        }
    }
    export namespace collision {
        const reporters: CollisionReporter[] = [];
        const dirty: CollisionReporter[] = [];

        export function newReporter(): CollisionReporter {
            const reporter = new CollisionReporter(++_internal.nextId, _internal.gen);
            reporters.push(reporter);
            _internal.enqueue(reporter);
            return reporter;
        }

        export namespace _internal {
            export let nextId = 0;
            export let gen = 0;
            export function clear() {
                gen++;
                reporters.splice(0, reporters.length);
                dirty.splice(0, dirty.length);
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
                        if (!src._mask && !dst._mask) continue;
                        if (rect.overlapping(src.rect, dst.rect)) {
                            if (src._mask && src._mask.find(c => c === dst.color)) {
                                r0._collisions.push(new Collision(src, dst));
                            }
                            if (dst._mask && dst._mask.find(c => c === src.color)) {
                                r1._collisions.push(new Collision(dst, src));
                            }
                        }
                    }
                }
            }
            export function calc() {
                if (dirty.length) {
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
