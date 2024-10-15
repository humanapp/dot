namespace dot {
    export enum GameState {
        Title,
        Playing,
        GameOver
    }

    export let scoreboardColor: Color = Color.Red;
    export let textColor: Color = Color.Blue;
    export let gameTitle: string = "MY GAME";
    export let gameDescription: string = "";
    export let insertCoinText: string = "PRESS ANY KEY";

    export namespace game {
        export let tick = 0;
        export let difficulty = 1;
        export let score = 0;
        export let high = 0;
        export let state = GameState.Title;
        let restartAt = 0;
        const scoreboardFont = image.scaledFont(image.font5, 2);
        const titleFont = image.scaledFont(image.font8, 2);
        let _gameOverText = "GAME OVER";
        let _gameUpdate: () => void;

        export function start(gameUpdate: () => void) {
            _gameUpdate = gameUpdate;
            restartAt = 0;
            setTimeout(() => {
                input.block();
                dot._input_internal.input.block();
                scores._internal.init();
                particles._internal.init();
                state = GameState.Title;
            }, 0);
        }

        export function end(gameOverText?: string) {
            if (state === GameState.Playing) {
                gotoGameOver(gameOverText);
            }
        }

        function drawScoreboard() {
            color.push(scoreboardColor);
            draw.text(
                new Vec(2, 2),
                "" + Math.floor(score), TextAlignment.Left,
                scoreboardFont);
            draw.text(
                new Vec(SCREEN_WIDTH, 2),
                "HI " + Math.floor(high), TextAlignment.Right,
                scoreboardFont);
            color.pop();
        }

        function drawTitle() {
            if (gameTitle) {
                color.push(textColor);
                draw.text(
                    new Vec(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 3),
                    gameTitle, TextAlignment.Center,
                    titleFont);
                draw.text(
                    new Vec(SCREEN_WIDTH / 2, 8 + SCREEN_HEIGHT / 2),
                    gameDescription, TextAlignment.Center,
                    image.font8);
                color.pop();
            }
            if (tick % 80 < 40) {
                color.push(textColor);
                const text = insertCoinText || "PRESS ANY KEY";
                draw.text(
                    new Vec(SCREEN_WIDTH / 2, SCREEN_HEIGHT * 5 / 6),
                    text, TextAlignment.Center,
                    image.font5);
                color.pop();
            }
        }

        function drawGameOver() {
            color.push(textColor);
            const text = _gameOverText || "GAME OVER";
            draw.text(
                new Vec(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - titleFont.charHeight / 2),
                text, TextAlignment.Center,
                titleFont);
            color.pop();
        }

        function gotoPlaying() {
            input.block();
            _input_internal.input.block();
            tick = 0;
            score = 0;
            difficulty = 1;
            scores._internal.init();
            particles._internal.init();
            state = GameState.Playing;
        }

        function gotoGameOver(gameOverText: string) {
            input.block();
            _input_internal.input.block();
            if (score > high) {
                high = score;
            }
            _gameOverText = gameOverText;
            restartAt = tick + 100;
            state = GameState.GameOver;
        }

        export namespace _internal {
            export function update() {
                if (!_gameUpdate) return;

                if (state === GameState.Playing) {
                    difficulty = tick / 3600 + 1;
                }

                if (state === GameState.Title && _input_internal.input.justPressed) {
                    gotoPlaying();
                }
                if ((restartAt && restartAt < tick) || (state === GameState.GameOver && _input_internal.input.justPressed)) {
                    start(_gameUpdate);
                }

                _gameUpdate();

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