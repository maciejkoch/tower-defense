import { AddGameObject } from './add-game-object.action';
import { RemoveGameObject } from './remove-game-object.action';

export type GameAction = AddGameObject | RemoveGameObject;
