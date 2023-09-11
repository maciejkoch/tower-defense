import {
  Direction,
  Position,
  Target,
} from '../../game-engine/model/position.model';
import { GameObject } from '../../game-engine/model/game-object.model';
import { config } from '../../config';
import * as PF from 'pathfinding';

export function moveObject(
  gameObject: GameObject,
  target: Target,
  secondsPassed: number
) {
  const { speed, position, size } = gameObject;

  if (!target) {
    return undefined;
  }

  const realSpeed = speed * secondsPassed;

  const distanceX = target.x - position.x;
  const distanceY = target.y - position.y;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // If the distance is smaller than the speed, we can't move any further
  if (distance < 5) {
    return undefined;
  }

  const x = position.x + (realSpeed * distanceX) / distance;
  const y = position.y + (realSpeed * distanceY) / distance;
  const direction = calculateDirection(distanceX, distanceY);

  return {
    x,
    y,
    direction,
  };
}

export function setTarget(
  gameObject: GameObject,
  target: Target,
  obstacles: number[][]
) {
  let startPos = positionToTile(gameObject.position);
  let goalPos = positionToTile(target);
  const grid = new PF.Grid(obstacles);
  const finder = new PF.DijkstraFinder({
    diagonalMovement: PF.DiagonalMovement.OnlyWhenNoObstacles,
  });
  var myPathway = finder.findPath(
    startPos.x,
    startPos.y,
    goalPos.x,
    goalPos.y,
    grid
  );
  myPathway.shift();
  // var smoothPath = PF.Util.smoothenPath(grid, myPathway);
  const path = myPathway.map((tile) =>
    tileToPosition({ x: tile[0], y: tile[1] })
  );
  // const rounded = roundToTile(target);
  gameObject.target = path;
}

export function roundToTile(target: Target) {
  const tileX = Math.floor(target.x / config.tile);
  const tileY = Math.floor(target.y / config.tile);

  const x = tileX * config.tile + config.tile / 2;
  const y = tileY * config.tile + config.tile / 2;
  return { x, y };
}

function tileToPosition(target: Target) {
  const x = target.x * config.tile + config.tile / 2;
  const y = target.y * config.tile + config.tile / 2;
  return { x, y };
}

export function positionToTile(target: Target) {
  const tileX = Math.floor(target.x / config.tile);
  const tileY = Math.floor(target.y / config.tile);
  return { x: tileX, y: tileY };
}

function calculateDirection(distanceX: number, distanceY: number): Direction {
  if (Math.abs(distanceX) > Math.abs(distanceY)) {
    if (distanceX > 0) {
      return 2;
    } else {
      return 1;
    }
  } else {
    if (distanceY > 0) {
      return 0;
    } else {
      return 3;
    }
  }
}
