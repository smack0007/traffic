import type { Color } from "../types/Color.ts";
import type { Graphics } from "./Graphics.ts";

export class WebGLGraphics implements Graphics {
  constructor(private _context: WebGL2RenderingContext) {}

  public clear(color: Color): void {
    this._context.clearColor(color.r, color.g, color.b, color.a);
    this._context.clear(this._context.COLOR_BUFFER_BIT);
  }
}
