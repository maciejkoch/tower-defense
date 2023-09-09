import { Enemy } from '../../game-logc/enemy/enemy.model';
import {
  GameObject,
  StaticObject,
} from '../../game-engine/model/game-object.model';

export type AddStaticObjects = {
  type: 'ADD_STATIC_OBJECTS';
  payload: StaticObject[];
};
