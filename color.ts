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
        Cyan = 9,
        Purple = 0xa,
        LightPurple = 0xb,
        DarkPurple = 0xc,
        Tan = 0xd,
        Brown = 0xe,
        Black = 0xf
    }

    const ALL_COLORS: Color[] = [
        Color.White,
        Color.Red,
        Color.Pink,
        Color.Orange,
        Color.Yellow,
        Color.Teal,
        Color.Green,
        Color.Blue,
        Color.Cyan,
        Color.Purple,
        Color.LightPurple,
        Color.DarkPurple,
        Color.Tan,
        Color.Brown,
        Color.Black
    ];


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
        export function allExcept(ex: Color[]): Color[] {
            return ALL_COLORS.slice().filter(c => ex.indexOf(c) === -1);
        }
        export function all(): Color[] {
            return ALL_COLORS.slice();
        }
        export namespace _internal {
            export function reset() {
                _colorStack = [Color.Red];
            }
        }
    }
}
