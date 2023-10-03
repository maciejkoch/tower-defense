import { TilePosition } from '../../game-engine/position/position.model';

export type CursorEvent = {
  type: 'CURSOR';
  payload: TilePosition;
};
