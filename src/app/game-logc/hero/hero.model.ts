import { GameObject } from '../../game-engine/model/game-object.model';
import {
  Direction,
  RelativePosition,
} from '../../game-engine/position/position.model';
import { Sprite } from '../../game-engine/sprite/sprite.model';

export interface Hero extends GameObject {
  sprite: Sprite;
  direction: Direction;

  setTarget(target: RelativePosition, obstacles: number[][]): void;
}
