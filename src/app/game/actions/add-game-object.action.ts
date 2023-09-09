import { Enemy } from '../enemy/enemy.model';
import { GameObject } from '../model/game-object.model';

export type AddGameObject = {
  type: 'ADD_GAME_OBJECT';
  payload: GameObject;
};
