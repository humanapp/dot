game.stats = true;

namespace test {
    dot.gameTitle = "DOT TEST";
    dot.gameDescription = "testing features";
    dot.insertCoinText = "INSERT COIN";
    dot.game.start(gameUpdate);

    const rand = new dot.Random();

    class Box {
        r: dot.Rect;
        c: dot.Color;
        v: dot.Vec;
        id: string;
    }

    let collisions = new dot.Set<boolean>();

    const duck = img`
        . . . . . . . . . . b 5 b . . .
        . . . . . . . . . b 5 b . . . .
        . . . . . . b b b b b b . . . .
        . . . . . b b 5 5 5 5 5 b . . .
        . . . . b b 5 d 1 f 5 d 4 c . .
        . . . . b 5 5 1 f f d d 4 4 4 b
        . . . . b 5 5 d f b 4 4 4 4 b .
        . . . b d 5 5 5 5 4 4 4 4 b . .
        . b b d d d 5 5 5 5 5 5 5 b . .
        b d d d b b b 5 5 5 5 5 5 5 b .
        c d d b 5 5 d c 5 5 5 5 5 5 b .
        c b b d 5 d c d 5 5 5 5 5 5 b .
        c b 5 5 b c d d 5 5 5 5 5 5 b .
        b b c c c d d d 5 5 5 5 5 d b .
        . . . . c c d d d 5 5 5 b b . .
        . . . . . . c c c c c b b . . .
    `;

    const boxes: Box[] = [];
    const boxColors: dot.Color[] = dot.color.allExcept([dot.Color.White, dot.Color.Tan]);
    for (let i = 0; i < 5; ++i) {
        const sz = 10;
        let b = new Box();
        b.r = new dot.Rect(
            new dot.Vec(
                rand.get(0, dot.SCREEN_WIDTH - sz),
                rand.get(0, dot.SCREEN_HEIGHT - sz)),
            new dot.Vec(sz, sz));
        b.c = rand.select(boxColors);
        b.v = new dot.Vec(
            rand.get(-3, 3),
            rand.get(-3, 3));
        b.id = "box" + i;
        boxes.push(b);
    }
    
    let d = 1;
    let a = 0;
    const f = 20;

    function gameUpdate() {
        if (dot.game.tick === 0) {
            d = 1;
            a = 0;
        }
        scene.setBackgroundColor(dot.Color.Tan);
        a += dot.game.difficulty * d / f;
        const p0 = dot.vec.make(dot.SCREEN_WIDTH / 2, dot.SCREEN_HEIGHT / 2);
        const p1 = dot.vec.fromAngle(a).scale(dot.SCREEN_WIDTH / 2).add(p0);
        dot.color.set(dot.Color.White);
        const det = dot.draw.line(p0, p1, 3);
        dot.color.set(dot.Color.LightPurple);
        dot.draw.arc(
            p0,
            (dot.game.tick / 4) % (dot.SCREEN_WIDTH / 2),
            1, 0, Math.PI * 2, dot.color.noncollidable());

        dot.draw.img(p1, duck, true);

        boxes.forEach(b => {
            b.r.pos.x += b.v.x * dot.game.difficulty;
            b.r.pos.y += b.v.y * dot.game.difficulty;
            if (b.r.pos.x < 0 || b.r.pos.x > dot.SCREEN_WIDTH - b.r.size.x) b.v.x *= -1;
            if (b.r.pos.y < 0 || b.r.pos.y > dot.SCREEN_HEIGHT - b.r.size.y) b.v.y *= -1;
            dot.color.set(b.c);
            dot.draw.box(b.r.pos, b.r.size, false, dot.color.none(), b.id);
        });

        if (dot.game.state === dot.GameState.Playing) {
            if (dot.input.Left.justPressed) {
                d = -1;
            } else if (dot.input.Right.justPressed) {
                d = 1;
            } else if (dot.input.justPressed) {
                dot.game.end();
            }

            const colls = det.collisions();
            for (const coll of colls) {
                if (!coll.dst.id) continue;
                if (collisions.has(coll.dst.id)) continue;
                const pos = coll.dst.rect.center();
                dot.color.set(coll.dst.color);
                dot.scores.add(10, pos);
                dot.particles.add(pos, 10, 2, Math.PI / 2, Math.PI / 6);
            }
            collisions.clear();
            for (const coll of colls) {
                if (coll.dst.id) {
                    collisions.set(coll.dst.id, true);
                }
            }
        }
    }
}
