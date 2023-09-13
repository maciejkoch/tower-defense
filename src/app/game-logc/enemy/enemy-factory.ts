import { toRelativePosition } from '../../game-engine/position/position';
import {
  RelativePosition,
  TilePosition,
} from '../../game-engine/position/position.model';
import { createSprite } from '../../game-engine/sprite/sprite-factory';
import { calculateTarget, moveObject } from '../move/move-object';
import { Enemy } from './enemy.model';

export function createEnemy(tilePosition: TilePosition): Enemy {
  const size = {
    width: 20,
    height: 40,
  };

  const sprite = createSprite({
    img: 'assets/enemy.png',
    tileSize: {
      width: 48,
      height: 48,
    },
    size,
    frames: 3,
    defaultFrame: 1,
    animationSpeed: 0.2,
  });

  return {
    sprite,
    position: toRelativePosition(tilePosition),
    direction: 0,
    size,
    speed: 30,
    update(secondsPassed: number) {
      const { target = [] } = this;

      if (target.length) {
        const nextTarget = target[0];
        const movement = moveObject(this, nextTarget, secondsPassed);

        if (movement) {
          const { position, direction } = movement;
          this.position = position;
          this.direction = direction;

          this.sprite.update(secondsPassed);
        } else {
          target.shift();
        }
      } else {
        this.sprite.reset();
      }
    },
    draw(ctx: CanvasRenderingContext2D) {
      const { position, direction } = this;
      this.sprite.draw(ctx, position, direction);

      // draw target
      // const { target = [] } = this;

      // target.forEach((item) => {
      //   ctx.beginPath();
      //   ctx.arc(item.x, item.y, 5, 0, 2 * Math.PI);
      //   ctx.fillStyle = randomColor;
      //   ctx.fill();
      // });
    },
    setTarget(target: RelativePosition, obstacles: number[][]) {
      this.target = calculateTarget(this, target, obstacles);
    },
  };
}
