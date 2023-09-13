import { StaticObject } from '../../game-engine/model/game-object.model';

export interface Tower extends StaticObject {
  range: number;
  speed: number;

  ready: boolean;

  shoot(): void;
}
