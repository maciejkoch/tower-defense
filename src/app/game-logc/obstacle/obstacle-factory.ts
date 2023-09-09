import { config } from '../../config';
import { StaticObject } from '../../game-engine/model/game-object.model';

export function creatObstacle(tileX: number, tileY: number): StaticObject {
  return {
    tileX,
    tileY,
    draw(ctx) {
      ctx.fillStyle = 'black';
      ctx.fillRect(
        tileX * config.tile,
        tileY * config.tile,
        config.tile,
        config.tile
      );
    },
  };
}
