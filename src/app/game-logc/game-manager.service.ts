import { Injectable, inject } from '@angular/core';
import { config } from '../config';
import { BoardCommunicatorService } from '../game-comunication/board-communicator.service';
import {
  GameObject,
  StaticObject,
} from '../game-engine/model/game-object.model';
import { toTilePosition } from '../game-engine/position/position';
import { RelativePosition } from '../game-engine/position/position.model';
import { createEnemy } from './enemy/enemy-factory';
import { Enemy } from './enemy/enemy.model';
import { Hero } from './hero/hero.model';
import { creatObstacle } from './obstacle/obstacle-factory';
import { createTower } from './tower/tower-factory';
import { Tower } from './tower/tower.model';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {
  boardCommunicatorService = inject(BoardCommunicatorService);

  private mode: 'BUILD' | 'PLAY' = 'PLAY';

  private hero?: Hero;
  private enemies: Enemy[] = [];
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

    // create obstacles - temporary solution
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
    // ---------------------

    const addEnemy = () => {
      const enemy = createEnemy({ x: 25, y: 10 });
      enemy.setTarget({ x: 0, y: 0 }, this.buildGridWithObstacles());

      this.addEnemy(enemy);
    };

    addEnemy();
    setInterval(() => addEnemy(), 4000);
  }

  addHero(hero: Hero) {
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

  addEnemy(enemy: Enemy) {
    this.enemies = [...this.enemies, enemy];
    this.boardCommunicatorService.dispatch({
      type: 'ADD_GAME_OBJECT',
      payload: enemy,
    });
  }

  removeEnemy(enemy: GameObject) {
    this.enemies = this.enemies.filter((item) => item !== enemy);
    this.boardCommunicatorService.dispatch({
      type: 'REMOVE_GAME_OBJECT',
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
        this.hero.setTarget(position, this.buildGridWithObstacles());
      }
    }
  }

  update(secondsPassed: number) {
    // this.enemies.forEach((enemy) => {
    //   const { x, y } = toTilePosition(enemy.position);
    //   if (x === 0 && y === 0) {
    //     this.removeEnemy(enemy);
    //   }
    // });
  }
}
