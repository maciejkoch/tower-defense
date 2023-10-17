import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BoardCommunicatorService } from '../game-comunication/board-communicator.service';
import { Bullet } from '../game-logc/bullet/bullet.model';
import { Enemy } from '../game-logc/enemy/enemy.model';
import { Obstacle } from '../game-logc/obstacle/obstacle.model';
import { Tower } from '../game-logc/tower/tower.model';
import { GameState } from './game-state.model';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private boardCommunicatorService = inject(BoardCommunicatorService);

  private defaultState: GameState = {
    money: 100,
    credits: 10,
    kills: 10,
    towers: [],
    enemies: [],
    obstacles: [],
    bullets: [],
  };

  private state$ = new BehaviorSubject(this.defaultState);

  get kills$() {
    return this.state$.pipe(map((state) => state.kills));
  }

  get money$() {
    return this.state$.pipe(map((state) => state.money));
  }

  get credits$() {
    return this.state$.pipe(map((state) => state.credits));
  }

  get boardEvent$() {
    return this.boardCommunicatorService.event$;
  }

  startGame() {
    this.state$.next(this.defaultState);
    this.boardCommunicatorService.startGame();
  }

  selectMoneySnapshot() {
    return this.state$.value.money;
  }

  selectObstaclesSnapshot() {
    return this.state$.value.obstacles;
  }

  selectTowersSnapshot() {
    return this.state$.value.towers;
  }

  selectBulletsSnapshot() {
    return this.state$.value.bullets;
  }

  selectEnemiesSnapshot() {
    return this.state$.value.enemies;
  }

  addKill() {
    const state = this.state$.value;
    this.state$.next({ ...state, kills: state.kills + 1 });
  }

  addMoney(amount: number) {
    const state = this.state$.value;
    this.state$.next({ ...state, money: state.money + amount });
  }

  substractMoney(amount: number) {
    const state = this.state$.value;
    this.state$.next({ ...state, money: state.money - amount });
  }

  substractCredits() {
    const state = this.state$.value;
    this.state$.next({ ...state, credits: state.credits - 1 });
  }

  addObstacles(obstacles: Obstacle[]) {
    const state = this.state$.value;
    this.state$.next({
      ...state,
      obstacles: [...state.obstacles, ...obstacles],
    });

    this.boardCommunicatorService.dispatch({
      type: 'ADD_GAME_OBJECT',
      payload: obstacles,
    });
  }

  addTower(tower: Tower) {
    const state = this.state$.value;
    this.state$.next({ ...state, towers: [...state.towers, tower] });

    this.boardCommunicatorService.dispatch({
      type: 'ADD_GAME_OBJECT',
      payload: tower,
    });
  }

  addBullet(bullet: Bullet) {
    const state = this.state$.value;
    this.state$.next({ ...state, bullets: [...state.bullets, bullet] });

    this.boardCommunicatorService.dispatch({
      type: 'ADD_GAME_OBJECT',
      payload: bullet,
    });
  }

  removeBullet(bullet: Bullet) {
    const state = this.state$.value;
    const bullets = state.bullets.filter((item) => item !== bullet);
    this.state$.next({ ...state, bullets });

    this.boardCommunicatorService.dispatch({
      type: 'REMOVE_GAME_OBJECT',
      payload: bullet,
    });
  }

  addEnemy(enemy: Enemy) {
    const state = this.state$.value;
    this.state$.next({ ...state, enemies: [...state.enemies, enemy] });

    this.boardCommunicatorService.dispatch({
      type: 'ADD_GAME_OBJECT',
      payload: enemy,
    });
  }

  removeEnemy(enemy: Enemy) {
    const state = this.state$.value;
    const enemies = state.enemies.filter((item) => item !== enemy);
    this.state$.next({ ...state, enemies });

    this.boardCommunicatorService.dispatch({
      type: 'REMOVE_GAME_OBJECT',
      payload: enemy,
    });
  }
}
