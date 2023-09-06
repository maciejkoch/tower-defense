import { ChangeDetectionStrategy, inject } from '@angular/core';
import { Component } from '@angular/core';
import { BoardCommunicatorService } from './board-communicator.service';
import { createHero } from './game/game-objects/hero-factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'tower-defense';

  boardCommunicatorService = inject(BoardCommunicatorService);

  constructor() {
    const hero = createHero();
    this.boardCommunicatorService.addHero(hero);
  }
}
