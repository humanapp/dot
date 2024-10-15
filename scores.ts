namespace dot {
    export let scoreFont = image.font8;

    class Score {
        public str: string;
        public pos: Vec2;
        public vy: number;
        public deathTick: number;
        public color: Color;
        static create() { return new Score(); }
        static init(
            score: Score,
            args: any[]
        ) {
            const str: string = args[0];
            const pos: Vec2 = args[1];
            const vy: number = args[2];
            const deathTick: number = args[3];
            const color: Color = args[4];
            score.str = str;
            score.pos = pos;
            score.vy = vy;
            score.deathTick = deathTick;
            score.color = color;
        }
    };

    const pool = new Pool<Score>(
        () => Score.create(),
        (s, a) => Score.init(s, a));

    export namespace scores {
        export function add(value: number, pos: Vec2) {
            if (game.state === GameState.Playing) {
                game.score += value;
            }
            const prefix = value > 0 ? "+" : "";
            const str = `${prefix}${Math.floor(value)}`;
            pool.alloc([
                str,
                new Vec2(pos.x, pos.y - scoreFont.charHeight / 2),
                -2,
                game.tick + 30,
                color.curr()]);
        }
        export namespace _internal {
            export function init() {
                pool.reset();
            }
            export function update() {
                const c = color.curr();
                pool.update(s => {
                    color.set(s.color);
                    draw.text(s.pos, s.str, TextAlignment.Center, scoreFont);
                    s.pos.y += s.vy;
                    s.vy *= 0.9;
                    return s.deathTick <= game.tick;
                });
                color.set(c);
            }
        }
    }
}