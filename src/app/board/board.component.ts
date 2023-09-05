import { Component, inject } from '@angular/core';
import { createGame } from '../game/game-engine';
import { createEnemy } from '../game/enemy-factory';
import { GameObject } from '../game/game-object.model';
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
    const { addGameObject, startGame } = createGame(canvas);
    startGame();

    this.boardCommunicatorService.gameObjectAdded$.subscribe((gameObject) => {
      addGameObject(gameObject);
    });
  }
}
