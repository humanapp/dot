namespace dot {
    export interface Collision {
        collidingWith: {
            rect: { [color: number]: boolean };
        }
    }
    export interface HitBox {
        rect: Rect;
        coll: Collision;
    }
    export namespace collision {
        export let hitboxes: HitBox[] = [];
        interface CollisionSet { [color: number]: boolean };
        function emptySet(): CollisionSet {
            const collSet: CollisionSet = {};
            for (let i = 0; i < NUM_COLORS; ++i) {
                collSet[i] = false;
            }
            return collSet;
        }
        export function mergeSets(dst: CollisionSet, src: CollisionSet): CollisionSet {
            for (let i = 0; i < NUM_COLORS; ++i) {
                dst[i] = dst[i] || src[i];
            }
            return dst;
        }
        export function mkCollision(): Collision {
            return {
                collidingWith: {
                    rect: emptySet()
                }
            }
        }
        export function mergeCollisions(dst: Collision, src: Collision): Collision {
            dst.collidingWith.rect = mergeSets(dst.collidingWith.rect, src.collidingWith.rect);
            return dst;
        }
        export function clear() {
            hitboxes = [];
        }
        export function addHitbox(box: HitBox) {
            hitboxes.push(box);
        }
        export function checkHitboxes(box: HitBox): Collision {
            let collision = mkCollision();
            hitboxes.forEach((b) => {
                if (testCollision(box, b)) {
                    collision = {
                        collidingWith: {
                            rect: mergeSets(collision.collidingWith.rect, b.coll.collidingWith.rect)
                        }
                    }
                }
            });
            return collision;
        }
        function testCollision(r1: HitBox, r2: HitBox) {
            return rect.overlapping(r1.rect, r2.rect);
        }
    }
}
