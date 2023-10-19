import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { config } from './config';
import { GameManagerService } from './game-logc/game-manager.service';
import { creatObstacle } from './game-logc/obstacle/obstacle-factory';
import { GameStateService } from './game-state/game-state.service';

import {
  Auth,
  GithubAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'tower-defense';
  typings = `
    interface TilePosition {
      x: number;
      y: number;
    }
    
    interface AlghoritmGameState {
      money: number;
      towers: TilePosition[];
      enemies: TilePosition[];
      obstacles: TilePosition[];
      goal: TilePosition;
      start: TilePosition;
    }
    
    type Alghoritm = (state: AlghoritmGameState) => TilePosition | undefined;

    `;
  code = `
    function algorithm(): Alghoritm {
      return (state: AlghoritmGameState) => {
      const { money, towers, enemies, obstacles, goal, start } = state;
      const occupiedTiles = [...towers, ...enemies, ...obstacles];
        
      const ys = occupiedTiles.map((tile) => tile.y);
      let y = 0;
      while (ys.includes(y)) {
        y++;
      }   
        
      const x = 1;
      return { x, y };
    }}
    `;

  private gameState = inject(GameStateService);
  private gameManager = inject(GameManagerService);
  private auth = inject(Auth);
  user$ = new BehaviorSubject<User | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.user$.next(user);
    });
  }

  start() {
    this.gameManager.start(this.code);

    const obstacles = this.generateRandomObstacles();
    this.gameState.addObstacles(obstacles);
  }

  async signIn() {
    const user = await signInWithPopup(this.auth, new GithubAuthProvider());
    console.log('user', user);
  }

  private generateRandomObstacles() {
    const obstaclePositions = Array.from({ length: 10 }, () => {
      const x =
        Math.floor(Math.random() * (config.width / config.tile - 2)) + 1;
      const y =
        Math.floor(Math.random() * (config.height / config.tile - 2)) + 1;
      return [x, y];
    });
    return obstaclePositions.map(([x, y]) => creatObstacle({ x, y }));
  }
}
