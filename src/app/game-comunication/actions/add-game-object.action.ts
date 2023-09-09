import { Enemy } from '../../game-logc/enemy/enemy.model';
import { GameObject } from '../../game-engine/model/game-object.model';

export type AddGameObject = {
  type: 'ADD_GAME_OBJECT';
  payload: GameObject;
};
