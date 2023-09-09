import { ChangeDetectionStrategy, inject } from '@angular/core';
import { Component } from '@angular/core';
import { GameManagerService } from './game-logc/game-manager.service';
import { createHero } from './game-logc/hero/hero-factory';

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
