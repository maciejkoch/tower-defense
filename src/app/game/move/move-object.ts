import { Direction, Target } from '../model/position.model';
import { GameObject } from '../model/game-object.model';

export function moveObject(gameObject: GameObject, secondsPassed: number) {
  const { speed, target, position, size } = gameObject;

  if (!target) {
    return undefined;
  }

  const realSpeed = speed * secondsPassed;

  const distanceX = target.x - size.width / 2 - position.x;
  const distanceY = target.y - size.height / 2 - position.y;
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
  gameObject.target = target;
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
