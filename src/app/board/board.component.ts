import { Component, inject } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { config } from '../config';
import { BoardCommunicatorService } from '../game-comunication/board-communicator.service';
import { GameEngine, createGame } from '../game-engine/game-engine';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  boardCommunicatorService = inject(BoardCommunicatorService);

  private game?: GameEngine;

  config = config;

  constructor() {
    this.boardCommunicatorService.start$
      .pipe(
        tap(() => {
          this.game?.stopGame();

          const canvas = document.getElementById('board') as HTMLCanvasElement;
          this.game = createGame(canvas, (event) =>
            this.boardCommunicatorService.emitEvent(event)
          );

          this.game.startGame();
        }),
        switchMap(() => this.boardCommunicatorService.action$)
      )
      .subscribe((action) => this.game?.handleAction(action));
  }
}
