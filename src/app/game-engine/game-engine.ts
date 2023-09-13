import { GameAction } from '../game-comunication/actions/actions';
import { BoardEvent } from '../game-comunication/events/event.model';
import { drawBoard } from './board/draw-board';
import { GameObject } from './model/game-object.model';

export function createGame(
  canvas: HTMLCanvasElement,
  emitEvent: (event: BoardEvent) => void
) {
  const ctx = canvas.getContext('2d');

  let secondsPassed = 0;
  let oldTimeStamp = 0;

  let gameObjects: GameObject[] = [];

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
    gameObjects.forEach((gameObject) => gameObject.draw(ctx));
  }

  function clearCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function addGameObjects(values: GameObject[]) {
    gameObjects = [...gameObjects, ...values];
  }

  function removeGameObject(gameObject: GameObject) {
    gameObjects = gameObjects.filter((item) => item !== gameObject);
  }

  function startGame() {
    gameLoop();
  }

  function handleAction(action: GameAction) {
    switch (action.type) {
      case 'ADD_GAME_OBJECT':
        const objects = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        addGameObjects(objects);
        break;
      case 'REMOVE_GAME_OBJECT':
        removeGameObject(action.payload);
        break;
    }
  }

  return {
    startGame,
    handleAction,
  };
}
