import { GameObject } from './game-objects/game-object.model';

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

    gameObjects.forEach((gameObject) => gameObject.draw(ctx));
  }

  function clearCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function addGameObject(gameObject: GameObject) {
    gameObjects.push(gameObject);
  }

  function startGame() {
    gameLoop();
  }

  return {
    addGameObject,
    startGame,
    onClick,
  };
}
