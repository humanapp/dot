namespace dot {
    // matches enum in game/game.ts
    export enum Color {
        Transparent = 0,
        White = 1,
        Red = 2,
        Pink = 3,
        Orange = 4,
        Yellow = 5,
        Teal = 6,
        Green = 7,
        Blue = 8,
        LightBlue = 9,
        Purple = 0xa,
        LightPurple = 0xb,
        DarkPurple = 0xc,
        Tan = 0xd,
        Brown = 0xe,
        Black = 0xf
    }

    export const ALL_COLORS: Color[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0xa, 0xb, 0xc, 0xd, 0xe, 0xf];

    export namespace color {
        let _colorStack: Color[] = [Color.Red];
        export function curr(): Color {
            return _colorStack[_colorStack.length - 1];
        }
        export function set(color: Color) {
            _colorStack[_colorStack.length - 1] = color;
        }
        export function push(color: Color) {
            _colorStack.push(color);
        }
        export function pop(): Color {
            if (_colorStack.length > 1) {
                _colorStack.pop();
            }
            return curr();
        }
        export function allExcept(c: Color): Color[] {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0xa, 0xb, 0xc, 0xd, 0xe, 0xf].filter(n => n !== c);
        }
        export namespace _internal {
            export function reset() {
                _colorStack = [Color.Red];
            }
        }
    }
}
