import { Direction, Position, Target } from '../model/position.model';
import { GameObject } from '../model/game-object.model';
import { config } from '../config';

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

  const distanceX = target.x - size.width / 2 - position.x;
  const distanceY = target.y - size.height - position.y;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // If the distance is smaller than the speed, we can't move any further
  if (distance < realSpeed) {
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

export function setTarget(gameObject: GameObject, target: Target) {
  const rounded = roundToTile(target);
  gameObject.target = [rounded];
}

function roundToTile(target: Target) {
  const tileX = Math.floor(target.x / config.tile);
  const tileY = Math.floor(target.y / config.tile);

  const x = tileX * config.tile + config.tile / 2;
  const y = tileY * config.tile + config.tile / 2;
  return { x, y };
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
