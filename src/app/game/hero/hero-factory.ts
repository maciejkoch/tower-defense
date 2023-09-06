import { moveObject } from '../move/move-object';
import { createSprite } from '../sprite/sprite-factory';
import { Hero } from './hero.model';

export function createHero(): Hero {
  const size = {
    width: 70,
    height: 70,
  };

  const sprite = createSprite({
    img: 'assets/hero.png',
    defaultPosition: {
      x: 100,
      y: 100,
    },
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
    position: {
      x: 100,
      y: 100,
    },
    size,
    speed: 60,
    sprite,

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
