import { config } from '../../config';
import { Tower } from './tower.model';

export function createTower(tileX: number, tileY: number): Tower {
  return {
    tileX,
    tileY,

    draw(ctx: CanvasRenderingContext2D) {
      const { tile } = config;

      ctx.fillStyle = 'red';
      ctx.fillRect(this.tileX * tile, this.tileY * tile, tile, tile);
    },
  };
}
