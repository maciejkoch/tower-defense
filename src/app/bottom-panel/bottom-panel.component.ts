import { Component, inject } from '@angular/core';
import { GameStateService } from '../game-state/game-state.service';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
})
export class BottomPanelComponent {
  gameState = inject(GameStateService);

  kills$ = this.gameState.kills$;
  money$ = this.gameState.money$;
  mode$ = this.gameState.mode$;

  enableBuildMode() {
    this.gameState.setMode('BUILD');
  }

  enableNormalMode() {
    this.gameState.setMode('NORMAL');
  }
}
