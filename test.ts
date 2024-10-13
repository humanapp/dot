game.stats = true;

namespace test {
    const opts = new dot.GameOptions();
    opts.update = gameUpdate;
    opts.gameTitle = "DOT TEST";
    opts.insertCoinText = "insert coin";
    dot.game.start(opts);

    class Box {
        r: dot.Rect;
        c: dot.Color;
        v: dot.Vec2;
    }

    const boxes: Box[] = [];
    [0, 0, 0, 0, 0].forEach(() => {
        const sz = 10;
        let b = new Box();
        b.r = new dot.Rect(
            new dot.Vec2(
                Math.randomRange(0, dot.SCREEN_WIDTH - sz),
                Math.randomRange(0, dot.SCREEN_HEIGHT - sz)),
            new dot.Vec2(sz, sz));
        b.c = Math.pickRandom([1,2,3,4,5,6,7,8,9,0xa,0xb,0xc,0xe,0xf]);
        b.v = new dot.Vec2(
            Math.randomRange(-3, 3),
            Math.randomRange(-3, 3));
        boxes.push(b);
    })

    function gameUpdate() {
        scene.setBackgroundColor(dot.Color.Tan);
        dot.setColor(dot.Color.White);
        const f = 20;
        const s = -Math.sin(dot.game.tick / f);
        const c = Math.cos(dot.game.tick / f);
        const p0 = new dot.Vec2(dot.SCREEN_WIDTH / 2, dot.SCREEN_HEIGHT / 2);
        const p1 = dot.vec2.add(p0, dot.vec2.mk(s, c).scale(dot.SCREEN_HEIGHT * 0.6));
        dot.draw.line(
            p0, p1,
            3);

        boxes.forEach(b => {
            b.r.pos.x += b.v.x;
            b.r.pos.y += b.v.y;
            if (b.r.pos.x < 0 || b.r.pos.x > dot.SCREEN_WIDTH - b.r.size.x) b.v.x *= -1;
            if (b.r.pos.y < 0 || b.r.pos.y > dot.SCREEN_HEIGHT - b.r.size.y) b.v.y *= -1;
            dot.setColor(b.c);
            dot.draw.box(b.r);
        });

        if (dot.game.state === dot.GameState.Playing) {
            if (dot.input.justPressed) {
                dot.game.end();
            }
            if (dot.game.tick % f === 0) {
                dot.scores.add(
                    10,
                    p1,
                    dot.Color.LightPurple);
                dot.setColor(dot.Color.Red);
                dot.particles.add(
                    p1, 10, 2, Math.PI / 2, Math.PI / 6
                );
            }
        }
    }
}