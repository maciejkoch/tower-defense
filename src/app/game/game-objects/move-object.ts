import { GameObject } from './game-object.model';

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
    gameObject.target = undefined;
    return undefined;
  }

  gameObject.position.x = position.x + (realSpeed * distanceX) / distance;
  gameObject.position.y = position.y + (realSpeed * distanceY) / distance;

  // calculate direction, 0 means down, 1 means left, 2 means right, 3 means up
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

export function setTarget(
  gameObject: GameObject,
  target: { x: number; y: number }
) {
  gameObject.target = target;
}
