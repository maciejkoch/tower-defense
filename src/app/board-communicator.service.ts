import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameObject } from './game/game-object.model';

@Injectable({
  providedIn: 'root',
})
export class BoardCommunicatorService {
  _gameObjectAdded$ = new Subject<GameObject>();

  get gameObjectAdded$() {
    return this._gameObjectAdded$.asObservable();
  }

  addGameObject(gameObject: GameObject) {
    this._gameObjectAdded$.next(gameObject);
  }
}
