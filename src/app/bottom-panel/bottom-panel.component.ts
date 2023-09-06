import { Component, inject } from '@angular/core';
import { BoardCommunicatorService } from '../board-communicator.service';
import { createEnemy } from '../game/enemy/enemy-factory';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
})
export class BottomPanelComponent {
  boardCommunicatorService = inject(BoardCommunicatorService);

  createEnemy() {
    const enemy = createEnemy();
    this.boardCommunicatorService.addEnemy(enemy);
  }
}
