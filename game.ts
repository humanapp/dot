namespace dot {
    export class GameOptions {
        update: () => void;
        scoreColor?: number;
        textColor?: number;
        gameTitle?: string;
        insertCoinText?: string;
    }
    export enum GameState {
        Title,
        Playing,
        GameOver
    }

    export namespace game {
        export let tick = 0;
        export let difficulty = 1;
        export let score = 0;
        export let high = 0;
        export let state = GameState.Title;
        const scoreboardFont = image.scaledFont(image.font5, 2);
        const titleFont = image.scaledFont(image.font8, 2);
        let _gameOverText = "GAME OVER";

        let gameOpts: GameOptions;
        export function start(opts: GameOptions) {
            setTimeout(() => {
                input.block();
                _internal.input.block();
                opts.scoreColor = opts.scoreColor || Color.Red;
                opts.textColor = opts.textColor || Color.Blue;
                gameOpts = opts;
                score = 0;
                scores._internal.init();
                particles._internal.init();
                state = GameState.Title;
            }, 0);
        }

        export function end(gameOverText?: string) {
            gotoGameOver(gameOverText);
        }

        function drawScoreboard() {
            color.push(gameOpts.scoreColor);
            if (state !== GameState.Title) {
                draw.text(
                    new Vec2(2, 2),
                    "" + Math.floor(score), TextAlignment.Left,
                    scoreboardFont);
            }
            draw.text(
                new Vec2(SCREEN_WIDTH, 2),
                "HI " + Math.floor(high), TextAlignment.Right,
                scoreboardFont);
            color.pop();
        }

        function drawTitle() {
            if (gameOpts.gameTitle) {
                color.push(gameOpts.textColor);
                draw.text(
                    new Vec2(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 3),
                    gameOpts.gameTitle, TextAlignment.Center,
                    titleFont);
                color.pop();
            }
            if (tick % 80 < 40) {
                color.push(gameOpts.textColor);
                const insertCoinText = gameOpts.insertCoinText || "PRESS ANY KEY";
                draw.text(
                    new Vec2(SCREEN_WIDTH / 2, SCREEN_HEIGHT * 5 / 6),
                    insertCoinText, TextAlignment.Center,
                    image.font5);
                color.pop();
            }
        }

        function drawGameOver() {
            color.push(gameOpts.textColor);
            const text = _gameOverText || "GAME OVER";
            draw.text(
                new Vec2(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - titleFont.charHeight / 2),
                text, TextAlignment.Center,
                titleFont);
            color.pop();
            if (tick % 80 < 40) {
                color.push(gameOpts.textColor);
                draw.text(
                    new Vec2(SCREEN_WIDTH / 2, SCREEN_HEIGHT * 5 / 6),
                    "PRESS ANY KEY", TextAlignment.Center,
                    image.font5);
                color.pop();
            }
        }

        function gotoPlaying() {
            input.block();
            _internal.input.block();
            tick = 0;
            score = 0;
            difficulty = 1;
            scores._internal.init();
            particles._internal.init();
            state = GameState.Playing;
        }

        function gotoGameOver(gameOverText: string) {
            input.block();
            _internal.input.block();
            if (score > high) {
                high = score;
            }
            _gameOverText = gameOverText;
            state = GameState.GameOver;
        }

        export namespace _control {
            export function update() {
                if (!gameOpts) return;

                if (state === GameState.Playing) {
                    difficulty = tick / 3600 + 1;
                }

                if (state === GameState.Title && dot._internal.input.justPressed) {
                    gotoPlaying();
                }
                if (state === GameState.GameOver && dot._internal.input.justPressed) {
                    start(gameOpts);
                }

                if (gameOpts.update) {
                    gameOpts.update()
                }

                scores._internal.update();
                particles._internal.update();

                drawScoreboard();

                if (state === GameState.Title) {
                    drawTitle();
                }
                if (state === GameState.GameOver) {
                    drawGameOver();
                }

                ++tick;

                collision._internal.clear();
                color._internal.reset();
            }
        }
    }
}