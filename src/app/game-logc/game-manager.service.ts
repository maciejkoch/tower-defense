import { Injectable, inject } from '@angular/core';
import { BoardCommunicatorService } from '../game-comunication/board-communicator.service';
import {
  GameObject,
  StaticObject,
} from '../game-engine/model/game-object.model';
import { creatObstacle } from './obstacle/obstacle-factory';
import { config } from '../config';
import { createTower } from './tower/tower-factory';
import { Tower } from './tower/tower.model';
import { toTilePosition } from '../game-engine/position/position';
import { RelativePosition } from '../game-engine/position/position.model';
import { setTarget } from './move/move-object';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {
  boardCommunicatorService = inject(BoardCommunicatorService);

  private mode: 'BUILD' | 'PLAY' = 'PLAY';

  private hero?: GameObject;
  private enemies: GameObject[] = [];
  private obstacles: StaticObject[] = [];
  private towers: Tower[] = [];

  constructor() {
    this.boardCommunicatorService.event$.subscribe((event) => {
      switch (event.type) {
        case 'CLICK':
          this.onClick(event.payload);
          break;
        case 'UPDATE':
          this.update(event.payload);
          break;
      }
    });

    const test = [
      [5, 5],
      [6, 6],
      [6, 7],
      [6, 8],
      [6, 9],
      [7, 9],
      [8, 9],
      [9, 9],
    ];
    const obstacles = test.map(([x, y]) => creatObstacle({ x, y }));
    this.obstacles = obstacles;
    this.boardCommunicatorService.dispatch({
      type: 'ADD_STATIC_OBJECTS',
      payload: obstacles,
    });
  }

  addHero(hero: GameObject) {
    this.hero = hero;
    this.boardCommunicatorService.dispatch({
      type: 'ADD_GAME_OBJECT',
      payload: hero,
    });
  }

  enableBuildingMode() {
    this.mode = 'BUILD';
  }

  enablePlayMode() {
    this.mode = 'PLAY';
  }

  private buildGridWithObstacles() {
    const grid = Array.from({ length: config.width / config.tile }, () =>
      Array.from({ length: config.height / config.tile }, () => 0)
    );

    const staticObjects = [...this.obstacles, ...this.towers];
    staticObjects.forEach((obstacle) => {
      const { x, y } = obstacle.position;
      grid[y][x] = 1;
    });

    return grid;
  }

  addEnemy(enemy: GameObject) {
    this.enemies.push(enemy);
    this.boardCommunicatorService.dispatch({
      type: 'ADD_GAME_OBJECT',
      payload: enemy,
    });
  }

  buildTower(tower: Tower) {
    this.towers.push(tower);
    this.boardCommunicatorService.dispatch({
      type: 'ADD_STATIC_OBJECTS',
      payload: [tower],
    });
  }

  onClick(position: RelativePosition) {
    if (this.mode === 'BUILD') {
      const tilePosition = toTilePosition(position);
      const tower = createTower(tilePosition);

      this.buildTower(tower);
    } else if (this.mode === 'PLAY') {
      if (this.hero) {
        setTarget(this.hero, position, this.buildGridWithObstacles());
      }
    }
  }

  update(secondsPassed: number) {
    this.enemies.forEach((enemy) => {
      if (this.hero) {
        setTarget(
          enemy,
          {
            x: this.hero.position.x,
            y: this.hero.position.y,
          },
          this.buildGridWithObstacles()
        );
      }
    });
  }
}
