namespace dot {
    export class GameOptions {
        update: () => void;
        scoreColor?: number;
        textColor?: number;
        gameTitle?: string;
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

        let gameOpts: GameOptions;
        export function start(opts: GameOptions) {
            setTimeout(() => {
                input.block();
                _internal.input.block();
                opts.scoreColor = opts.scoreColor || Color.Red;
                opts.textColor = opts.textColor || Color.Blue;
                gameOpts = opts;
                score = 0;
                _activeScores = [];
                state = GameState.Title;
            }, 0);
        }

        export function end() {
            gotoGameOver();
        }

        function drawScoreboard() {
            pushCurrentColor(gameOpts.scoreColor);
            draw.text(
                new Vec2(2, 2),
                "" + Math.floor(score), false, TextAlignment.Left,
                scoreboardFont);
            draw.text(
                new Vec2(SCREEN_WIDTH, 2),
                "HI " + Math.floor(high), false, TextAlignment.Right,
                scoreboardFont);
            popCurrentColor();
        }

        function drawTitle() {
            if (gameOpts.gameTitle) {
                pushCurrentColor(gameOpts.textColor);
                draw.text(
                    new Vec2(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 3),
                    gameOpts.gameTitle, false, TextAlignment.Center,
                    titleFont);
                popCurrentColor();
            }
            if (tick % 80 < 40) {
                pushCurrentColor(gameOpts.textColor);
                draw.text(
                    new Vec2(SCREEN_WIDTH / 2, SCREEN_HEIGHT * 5 / 6),
                    "PRESS ANY KEY", false, TextAlignment.Center,
                    image.font5);
                popCurrentColor();
            }
        }

        function drawGameOver() {
            pushCurrentColor(gameOpts.textColor);
            draw.text(
                new Vec2(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - titleFont.charHeight / 2),
                "GAME OVER", false, TextAlignment.Center,
                titleFont);
            popCurrentColor();
        }

        function gotoPlaying() {
            input.block();
            _internal.input.block();
            tick = 0;
            score = 0;
            _activeScores = [];
            state = GameState.Playing;
        }

        function gotoGameOver() {
            input.block();
            _internal.input.block();
            if (score > high) {
                high = score;
            }
            state = GameState.GameOver;
        }

        export namespace _control {
            export function update() {
                if (!gameOpts) return;

                difficulty = tick / 3600 + 1;

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

                drawScoreboard();

                if (state === GameState.Title) {
                    drawTitle();
                }
                if (state === GameState.GameOver) {
                    drawGameOver();
                }

                ++tick;

                collision.clear();
            }
        }
    }
}