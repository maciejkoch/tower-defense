import { TilePosition } from 'src/app/game-engine/position/position.model';
import { config } from '../../config';
import { StaticObject } from '../../game-engine/model/game-object.model';

export function creatObstacle(position: TilePosition): StaticObject {
  return {
    position,
    draw(ctx) {
      const { x, y } = position;

      ctx.fillStyle = 'black';
      ctx.fillRect(x * config.tile, y * config.tile, config.tile, config.tile);
    },
  };
}
