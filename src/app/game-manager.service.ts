import { Injectable, inject } from '@angular/core';
import { BoardCommunicatorService } from './board-communicator.service';
import { GameObject, StaticObject } from './game/model/game-object.model';
import { creatObstacle } from './game/obstacle/obstacle-factory';
import { setTarget } from './game/move/move-object';
import { config } from './game/config';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {
  boardCommunicatorService = inject(BoardCommunicatorService);

  private hero?: GameObject;
  private enemies: GameObject[] = [];
  private obstacles: StaticObject[] = [];

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
    const obstacles = test.map(([x, y]) => creatObstacle(x, y));
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

  private buildGridWithObstacles() {
    const grid = Array.from({ length: config.width / config.tile }, () =>
      Array.from({ length: config.height / config.tile }, () => 0)
    );

    this.obstacles.forEach((obstacle) => {
      const { tileX, tileY } = obstacle;
      grid[tileY][tileX] = 1;
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

  onClick(position: { x: number; y: number }) {
    if (this.hero) {
      setTarget(this.hero, position, this.buildGridWithObstacles());
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
