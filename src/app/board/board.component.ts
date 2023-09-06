import { Component, inject } from '@angular/core';
import { createGame } from '../game/game-engine';
import { createEnemy } from '../game/game-objects/enemy-factory';
import { GameObject } from '../game/game-objects/game-object.model';
import { BoardCommunicatorService } from '../board-communicator.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  boardCommunicatorService = inject(BoardCommunicatorService);

  ngAfterViewInit() {
    const canvas = document.getElementById('board') as HTMLCanvasElement;
    const { addGameObject, startGame } = createGame(
      canvas,
      (position) => {
        this.boardCommunicatorService.onClick(position);
      },
      (secondsPassed) => this.boardCommunicatorService.update(secondsPassed)
    );
    startGame();

    this.boardCommunicatorService.gameObjectAdded$.subscribe((gameObject) => {
      if (!gameObject) return;

      addGameObject(gameObject);
    });
  }
}
