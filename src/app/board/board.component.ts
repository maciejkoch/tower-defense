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
    const { addGameObject, addStaticObjects, startGame } = createGame(
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

    this.boardCommunicatorService.staticObjectsAdded$.subscribe(
      (staticObjects) => {
        addStaticObjects(staticObjects);
      }
    );
  }
}
