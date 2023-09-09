import { config } from '../config';
import { moveObject, roundToTile } from '../move/move-object';
import { createSprite } from '../sprite/sprite-factory';
import { Hero } from './hero.model';

export function createHero(): Hero {
  const position = roundToTile({
    x: 200,
    y: 200,
  });

  const size = {
    width: 70,
    height: 70,
  };

  const sprite = createSprite({
    img: 'assets/hero.png',
    defaultPosition: position,
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
    size,
    speed: 60,
    sprite,

    update(secondsPassed: number) {
      const { target = [] } = this;

      if (target.length) {
        const nextTarget = target[0];
        const movement = moveObject(this, nextTarget, secondsPassed);

        if (movement) {
          this.position = movement;
          this.sprite.update(secondsPassed, movement);
        } else {
          target.shift();
        }
      } else {
        this.sprite.reset();
      }
    },
    draw(ctx: CanvasRenderingContext2D) {
      this.sprite.draw(ctx);

      // draw target
      const { target = [] } = this;

      target.forEach((item) => {
        ctx.beginPath();
        ctx.arc(item.x, item.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fill();
      });
    },
  };
}
