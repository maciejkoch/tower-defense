import { Enemy } from '../enemy/enemy.model';
import { GameObject, StaticObject } from '../model/game-object.model';

export type AddStaticObjects = {
  type: 'ADD_STATIC_OBJECTS';
  payload: StaticObject[];
};
