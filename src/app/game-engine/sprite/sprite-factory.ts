import { Sprite, SpriteConfig } from './sprite.model';
import { RelativePosition, Direction } from '../position/position.model';

export function createSprite(config: SpriteConfig): Sprite {
  const image = new Image();
  image.src = config.img;

  let totalSeconds = 0;

  return {
    image,
    config,

    currentFrame: config.defaultFrame,

    update(secondsPassed: number) {
      const { animationSpeed, frames } = this.config;
      totalSeconds += secondsPassed;

      if (totalSeconds % animationSpeed < secondsPassed) {
        totalSeconds = 0;

        this.currentFrame += 1;
        if (this.currentFrame >= frames) {
          this.currentFrame = 0;
        }
      }
    },

    reset() {
      this.currentFrame = this.config.defaultFrame;
    },

    draw(
      ctx: CanvasRenderingContext2D,
      position: RelativePosition,
      direction: Direction
    ) {
      const { tileSize, size } = this.config;

      ctx.drawImage(
        this.image,
        this.currentFrame * tileSize.width,
        direction * tileSize.height,
        tileSize.width,
        tileSize.height,
        position.x - size.width / 2,
        position.y - size.height,
        size.width,
        size.height
      );
    },
  };
}
