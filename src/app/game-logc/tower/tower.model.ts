import { GameObject } from '../../game-engine/model/game-object.model';
import { TilePosition } from '../../game-engine/position/position.model';

export interface Tower extends GameObject {
  position: TilePosition;
  range: number;
  speed: number;
  damage: number;

  ready: boolean;

  shoot(): void;
}
