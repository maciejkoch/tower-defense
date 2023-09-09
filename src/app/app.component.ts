import { ChangeDetectionStrategy, inject } from '@angular/core';
import { Component } from '@angular/core';
import { BoardCommunicatorService } from './board-communicator.service';
import { createHero } from './game/hero/hero-factory';
import { GameManagerService } from './game-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'tower-defense';

  gameManagerService = inject(GameManagerService);

  constructor() {
    const hero = createHero();
    this.gameManagerService.addHero(hero);
  }
}
