import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameManagerService } from './game-logc/game-manager.service';

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
    // const hero = createHero();
    // this.gameManagerService.addHero(hero);
  }
}
