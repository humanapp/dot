namespace dot {
    export namespace gfx {
        enum GfxCommandType {
            Rect,
            Box,
            Icon,
            Img
        }
        class GfxCommand {
            constructor(public type: GfxCommandType) { }
        }
        class GfxRectCommand extends GfxCommand {
            constructor(public x: number, public y: number, public w: number, public h: number, public color: number) {
                super(GfxCommandType.Rect);
            }
        }
        class GfxBoxCommand extends GfxCommand {
            constructor(public x: number, public y: number, public w: number, public h: number, public color: number) {
                super(GfxCommandType.Box);
            }
        }
        class GfxIconCommand extends GfxCommand {
            constructor(public x: number, public y: number, public buf: Buffer, public color: number) {
                super(GfxCommandType.Icon);
            }
        }
        class GfxImgCommand extends GfxCommand {
            constructor(public x: number, public y: number, public img: Image) {
                super(GfxCommandType.Img);
            }
        }
        const commands: GfxCommand[] = [];
        export function rect(x: number, y: number, width: number, height: number) {
            commands.push(new GfxRectCommand(x, y, width, height, color.curr()))
        }
        export function box(x: number, y: number, width: number, height: number) {
            commands.push(new GfxBoxCommand(x, y, width, height, color.curr()))
        }
        export function icon(x: number, y: number, buf: Buffer) {
            commands.push(new GfxIconCommand(x, y, buf, color.curr()));
        }
        export function img(x: number, y: number, img: Image) {
            commands.push(new GfxImgCommand(x, y, img));
        }
        export namespace _internal {
            export function update() {
                commands.forEach(cmd => {
                    switch (cmd.type) {
                        case GfxCommandType.Rect: {
                            const c = cmd as GfxRectCommand;
                            screen.drawRect(c.x, c.y, c.w, c.h, c.color);
                            break;
                        }
                        case GfxCommandType.Box: {
                            const c = cmd as GfxBoxCommand;
                            screen.fillRect(c.x, c.y, c.w, c.h, c.color);
                            break;
                        }
                        case GfxCommandType.Icon: {
                            const c = cmd as GfxIconCommand;
                            screen.drawIcon(c.buf, c.x, c.y, c.color);
                            break;
                        }
                        case GfxCommandType.Img: {
                            const c = cmd as GfxImgCommand;
                            screen.drawTransparentImage(c.img, c.x, c.y);
                            break;
                        }
                    }
                });
                commands.splice(0, commands.length);
            }
        }

    }
}