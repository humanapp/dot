namespace dot {
    export enum TextAlignment {
        Left,
        Center,
        Right
    }
    export namespace draw {
        export function rect(
            r: Rect,
            alignCenter = false,
            collidesWith: Color[] = null,
            id?: string
        ): CollisionReporter {
            const x = r.pos.x;
            const y = r.pos.y;
            const w = r.size.x;
            const h = r.size.y;
            if (collidesWith == null) {
                collidesWith = color.all();
            }
            return _internal.rect(id, alignCenter, false, collidesWith, x, y, w, h);
        }
        export function box(
            r: Rect,
            alignCenter = false,
            collidesWith: Color[] = null,
            id?: string
        ): CollisionReporter {
            const x = r.pos.x;
            const y = r.pos.y;
            const w = r.size.x;
            const h = r.size.y;
            if (collidesWith == null) {
                collidesWith = color.all();
            }
            return _internal.rect(id, alignCenter, true, collidesWith, x, y, w, h);
        }
        export function line(
            a: Vec2,
            b: Vec2,
            thickness: number,
            gap = 0,
            collidesWith: Color[] = null,
            id?: string
        ): CollisionReporter {
            if (collidesWith == null) {
                collidesWith = color.all();
            }
            return _internal.line(id, collidesWith, a, b, thickness, gap);
        }
        // Copied from screen/text.ts imagePrint
        // TODO: Support collision with text
        export function text(
            p: Vec2,
            s: string,
            alignment = TextAlignment.Left,
            font?: image.Font
        ) {
            let x = Math.floor(p.x)
            let y = Math.floor(p.y)
            if (!font)
                font = image.getFontForText(s)
            let x0 = x
            let cp = 0
            let mult = font.multiplier ? font.multiplier : 1
            let dataW = Math.idiv(font.charWidth, mult)
            let dataH = Math.idiv(font.charHeight, mult)
            let byteHeight = (dataH + 7) >> 3
            let charSize = byteHeight * dataW
            let dataSize = 2 + charSize
            let fontdata = font.data
            let lastchar = Math.idiv(fontdata.length, dataSize) - 1
            let imgBuf: Buffer
            if (mult == 1) {
                imgBuf = control.createBuffer(8 + charSize)
                imgBuf[0] = 0x87
                imgBuf[1] = 1
                imgBuf[2] = dataW
                imgBuf[4] = dataH
            }
            let width = s.length * font.charWidth;
            switch (alignment) {
                case TextAlignment.Center: {
                    x -= width / 2;
                    break;
                }
                case TextAlignment.Right: {
                    x -= width;
                    break;
                }
            }

            while (cp < s.length) {
                let xOffset = 0, yOffset = 0;
                //if (offsets && cp < offsets.length) {
                //    xOffset = offsets[cp].xOffset
                //    yOffset = offsets[cp].yOffset
                //}

                let ch = s.charCodeAt(cp++)
                if (ch == 10) {
                    y += font.charHeight + 2
                    x = x0
                }

                if (ch < 32)
                    continue // skip control chars

                let l = 0
                let r = lastchar
                let off = 0 // this should be a space (0x0020)
                let guess = (ch - 32) * dataSize
                if (fontdata.getNumber(NumberFormat.UInt16LE, guess) == ch)
                    off = guess
                else {
                    while (l <= r) {
                        let m = l + ((r - l) >> 1);
                        let v = fontdata.getNumber(NumberFormat.UInt16LE, m * dataSize)
                        if (v == ch) {
                            off = m * dataSize
                            break
                        }
                        if (v < ch)
                            l = m + 1
                        else
                            r = m - 1
                    }
                }

                // DOESN'T WORK (???)
                //if (mult == 1) {
                //    imgBuf.write(8, fontdata.slice(off + 2, charSize))
                //    gfx.icon(x + xOffset, y + yOffset, imgBuf)
                //    x += font.charWidth
                //} else {
                {
                    off += 2
                    for (let i = 0; i < dataW; ++i) {
                        let j = 0
                        let mask = 0x01
                        let c = fontdata[off++]
                        while (j < dataH) {
                            if (mask == 0x100) {
                                c = fontdata[off++]
                                mask = 0x01
                            }
                            let n = 0
                            while (c & mask) {
                                n++
                                mask <<= 1
                            }
                            if (n) {
                                gfx.box(x + xOffset * mult, y + (j + yOffset) * mult, mult, mult * n)
                                j += n
                            } else {
                                mask <<= 1
                                j++
                            }
                        }
                        x += mult
                    }
                }
            }
        }

        namespace _internal {
            export function rect(
                id: string,
                alignCenter: boolean,
                fill: boolean,
                collidesWith: Color[],
                x: number,
                y: number,
                w: number,
                h: number,
                reporter?: CollisionReporter
            ): CollisionReporter {
                if (!reporter) {
                    reporter = collision.newReporter();
                }
                const pos = alignCenter
                    ? new Vec2(x - w / 2, y - h / 2)
                    : new Vec2(x, y);
                const size = new Vec2(w, h);
                if (size.x === 0 || size.y === 0) {
                    return reporter;
                }
                const c = color.curr();
                if (size.x < 0) {
                    pos.x += size.x;
                    size.x *= -1;
                }
                if (size.y < 0) {
                    pos.y += size.y;
                    size.y *= -1;
                }
                reporter._add(
                    id,
                    new Rect(pos, size),
                    c,
                    collidesWith
                );
                if (c) {
                    if (fill) {
                        gfx.box(pos.x, pos.y, size.x, size.y);
                    } else {
                        gfx.rect(pos.x, pos.y, size.x, size.y);
                    }
                }
                return reporter;
            }

            export function line(
                id: string,
                collidesWith: Color[],
                a: Vec2,
                b: Vec2,
                thickness: number,
                idealGap: number,
                reporter?: CollisionReporter
            ): CollisionReporter {
                if (!reporter) {
                    reporter = collision.newReporter();
                }
                thickness = Math.floor(Math.clamp(1, SCREEN_WIDTH, thickness));
                idealGap = Math.abs(idealGap);
                const d = vec2.sub(b, a);
                const len = vec2.length(d);
                const norm = vec2.normal(d);
                let numBoxes = Math.round((len + idealGap) / (thickness + idealGap));
                let actualGap = (len - (numBoxes * thickness)) / (numBoxes - 1);
                if (actualGap > idealGap) {
                    numBoxes++;
                    actualGap = (len - (numBoxes * thickness)) / (numBoxes - 1);
                }
                let step = vec2.scale(norm, thickness + actualGap);
                const p = vec2.sub(a, new Vec2(thickness / 2, thickness / 2));
                for (let i = 0; i <= numBoxes; i++) {
                    rect(id, false, true, collidesWith, p.x, p.y, thickness, thickness, reporter);
                    p.add(step);
                }
                return reporter;
            }
        }
    }
}
