import { toTilePosition } from 'src/app/game-engine/position/position';
import { createSprite } from 'src/app/game-engine/sprite/sprite-factory';
import { RelativePosition } from '../../game-engine/position/position.model';
import { calculateTarget, moveObject } from '../move/move-object';
import { Hero } from './hero.model';

export function createHero(): Hero {
  const position = {
    x: 200,
    y: 200,
  };

  const size = {
    width: 70,
    height: 70,
  };

  const sprite = createSprite({
    img: 'assets/hero.png',
    tileSize: {
      width: 120,
      height: 120,
    },
    size,
    frames: 3,
    defaultFrame: 1,
    animationSpeed: 0.2,
  });

  return {
    position,
    direction: 0,
    size,
    speed: 60,
    sprite,

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
      const { target = [] } = this;

      target.forEach((item) => {
        ctx.beginPath();
        ctx.arc(item.x, item.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fill();
      });
    },
    setTarget(target: RelativePosition, obstacles: number[][]) {
      this.target = calculateTarget(this, target, obstacles);
    },

    getTilePosition() {
      return toTilePosition(this.position);
    },
  };
}
