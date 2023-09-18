import { TilePosition } from 'src/app/game-engine/position/position.model';
import { config } from '../../config';
import { Tower } from './tower.model';

export function createTower(position: TilePosition): Tower {
  let totalSeconds = 0;

  return {
    position,
    range: 10,
    speed: 1,
    ready: true,

    draw(ctx: CanvasRenderingContext2D) {
      const { tile } = config;
      const { x, y } = position;

      ctx.fillStyle = 'red';
      ctx.fillRect(x * tile, y * tile, tile, tile);
    },

    update(secondsPassed: number) {
      const { speed } = this;

      if (!this.ready) {
        totalSeconds += secondsPassed;

        if (totalSeconds > speed) {
          totalSeconds = 0;
          this.ready = true;
        }
      }
    },

    shoot() {
      const { ready } = this;
      if (ready) {
        this.ready = false;
      }
    },

    getTilePosition() {
      return this.position;
    },
  };
}
