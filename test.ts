game.stats = true;

namespace dot.test {
    const opts = new GameOptions();
    opts.update = gameUpdate;
    opts.gameTitle = "BOX CLIMB";

    dot.game.start(opts);

    function gameUpdate() {
        scene.setBackgroundColor(Color.Tan);
        setCurrentColor(Color.White);
        const t = 100;
        const f = 100;
        const s = Math.abs(Math.sin(dot.game.tick / f)) * t;
        const c = Math.abs(Math.cos(dot.game.tick / f)) * t;
        dot.draw.line(
            new Vec2(0, 0),
            new Vec2(SCREEN_WIDTH, SCREEN_HEIGHT),
            s, 8);

        if (game.state === GameState.Playing) {
            if (input.justPressed) {
                game.end();
            }
            if (game.tick % 50 === 0) {
                scores.add(
                    10,
                    new Vec2(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2),
                    Color.Green);
            }
        }
    }
}