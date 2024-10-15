namespace dot {
    export namespace gfx {
        enum GfxCommandType {
            Rect,
            Box,
            Icon
        }
        class GfxCommand {
            constructor(public type: GfxCommandType, public color: number) { }
        }
        class GfxRectCommand extends GfxCommand {
            constructor(public x: number, public y: number, public w: number, public h: number, color: number) {
                super(GfxCommandType.Rect, color);
            }
        }
        class GfxBoxCommand extends GfxCommand {
            constructor(public x: number, public y: number, public w: number, public h: number, color: number) {
                super(GfxCommandType.Box, color);
            }
        }
        class GfxIconCommand extends GfxCommand {
            constructor(public x: number, public y: number, public buf: Buffer, color: number) {
                super(GfxCommandType.Icon, color);
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
                    }
                });
                commands.splice(0, commands.length);
            }
        }

    }
}