import { GameObject } from '../model/game-object.model';
import { moveObject } from '../move/move-object';
import { createSprite } from '../sprite/sprite-factory';

export function createEnemy(): GameObject {
  const size = {
    width: 20,
    height: 40,
  };

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
      const movement = moveObject(this, secondsPassed);

      if (movement) {
        this.position = movement;
        this.sprite.update(secondsPassed, movement);
      } else {
        this.sprite.reset();
      }
    },
    draw(ctx: CanvasRenderingContext2D) {
      this.sprite.draw(ctx);
    },
  };
}
