type Color = uint32;

function colorToString(color: Color): string {
  return "#" + color.toString(16).padStart(8, "0");
}

class Graphics {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  get width(): number {
    return this.canvas.width;
  }

  get height(): number {
    return this.canvas.height;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const context = canvas.getContext("2d");

    if (context === null) {
      throw new Error("Failed to initialize canvas.");
    }

    this.context = context;
  }

  clear(color: Color): void {
    this.fillRect(0, 0, this.width, this.height, color);
  }

  fillRect(x: number, y: number, width: number, height: number, color: Color): void {
    this.context.fillStyle = colorToString(color);
    this.context.fillRect(x, y, width, height);
  }
}
