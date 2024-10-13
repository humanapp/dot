game.stats = true;

namespace dot.test {
    const opts = new GameOptions();
    opts.update = gameUpdate;
    opts.gameTitle = "BOX CLIMB";

    dot.game.start(opts);

    function gameUpdate() {
        scene.setBackgroundColor(Color.Tan);
        setColor(Color.White);
        const t = 40;
        const f = 10;
        const s = -Math.sin(dot.game.tick / f) * t;
        const c = Math.cos(dot.game.tick / f) * t;
        const p0 = new Vec2(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
        const p1 = vec2.add(p0, new Vec2(s, c));
        dot.draw.line(
            p0, p1,
            3, 2);

        if (game.state === GameState.Playing) {
            if (input.justPressed) {
                game.end();
            }
            if (game.tick % f === 0) {
                scores.add(
                    10,
                    p1,
                    Color.LightPurple);
            }
        }
    }
}