import type { Graphics } from "./graphics/Graphics.ts";
import { Color } from "./types/Color.ts";

const color = new Color(0, 0, 1.0, 1);

export class Game {
  public constructor(private _graphics: Graphics) {}

  public init(): void {}

  public update(elapsed: number): void {}

  public draw(elapsed: number): void {
    color.r += 0.2 * elapsed;
    if (color.r > 1.0) {
      color.r -= 1.0;
    }

    color.g -= 0.2 * elapsed;
    if (color.g < 0.0) {
      color.g += 1.0;
    }

    this._graphics.clear(color);
  }
}
