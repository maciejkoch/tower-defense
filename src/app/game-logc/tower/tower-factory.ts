import { TilePosition } from 'src/app/game-engine/position/position.model';
import { config } from '../../config';
import { Tower } from './tower.model';

export function createTower(position: TilePosition): Tower {
  return {
    position,

    draw(ctx: CanvasRenderingContext2D) {
      const { tile } = config;
      const { x, y } = position;

      ctx.fillStyle = 'red';
      ctx.fillRect(x * tile, y * tile, tile, tile);
    },
  };
}
