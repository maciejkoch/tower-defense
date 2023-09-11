import { Component, inject } from '@angular/core';
import { GameManagerService } from '../game-logc/game-manager.service';
import { createEnemy } from '../game-logc/enemy/enemy-factory';
import { createTower } from '../game-logc/tower/tower-factory';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
})
export class BottomPanelComponent {
  gameManagerService = inject(GameManagerService);

  enableBuildMode() {
    this.gameManagerService.enableBuildingMode();
  }

  enablePlayMode() {
    this.gameManagerService.enablePlayMode();
  }
}
