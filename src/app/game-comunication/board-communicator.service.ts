import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameAction } from './actions/actions';
import { BoardEvent } from './events/event.model';

@Injectable({
  providedIn: 'root',
})
export class BoardCommunicatorService {
  private _action$ = new Subject<GameAction>();
  private _event$ = new Subject<BoardEvent>();

  private _start$ = new Subject<void>();

  get action$() {
    return this._action$.asObservable();
  }

  get event$() {
    return this._event$.asObservable();
  }

  get start$() {
    return this._start$.asObservable();
  }

  dispatch(action: GameAction) {
    this._action$.next(action);
  }

  emitEvent(event: BoardEvent) {
    this._event$.next(event);
  }

  startGame() {
    this._start$.next();
  }
}
