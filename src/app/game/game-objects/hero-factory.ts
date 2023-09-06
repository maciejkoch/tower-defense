import { GameObject, HeroObject } from './game-object.model';
import { moveObject } from './move-object';

const image = new Image();
image.src = 'assets/hero.png';

export function createHero(): HeroObject {
  return {
    position: {
      x: 100,
      y: 100,
    },
    size: {
      width: 70,
      height: 70,
    },
    speed: 40,
    img: image,
    currentFrame: 1,
    totalSeconds: 0,
    direction: 0,
    update(secondsPassed: number) {
      const direction = moveObject(this, secondsPassed);

      if (direction !== undefined) {
        this.direction = direction;

        this.totalSeconds += secondsPassed;

        if (this.totalSeconds % 0.2 < secondsPassed) {
          this.currentFrame += 1;
          if (this.currentFrame >= 3) {
            this.currentFrame = 0;
          }
        }
      } else {
        this.currentFrame = 1;
      }
    },
    draw(ctx: CanvasRenderingContext2D) {
      const s = 120;
      ctx.drawImage(
        this.img,
        this.currentFrame * s,
        this.direction * s,
        s,
        s,
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height
      );
    },
  };
}
