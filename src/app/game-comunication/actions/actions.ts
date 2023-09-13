import { AddGameObject } from './add-game-object.action';
import { AddStaticObjects } from './add-static-objects.action';
import { RemoveGameObject } from './remove-game-object.action';

export type GameAction = AddGameObject | RemoveGameObject | AddStaticObjects;
