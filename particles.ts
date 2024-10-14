namespace dot {
    class Particle {
        public pos: Vec2;
        public vel: Vec2;
        public color: Color;
        public ticks: number;
        static create() { return new Particle(); }
        static init(
            particle: Particle,
            args: any[]) {
            const pos: Vec2 = args[0];
            const vel: Vec2 = args[1];
            const color: Color = args[2];
            const ticks: number = args[3];
            particle.pos = pos;
            particle.vel = vel;
            particle.color = color;
            particle.ticks = ticks;
        }
    };

    const pool = new Pool<Particle>(
        () => Particle.create(),
        (p, a) => Particle.init(p, a));
    const random = new Random();

    export namespace particles {
        export function add(
            pos: Vec2,
            count = 16,
            speed = 1,
            angle = 0,
            angleWidth = Math.PI * 2
        ) {
            if (count < 1) {
                if (random.get() > count) {
                    return;
                }
                count = 1;
            }
            for (let i = 0; i < count; i++) {
                const a = angle + random.get(angleWidth) - angleWidth / 2;
                pool.alloc([
                    vec2.dup(pos),
                    new Vec2(speed * random.get(0.5, 1), 0).rotate(a),
                    color.curr(),
                    Math.clamp(10, 60, random.get(10, 20) * Math.sqrt(Math.abs(speed)))]);
            }
        }

        export namespace _internal {
            export function init() {
                pool.reset();
            }
            export function update() {
                const c = color.curr();
                pool.update(p => {
                    p.ticks--;
                    if (p.ticks < 0) {
                        return true;
                    }
                    p.pos.add(p.vel);
                    p.vel.scale(0.98);
                    color.set(p.color);
                    gfx.rect(p.pos.x, p.pos.y, 1, 1);
                    return false;
                });
                color.set(c);
            }
        }
    }
}