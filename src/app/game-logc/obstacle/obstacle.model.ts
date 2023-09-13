import { GameObject } from '../../game-engine/model/game-object.model';
import { TilePosition } from '../../game-engine/position/position.model';

export interface Obstacle extends GameObject {
  position: TilePosition;
}
