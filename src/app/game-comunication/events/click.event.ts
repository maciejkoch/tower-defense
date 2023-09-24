import { GameObject } from '../../game-engine/model/game-object.model';

export type ClickEvent = {
  type: 'CLICK';
  payload: {
    tilePosition: {
      x: number;
      y: number;
    };
    gameObject?: GameObject;
  };
};
