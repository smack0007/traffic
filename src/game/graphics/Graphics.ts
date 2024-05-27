import type { Color } from "../types/Color.ts";

export interface Graphics {
  clear(color: Color): void;
}
