namespace dot {
    class Button {
        _isPressed = false;
        _justPressed = false;
        _justReleased = false;
        _block = false;

        constructor(private condition: () => boolean, private src: controller.Button) { }

        get isPressed(): boolean {
            return !this._block && this.condition() && this._isPressed;
        }
        get justPressed(): boolean {
            return !this._block && this.condition() && this._justPressed;
        }
        get justReleased(): boolean {
            return !this._block && this.condition() && this._justReleased;
        }

        update() {
            const wasPressed = this._isPressed;
            this._isPressed = this.src.isPressed();
            this._justPressed = !wasPressed && this._isPressed;
            this._justReleased = wasPressed && !this._isPressed;
            if (!this._isPressed) this._block = false;
        }
        reset() {
            this._isPressed = false;
            this._justPressed = false;
            this._justReleased = false;
            this._block = false;
        }
        block() {
            if (this._isPressed) {
                this._block = true;
            }
        }
    }

    class Input {
        _isPressed = false;
        _justPressed = false;
        _justReleased = false;

        get isPressed(): boolean {
            return this.condition() && this._isPressed;
        }
        get justPressed(): boolean {
            return this.condition() && this._justPressed;
        }
        get justReleased(): boolean {
            return this.condition() && this._justReleased;
        }

        _A: Button;
        _B: Button;
        _Up: Button;
        _Down: Button;
        _Left: Button;
        _Right: Button;

        get A(): Button {
            return this._A;
        }
        get B(): Button {
            return this._B;
        }
        get Up(): Button {
            return this._Up;
        }
        get Down(): Button {
            return this._Down;
        }
        get Left(): Button {
            return this._Left;
        }
        get Right(): Button {
            return this._Right;
        }

        constructor(private condition: () => boolean) {
            this._A = new Button(condition, controller.A);
            this._B = new Button(condition, controller.B);
            this._Up = new Button(condition, controller.up);
            this._Down = new Button(condition, controller.down);
            this._Left = new Button(condition, controller.left);
            this._Right = new Button(condition, controller.right);
        }

        update() {
            this._A.update();
            this._B.update();
            this._Up.update();
            this._Down.update();
            this._Left.update();
            this._Right.update();
            this._isPressed = this._A.isPressed || this._B.isPressed || this._Up.isPressed || this._Down.isPressed || this._Left.isPressed || this._Right.isPressed;
            this._justPressed = this._A.justPressed || this._B.justPressed || this._Up.justPressed || this._Down.justPressed || this._Left.justPressed || this._Right.justPressed;
            this._justReleased = this._A.justReleased || this._B.justReleased || this._Up.justReleased || this._Down.justReleased || this._Left.justReleased || this._Right.justReleased;
        }
        reset() {
            this._A.reset();
            this._B.reset();
            this._Up.reset();
            this._Down.reset();
            this._Left.reset();
            this._Right.reset();
            this._isPressed = false;
            this._justPressed = false;
            this._justReleased = false;
        }
        block() {
            this._A.block();
            this._B.block();
            this._Up.block();
            this._Down.block();
            this._Left.block();
            this._Right.block();
            this._isPressed = false;
            this._justPressed = false;
            this._justReleased = false;
        }
    }

    // Input for public consumption. Only works during gameplay.
    export const input = new Input(() => game.state === GameState.Playing);

    export namespace _input_internal {
        // Input for private consumption. Works in all game states.
        export const input = new Input(() => true);
    }
}
