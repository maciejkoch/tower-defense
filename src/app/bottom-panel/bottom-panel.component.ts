import { Component, inject } from '@angular/core';
import { BoardCommunicatorService } from '../board-communicator.service';
import { createEnemy } from '../game/enemy/enemy-factory';
import { GameManagerService } from '../game-manager.service';

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
