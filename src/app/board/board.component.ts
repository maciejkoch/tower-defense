import { Component, inject } from '@angular/core';
import { createGame } from '../game/game-engine';
import { createEnemy } from '../game/enemy/enemy-factory';
import { GameObject } from '../game/model/game-object.model';
import { BoardCommunicatorService } from '../board-communicator.service';
import { config } from '../game/config';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  boardCommunicatorService = inject(BoardCommunicatorService);

  config = config;

  ngAfterViewInit() {
    const canvas = document.getElementById('board') as HTMLCanvasElement;
    const { startGame, handleAction } = createGame(canvas, (event) =>
      this.boardCommunicatorService.emitEvent(event)
    );
    startGame();

    this.boardCommunicatorService.action$.subscribe((action) => {
      handleAction(action);
    });
  }
}
