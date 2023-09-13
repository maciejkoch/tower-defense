import {
  RelativePosition,
  TilePosition,
} from '../../game-engine/position/position.model';

export interface MovingObject {
  position: RelativePosition;
  speed: number;
  target?: TilePosition[];
}
