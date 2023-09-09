import { Component, inject } from '@angular/core';
import { BoardCommunicatorService } from '../game-comunication/board-communicator.service';
import { config } from '../config';
import { createGame } from '../game-engine/game-engine';

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
