game.stats = true;

namespace test {
    const rand = new dot.Random();
    const opts = new dot.GameOptions();
    opts.update = gameUpdate;
    opts.gameTitle = "DOT TEST";
    opts.insertCoinText = "INSERT COIN";
    dot.game.start(opts);

    class Box {
        r: dot.Rect;
        c: dot.Color;
        v: dot.Vec2;
    }

    const boxes: Box[] = [];
    const boxColors: dot.Color[] = [
        dot.Color.Red,
        dot.Color.Pink,
        dot.Color.Orange,
        dot.Color.Yellow,
        dot.Color.Teal,
        dot.Color.Green,
        dot.Color.Blue,
        dot.Color.LightBlue,
        dot.Color.Purple,
        dot.Color.LightPurple,
        dot.Color.DarkPurple,
        dot.Color.Brown,
        dot.Color.Black
    ];
    [0, 0, 0, 0, 0].forEach(() => {
        const sz = 10;
        let b = new Box();
        b.r = new dot.Rect(
            new dot.Vec2(
                rand.get(0, dot.SCREEN_WIDTH - sz),
                rand.get(0, dot.SCREEN_HEIGHT - sz)),
            new dot.Vec2(sz, sz));
        b.c = rand.select(boxColors);
        b.v = new dot.Vec2(
            rand.get(-3, 3),
            rand.get(-3, 3));
        boxes.push(b);
    });

    function gameUpdate() {
        scene.setBackgroundColor(dot.Color.Tan);
        const f = 20;
        const s = -Math.sin(dot.game.tick / f);
        const c = Math.cos(dot.game.tick / f);
        const p0 = new dot.Vec2(dot.SCREEN_WIDTH / 2, dot.SCREEN_HEIGHT / 2);
        const p1 = dot.vec2.add(p0, dot.vec2.mk(s, c).scale(dot.SCREEN_HEIGHT * 0.6));
        dot.color.set(dot.Color.White);
        const det = dot.draw.line(p0, p1, 3, 0, boxColors);

        boxes.forEach(b => {
            b.r.pos.x += b.v.x;
            b.r.pos.y += b.v.y;
            if (b.r.pos.x < 0 || b.r.pos.x > dot.SCREEN_WIDTH - b.r.size.x) b.v.x *= -1;
            if (b.r.pos.y < 0 || b.r.pos.y > dot.SCREEN_HEIGHT - b.r.size.y) b.v.y *= -1;
            dot.color.set(b.c);
            dot.draw.box(b.r);
        });

        if (dot.game.state === dot.GameState.Playing) {
            if (dot.input.justPressed) {
                dot.game.end();
            }

            const colls = det.collisions();
            for (const coll of colls) {
                const pos = coll.dst.center();
                dot.scores.add(
                    10,
                    pos,
                    dot.Color.LightPurple);
                dot.color.set(coll.color);
                dot.particles.add(
                    pos, 10, 2, Math.PI / 2, Math.PI / 6
                );
            }
        }
    }
}