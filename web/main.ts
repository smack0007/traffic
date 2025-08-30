type int32 = number;
type uint32 = number;

interface Host {
  graphics: Graphics;
}

interface Game {
  init: () => void;
  update: (elasped: number) => void;
  draw: () => void;
}

interface Window {
  host: Host;
  game: Game;
}

function run(game: Game) {
  const host = init(game);
  requestAnimationFrame((timestamp) => tick(host, game, timestamp));
}

function init(game: Game): Host {
  const canvas = document.getElementById("host");

  if (canvas === null) {
    throw new Error("Failed to find canvas host.");
  }

  window.host = {
    graphics: new Graphics(canvas as HTMLCanvasElement),
  };

  game.init();

  return window.host;
}

let lastTimestamp = 0;

function tick(host: Host, game: Game, timestamp: number) {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }

  const elapsed = timestamp - lastTimestamp;
  game.update(elapsed);

  host.graphics.clear(0x000000ff);
  game.draw();

  lastTimestamp = timestamp;
  requestAnimationFrame((timestamp) => tick(host, game, timestamp));
}
