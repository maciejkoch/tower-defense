import { config } from '../../config';
import { RelativePosition, TilePosition } from './position.model';

export function toRelativePosition(tilePosition: TilePosition) {
  const x = tilePosition.x * config.tile + config.tile / 2;
  const y = tilePosition.y * config.tile + config.tile / 2;
  return { x, y };
}

export function toTilePosition(relativePosition: RelativePosition) {
  const tileX = Math.floor(relativePosition.x / config.tile);
  const tileY = Math.floor(relativePosition.y / config.tile);
  return { x: tileX, y: tileY };
}
