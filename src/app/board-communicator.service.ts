import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameObject, StaticObject } from './game/model/game-object.model';
import { setTarget } from './game/move/move-object';
import { creatObstacle } from './game/obstacle/obstacle-factory';
import { config } from './game/config';

@Injectable({
  providedIn: 'root',
})
export class BoardCommunicatorService {
  private _gameObjectAdded$ = new BehaviorSubject<GameObject | undefined>(
    undefined
  );

  private _staticObjectsAdded$ = new BehaviorSubject<StaticObject[]>([]);

  private hero: GameObject | undefined;
  private enemies: GameObject[] = [];
  private obstacles: StaticObject[] = [];

  get gameObjectAdded$() {
    return this._gameObjectAdded$.asObservable();
  }

  get staticObjectsAdded$() {
    return this._staticObjectsAdded$.asObservable();
  }

  constructor() {
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
    this.addStaticObject(obstacles);
  }

  private addGameObject(gameObject: GameObject) {
    this._gameObjectAdded$.next(gameObject);
  }

  private addStaticObject(staticObjects: StaticObject[]) {
    this._staticObjectsAdded$.next(staticObjects);
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

  addHero(hero: GameObject) {
    this.hero = hero;
    this.addGameObject(hero);
  }
  addEnemy(enemy: GameObject) {
    this.enemies.push(enemy);
    this.addGameObject(enemy);
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
