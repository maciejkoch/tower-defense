import { AddGameObject } from './add-game-object.action';
import { AddStaticObjects } from './add-static-objects.action';

export type GameAction = AddGameObject | AddStaticObjects;
