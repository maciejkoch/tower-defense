import { GameObject } from '../../game-engine/model/game-object.model';

export type RemoveGameObject = {
  type: 'REMOVE_GAME_OBJECT';
  payload: GameObject;
};
