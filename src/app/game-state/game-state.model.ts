import { Bullet } from '../game-logc/bullet/bullet.model';
import { Enemy } from '../game-logc/enemy/enemy.model';
import { Obstacle } from '../game-logc/obstacle/obstacle.model';
import { Tower } from '../game-logc/tower/tower.model';

export interface GameState {
  money: number;
  credits: number;
  kills: number;
  towers: Tower[];
  enemies: Enemy[];
  obstacles: Obstacle[];
  bullets: Bullet[];
}
