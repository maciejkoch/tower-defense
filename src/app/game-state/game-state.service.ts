import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardCommunicatorService } from '../game-comunication/board-communicator.service';
import { Bullet } from '../game-logc/bullet/bullet.model';
import { Enemy } from '../game-logc/enemy/enemy.model';
import { Obstacle } from '../game-logc/obstacle/obstacle.model';
import { Tower } from '../game-logc/tower/tower.model';

export type GameMode = 'NORMAL' | 'BUILD';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private boardCommunicatorService = inject(BoardCommunicatorService);

  private _creadits$ = new BehaviorSubject(10);
  private _kills$ = new BehaviorSubject(0);
  private _money$ = new BehaviorSubject(100);
  private _mode$ = new BehaviorSubject<GameMode>('BUILD');

  private _obstacles$ = new BehaviorSubject<Obstacle[]>([]);
  private _towers$ = new BehaviorSubject<Tower[]>([]);
  private _bullet$ = new BehaviorSubject<Bullet[]>([]);
  private _enemies$ = new BehaviorSubject<Enemy[]>([]);

  get kills$() {
    return this._kills$.asObservable();
  }

  get money$() {
    return this._money$.asObservable();
  }

  get mode$() {
    return this._mode$.asObservable();
  }

  get credits$() {
    return this._creadits$.asObservable();
  }

  get boardEvent$() {
    return this.boardCommunicatorService.event$;
  }

  selectMoneySnapshot() {
    return this._money$.value;
  }

  selectModeSnapshot() {
    return this._mode$.value;
  }

  selectObstaclesSnapshot() {
    return this._obstacles$.value;
  }

  selectTowersSnapshot() {
    return this._towers$.value;
  }

  selectBulletsSnapshot() {
    return this._bullet$.value;
  }

  selectEnemiesSnapshot() {
    return this._enemies$.value;
  }

  addKill() {
    this._kills$.next(this._kills$.value + 1);
  }

  addMoney(amount: number) {
    this._money$.next(this._money$.value + amount);
  }

  substractMoney(amount: number) {
    this._money$.next(this._money$.value - amount);
  }

  substractCredits() {
    this._creadits$.next(this._creadits$.value - 1);
  }

  setMode(mode: GameMode) {
    this._mode$.next(mode);
  }

  addObstacles(obstacles: Obstacle[]) {
    this._obstacles$.next([...this._obstacles$.value, ...obstacles]);
    this.boardCommunicatorService.dispatch({
      type: 'ADD_GAME_OBJECT',
      payload: obstacles,
    });
  }

  addTower(tower: Tower) {
    this._towers$.next([...this._towers$.value, tower]);
    this.boardCommunicatorService.dispatch({
      type: 'ADD_GAME_OBJECT',
      payload: tower,
    });
  }

  addBullet(bullet: Bullet) {
    this._bullet$.next([...this._bullet$.value, bullet]);
    this.boardCommunicatorService.dispatch({
      type: 'ADD_GAME_OBJECT',
      payload: bullet,
    });
  }

  removeBullet(bullet: Bullet) {
    const bullets = this._bullet$.value.filter((item) => item !== bullet);
    this._bullet$.next(bullets);

    this.boardCommunicatorService.dispatch({
      type: 'REMOVE_GAME_OBJECT',
      payload: bullet,
    });
  }

  addEnemy(enemy: Enemy) {
    this._enemies$.next([...this._enemies$.value, enemy]);
    this.boardCommunicatorService.dispatch({
      type: 'ADD_GAME_OBJECT',
      payload: enemy,
    });
  }

  removeEnemy(enemy: Enemy) {
    const enemies = this._enemies$.value.filter((item) => item !== enemy);
    this._enemies$.next(enemies);

    this.boardCommunicatorService.dispatch({
      type: 'REMOVE_GAME_OBJECT',
      payload: enemy,
    });
  }
}
