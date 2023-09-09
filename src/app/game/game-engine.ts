import { drawBoard } from './board/draw-board';
import { config } from './config';
import { GameObject, StaticObject } from './model/game-object.model';

export function createGame(
  canvas: HTMLCanvasElement,
  onClick: (position: { x: number; y: number }) => void,
  gameUpdate: (secondsPassed: number) => void
) {
  const ctx = canvas.getContext('2d');

  let secondsPassed = 0;
  let oldTimeStamp = 0;
  let movingSpeed = 10;

  const gameObjects: GameObject[] = [];
  const staticObjects: StaticObject[] = [];

  canvas.addEventListener('mousedown', (event) => {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    onClick({ x, y });
  });

  function gameLoop(timeStamp: number = 0) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    update(secondsPassed);
    clearCanvas();
    draw();

    window.requestAnimationFrame(gameLoop);
  }

  function update(secondsPassed: number) {
    gameObjects.forEach((gameObject) => gameObject.update(secondsPassed));
    gameUpdate(secondsPassed);
  }

  function draw() {
    if (!ctx) return;

    // draw obstacles
    // ctx.fillStyle = 'black';
    // grid.forEach((row, rowIndex) => {
    //   row.forEach((column, columnIndex) => {
    //     if (column === 1) {
    //       ctx.fillRect(
    //         columnIndex * config.tile,
    //         rowIndex * config.tile,
    //         config.tile,
    //         config.tile
    //       );
    //     }
    //   });
    // });
    //---------
    drawBoard(ctx, { width: canvas.width, height: canvas.height });
    staticObjects.forEach((staticObject) => staticObject.draw(ctx));
    gameObjects.forEach((gameObject) => gameObject.draw(ctx));
  }

  function clearCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function addGameObject(gameObject: GameObject) {
    gameObjects.push(gameObject);
  }

  function addStaticObjects(items: StaticObject[]) {
    items.forEach((item) => staticObjects.push(item));
  }

  function startGame() {
    gameLoop();
  }

  return {
    addGameObject,
    addStaticObjects,
    startGame,
    onClick,
  };
}

function createGrid(width: number, height: number) {
  return Array.from({ length: width / config.tile }, () =>
    Array.from({ length: height / config.tile }, () => 0)
  );
}
