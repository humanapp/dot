namespace dot {
    const scoreFont = image.font8;

    let scoreId = 0;
    export let _activeScores: {
        id: number,
        str: string,
        pos: Vec2,
        vy: number,
        deathTick: number,
        color: number
    }[] = [];

    export namespace scores {
        export function add(value: number, pos: Vec2, color: number) {
            game.score += value;
            const prefix = value > 0 ? "+" : "";
            const str = `${prefix}${Math.floor(value)}`;
            _activeScores.push({
                id: ++scoreId,
                str,
                pos: new Vec2(pos.x, pos.y - scoreFont.charHeight / 2),
                vy: -2,
                deathTick: game.tick + 30,
                color
            });
        }
        export namespace _internal {
            export function update() {
                remove(_activeScores, (s) => {
                    pushColor(s.color);
                    draw.text(s.pos, s.str, false, TextAlignment.Center, scoreFont);
                    s.pos.y += s.vy;
                    s.vy *= 0.9;
                    return s.deathTick <= game.tick;
                    popColor();
                });
            }
        }
    }
}