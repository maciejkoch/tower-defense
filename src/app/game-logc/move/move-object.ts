import * as PF from 'pathfinding';
import { toRelativePosition } from '../../game-engine/position/position';
import {
  Direction,
  RelativePosition,
  TilePosition,
} from '../../game-engine/position/position.model';
import { MovingObject } from './moving-object.model';

export function moveObject<T extends MovingObject>(
  gameObject: T,
  target: RelativePosition,
  secondsPassed: number
) {
  const { speed, position } = gameObject;

  if (!target) {
    return undefined;
  }

  const realSpeed = speed * secondsPassed;

  const distanceX = target.x - position.x;
  const distanceY = target.y - position.y;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // If the distance is smaller than the speed, we can't move any further
  if (distance < 10) {
    return undefined;
  }

  const x = position.x + (realSpeed * distanceX) / distance;
  const y = position.y + (realSpeed * distanceY) / distance;
  const direction = calculateDirection(distanceX, distanceY);

  return {
    position: { x, y },
    direction,
  };
}

export function calculateTarget(
  start: TilePosition,
  goal: TilePosition,
  obstacles: number[][]
) {
  const grid = new PF.Grid(obstacles);
  const finder = new PF.DijkstraFinder({
    diagonalMovement: PF.DiagonalMovement.OnlyWhenNoObstacles,
  });
  const pathOfTiles = finder.findPath(start.x, start.y, goal.x, goal.y, grid);
  pathOfTiles.shift();

  return pathOfTiles.map((tile) => {
    const [x, y] = tile;
    return toRelativePosition({ x, y });
  });
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
