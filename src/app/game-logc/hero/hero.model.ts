import { GameObject } from '../../game-engine/model/game-object.model';
import { Size } from '../../game-engine/model/size.model';
import {
  Direction,
  RelativePosition,
} from '../../game-engine/position/position.model';
import { Sprite } from '../../game-engine/sprite/sprite.model';
import { MovingObject } from '../move/moving-object.model';

export interface Hero extends GameObject, MovingObject {
  sprite: Sprite;
  direction: Direction;
  size: Size;

  setTarget(target: RelativePosition, obstacles: number[][]): void;
}
