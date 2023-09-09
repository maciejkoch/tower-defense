import { GameAction } from '../game-comunication/actions/actions';
import { drawBoard } from './board/draw-board';
import { config } from '../config';
import { BoardEvent } from '../game-comunication/events/event.model';
import { GameObject, StaticObject } from './model/game-object.model';

export function createGame(
  canvas: HTMLCanvasElement,
  emitEvent: (event: BoardEvent) => void
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

    emitEvent({
      type: 'CLICK',
      payload: { x, y },
    });
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

    emitEvent({
      type: 'UPDATE',
      payload: secondsPassed,
    });
  }

  function draw() {
    if (!ctx) return;

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

  function handleAction(action: GameAction) {
    switch (action.type) {
      case 'ADD_GAME_OBJECT':
        addGameObject(action.payload);
        break;
      case 'ADD_STATIC_OBJECTS':
        addStaticObjects(action.payload);
        break;
    }
  }

  return {
    startGame,
    handleAction,
  };
}

function createGrid(width: number, height: number) {
  return Array.from({ length: width / config.tile }, () =>
    Array.from({ length: height / config.tile }, () => 0)
  );
}
