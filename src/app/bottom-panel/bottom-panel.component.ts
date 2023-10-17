import { Component, inject } from '@angular/core';
import { GameStateService } from '../game-state/game-state.service';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
})
export class BottomPanelComponent {
  gameState = inject(GameStateService);

  credits$ = this.gameState.credits$;
  kills$ = this.gameState.kills$;
  money$ = this.gameState.money$;
}
