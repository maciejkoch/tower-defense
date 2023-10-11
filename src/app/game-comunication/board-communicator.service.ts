import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { GameAction } from './actions/actions';
import { BoardEvent } from './events/event.model';

@Injectable({
  providedIn: 'root',
})
export class BoardCommunicatorService {
  private _action$ = new ReplaySubject<GameAction>();
  private _event$ = new ReplaySubject<BoardEvent>();

  private _start$ = new ReplaySubject<void>();

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
