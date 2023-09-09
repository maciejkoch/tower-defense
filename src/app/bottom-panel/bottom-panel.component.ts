import { Component, inject } from '@angular/core';
import { GameManagerService } from '../game-logc/game-manager.service';
import { createEnemy } from '../game-logc/enemy/enemy-factory';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
})
export class BottomPanelComponent {
  gameManagerService = inject(GameManagerService);

  createEnemy() {
    const enemy = createEnemy();
    this.gameManagerService.addEnemy(enemy);
  }
}
