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

  get action$() {
    return this._action$.asObservable();
  }

  get event$() {
    return this._event$.asObservable();
  }

  dispatch(action: GameAction) {
    this._action$.next(action);
  }

  emitEvent(event: BoardEvent) {
    this._event$.next(event);
  }
}
