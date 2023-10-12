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
  text = `
  
      return (state) => {
        const { money, towers, enemies, obstacles, goal, start } = state;
        const occupiedTiles = [...towers, ...enemies, ...obstacles];
    
        const ys = occupiedTiles.map((tile) => tile.y);
        let y = 0;
        while (ys.includes(y)) {
          y++;
        }
    
        const x = 1;
        return { x, y };
      }
    `;

  private gameState = inject(GameStateService);
  private gameManager = inject(GameManagerService);

  start() {
    this.gameManager.start(this.text);

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
