import { RelativePosition } from 'src/app/game-engine/position/position.model';
import { GameObject } from '../../game-engine/model/game-object.model';

export interface Bullet extends GameObject {
  aim: RelativePosition;
  done: boolean;
}
