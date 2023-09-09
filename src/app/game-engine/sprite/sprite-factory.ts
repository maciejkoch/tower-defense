import { Position } from '../model/position.model';
import { Sprite, SpriteConfig } from './sprite.model';

export function createSprite(config: SpriteConfig): Sprite {
  const image = new Image();
  image.src = config.img;

  let totalSeconds = 0;

  return {
    image,
    config,
    position: config.defaultPosition,

    currentFrame: config.defaultFrame,

    update(secondsPassed: number, position: Position) {
      const { animationSpeed, frames } = this.config;
      totalSeconds += secondsPassed;

      if (totalSeconds % animationSpeed < secondsPassed) {
        totalSeconds = 0;

        this.currentFrame += 1;
        if (this.currentFrame >= frames) {
          this.currentFrame = 0;
        }
      }

      this.position = position;
    },

    reset() {
      this.currentFrame = this.config.defaultFrame;
    },

    draw(ctx: CanvasRenderingContext2D) {
      const { position } = this;
      const { tileSize, size } = this.config;

      if (position) {
        const { direction = 0 } = position;

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
      }
    },
  };
}
