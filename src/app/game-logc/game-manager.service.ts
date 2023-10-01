import { Injectable, inject } from '@angular/core';
import { config, enemyGoal, enemyStart } from '../config';
import { GameObject } from '../game-engine/model/game-object.model';
import {
  calculateDistance,
  toRelativePosition,
  toTilePosition,
} from '../game-engine/position/position';
import { TilePosition } from '../game-engine/position/position.model';
import { GameStateService } from '../game-state/game-state.service';
import { createBullet } from './bullet/bullet-factory';
import { createEnemy } from './enemy/enemy-factory';
import { Enemy } from './enemy/enemy.model';
import { calculateTarget } from './move/move-object';
import { createTower } from './tower/tower-factory';
import { Tower } from './tower/tower.model';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {
  private gameState = inject(GameStateService);

  constructor() {
    this.gameState.boardEvent$.subscribe((event) => {
      switch (event.type) {
        case 'CLICK':
          const { tilePosition, gameObject } = event.payload;
          this.onClick(tilePosition, gameObject);
          break;
        case 'UPDATE':
          this.update(event.payload);
          break;
      }
    });

    const addEnemy = (hp: number) => {
      const enemy = createEnemy(enemyStart, hp);
      this.setEnemiesTarget([enemy]);
      this.gameState.addEnemy(enemy);
    };

    let hp = 100;
    addEnemy(hp);
    setInterval(() => {
      addEnemy(hp);
      hp += 7;
    }, 4000); // move to update function
  }

  private buildTower(tower: Tower) {
    this.gameState.addTower(tower);
    this.gameState.substractMoney(tower.price);

    const enemies = this.gameState.selectEnemiesSnapshot();
    this.setEnemiesTarget(enemies);
  }

  private onClick(position: TilePosition, gameObject?: GameObject) {
    const mode = this.gameState.selectModeSnapshot();
    const money = this.gameState.selectMoneySnapshot();

    if (mode === 'BUILD') {
      const tower = createTower(position, 20);

      const hasMoney = money >= tower.price;
      const isPathValid = this.isBlockingPath(tower);
      const isTileAvailable = !gameObject;

      if (hasMoney && isPathValid && isTileAvailable) {
        this.buildTower(tower);
      }
    }
  }

  private update(secondsPassed: number) {
    const towers = this.gameState.selectTowersSnapshot();
    const bullets = this.gameState.selectBulletsSnapshot();
    const enemies = this.gameState.selectEnemiesSnapshot();

    towers.forEach((tower) => {
      let nearestEnemy: { enemy: Enemy; distance: number } | undefined;

      enemies.forEach((enemy) => {
        const enemyTilePosition = toTilePosition(enemy.position);

        const distance = calculateDistance(enemyTilePosition, tower.position);
        if (distance < tower.range) {
          if (!nearestEnemy || distance < nearestEnemy.distance) {
            nearestEnemy = {
              enemy,
              distance,
            };
          }
        }
      });

      if (nearestEnemy && tower.ready) {
        tower.shoot();

        const towerRelativePosition = toRelativePosition(tower.position);
        const bullet = createBullet(
          towerRelativePosition,
          nearestEnemy.enemy.position,
          tower.damage
        );
        this.gameState.addBullet(bullet);
      }
    });

    bullets.forEach((bullet) => {
      enemies.forEach((enemy) => {
        const distance = calculateDistance(bullet.position, enemy.position);
        if (distance < 10) {
          enemy.currentHp -= bullet.damage;
          bullet.done = true;
        }
      });

      if (bullet.done) {
        this.gameState.removeBullet(bullet);
      }
    });

    enemies.forEach((enemy) => {
      const enemyTilePosition = toTilePosition(enemy.position);
      if (
        enemyTilePosition.x === enemyGoal.x &&
        enemyTilePosition.y === enemyGoal.y
      ) {
        this.gameState.removeEnemy(enemy);
        this.gameState.substractCredits();
      }

      if (enemy.currentHp <= 0) {
        this.gameState.addKill();
        this.gameState.addMoney(10); // enemy's reward
        this.gameState.removeEnemy(enemy);
      }
    });
  }

  private setEnemiesTarget(enemies: Enemy[]) {
    enemies.forEach((enemy) => {
      enemy.setTarget(enemyGoal, this.buildGridWithObstacles());
    });
  }

  private buildGridWithObstacles(additionalTowers: Tower[] = []) {
    const obstacles = this.gameState.selectObstaclesSnapshot();
    const towers = this.gameState.selectTowersSnapshot();

    const grid = Array.from({ length: config.height / config.tile }, () =>
      Array.from({ length: config.width / config.tile }, () => 0)
    );

    const staticObjects = [...obstacles, ...towers, ...additionalTowers];
    staticObjects.forEach((obstacle) => {
      const { x, y } = obstacle.position;
      grid[y][x] = 1;
    });

    return grid;
  }

  private isBlockingPath(tower: Tower) {
    const path = calculateTarget(
      enemyStart,
      enemyGoal,
      this.buildGridWithObstacles([tower])
    );

    return path.length > 0;
  }
}
