import { config, enemyGoal } from '../config';
import { GameAction } from '../game-comunication/actions/actions';
import { BoardEvent } from '../game-comunication/events/event.model';
import { drawBoard } from './board/draw-board';
import { GameObject } from './model/game-object.model';
import { toTilePosition } from './position/position';

export interface GameDrawObject {
  gameObject: GameObject;
  drawObject: {
    zIndex: number;
    draw: (ctx: CanvasRenderingContext2D) => void;
  };
}

export function createGame(
  canvas: HTMLCanvasElement,
  emitEvent: (event: BoardEvent) => void
) {
  const ctx = canvas.getContext('2d');

  let fps = 0;

  let secondsPassed = 0;
  let oldTimeStamp = 0;

  let sortTimer = 0;
  const sortSpeed = 1;

  let gameObjects: GameObject[] = [];
  let drawObjects: GameDrawObject[] = [];

  canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const ratioX = canvas.width / rect.width;
    const ratioY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * ratioX;
    const y = (event.clientY - rect.top) * ratioY;

    const tilePosition = toTilePosition({ x, y });

    const gameObject = gameObjects.find((gameObject) => {
      const { x, y } = gameObject.getTilePosition();
      return x === tilePosition.x && y === tilePosition.y;
    });

    emitEvent({
      type: 'CLICK',
      payload: {
        tilePosition,
        gameObject,
      },
    });
  });

  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const ratioX = canvas.width / rect.width;
    const ratioY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * ratioX;
    const y = (event.clientY - rect.top) * ratioY;

    const tilePosition = toTilePosition({ x, y });

    emitEvent({
      type: 'CURSOR',
      payload: tilePosition,
    });
  });

  function gameLoop(timeStamp: number = 0) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    fps = Math.round(1 / secondsPassed);

    sortTimer += secondsPassed;

    update(secondsPassed);
    clearCanvas();
    draw();

    window.requestAnimationFrame(gameLoop);
  }

  function update(secondsPassed: number) {
    if (sortTimer > sortSpeed) {
      sortTimer = 0;
      sortDrawObjects(drawObjects);
    }

    gameObjects.forEach((gameObject) => gameObject.update(secondsPassed));

    emitEvent({
      type: 'UPDATE',
      payload: secondsPassed,
    });
  }

  function sortDrawObjects(items: GameDrawObject[]) {
    items.sort((a, b) => {
      const { gameObject: objectA, drawObject: drawA } = a;
      const { gameObject: objectB, drawObject: drawB } = b;

      if (drawA.zIndex > drawB.zIndex) return 1;
      if (drawA.zIndex < drawB.zIndex) return -1;
      else {
        if (objectA.getTilePosition().y > objectB.getTilePosition().y) return 1;
        if (objectA.getTilePosition().y < objectB.getTilePosition().y)
          return -1;
        return 0;
      }
    });
  }

  function createDrawObjects(items: GameObject[]) {
    const newItems = items.reduce((acc, gameObject) => {
      return [
        ...acc,
        ...gameObject
          .createDraw()
          .map((drawObject) => ({ gameObject, drawObject })),
      ];
    }, [] as GameDrawObject[]);

    sortDrawObjects(newItems);
    return newItems;
  }

  function draw() {
    if (!ctx) return;

    drawBoard(ctx, { width: canvas.width, height: canvas.height });

    // draw goal
    ctx.fillStyle = 'yellow';
    ctx.fillRect(
      enemyGoal.x * config.tile,
      enemyGoal.y * config.tile,
      config.tile,
      config.tile
    );

    drawObjects.forEach(({ drawObject }) => drawObject.draw(ctx));
  }

  function clearCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function addGameObjects(values: GameObject[]) {
    gameObjects = [...gameObjects, ...values];
    drawObjects = createDrawObjects(gameObjects);
  }

  function removeGameObject(gameObject: GameObject) {
    gameObjects = gameObjects.filter((item) => item !== gameObject);
    drawObjects = createDrawObjects(gameObjects);
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
