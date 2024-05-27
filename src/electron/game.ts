import { WebGLGraphics } from "../game/graphics/WebGLGraphics.ts";
import { Game } from "../game/Game.ts";

const canvas = document.getElementById("game") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const glContext = canvas.getContext("webgl2");

if (glContext === null) {
  throw new Error("Unable to create webgl2 context.");
}

const game = new Game(new WebGLGraphics(glContext));
game.init();

let start = 0;
let previous = 0;

function tick(time: number): void {
  const elapsed = (time - previous) / 1000.0;

  game.update(elapsed);
  game.draw(elapsed);

  previous = time;
  requestAnimationFrame(tick);
}

requestAnimationFrame((time) => {
  start = time;
  previous = start;
  tick(time);
});
