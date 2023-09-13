import { TilePosition } from 'src/app/game-engine/position/position.model';
import { config } from '../../config';
import { Obstacle } from './obstacle.model';

export function creatObstacle(position: TilePosition): Obstacle {
  return {
    position,
    draw(ctx) {
      const { x, y } = position;

      ctx.fillStyle = 'black';
      ctx.fillRect(x * config.tile, y * config.tile, config.tile, config.tile);
    },

    update() {},
  };
}
