namespace dot {
    const colorStack: number[] = [5];
    export function getColor(): number {
        return colorStack[colorStack.length - 1];
    }
    export function setColor(color: number) {
        colorStack[colorStack.length - 1] = color;
    }
    export function pushColor(color: number) {
        colorStack.push(color);
    }
    export function popColor(): number {
        if (colorStack.length > 1) {
            colorStack.pop();
        }
        return getColor();
    }
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
}
