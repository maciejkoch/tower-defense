import { RelativePosition } from 'src/app/game-engine/position/position.model';
import { GameObject } from '../../game-engine/model/game-object.model';
import { MovingObject } from '../move/moving-object.model';

export interface Bullet extends GameObject, MovingObject {
  aim: RelativePosition;
  done: boolean;
}
