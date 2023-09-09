import { GameObject } from '../../game-engine/model/game-object.model';
import { moveObject } from '../move/move-object';
import { createSprite } from '../../game-engine/sprite/sprite-factory';

export function createEnemy(): GameObject {
  const size = {
    width: 20,
    height: 40,
  };

  const randomColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  }, 0.2)`;

  const sprite = createSprite({
    img: 'assets/enemy.png',
    defaultPosition: {
      x: 0,
      y: 0,
    },
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
    position: {
      x: 0,
      y: 0,
    },
    size,
    speed: 30,
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
        // random color
        ctx.fillStyle = randomColor;
        // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();
      });
    },
  };
}
