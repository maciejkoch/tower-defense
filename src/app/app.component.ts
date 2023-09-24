import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { config } from './config';
import { GameManagerService } from './game-logc/game-manager.service';
import { creatObstacle } from './game-logc/obstacle/obstacle-factory';
import { GameStateService } from './game-state/game-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'tower-defense';

  gameState = inject(GameStateService);
  gameManeger = inject(GameManagerService); // just to start the game

  constructor() {
    const obstacles = this.generateRandomObstacles();
    this.gameState.addObstacles(obstacles);
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
