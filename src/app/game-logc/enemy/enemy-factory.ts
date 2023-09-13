import { moveObject, calculateTarget } from '../move/move-object';
import { createSprite } from '../../game-engine/sprite/sprite-factory';
import { TilePosition } from '../../game-engine/position/position.model';
import { toRelativePosition } from '../../game-engine/position/position';
import { Enemy } from './enemy.model';
import { RelativePosition } from '../../game-engine/position/position.model';

export function createEnemy(tilePosition: TilePosition): Enemy {
  const size = {
    width: 20,
    height: 40,
  };

  const randomColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  }, 0.2)`;

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
