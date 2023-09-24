import { Component, inject } from '@angular/core';
import { GameManagerService } from '../game-logc/game-manager.service';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
})
export class BottomPanelComponent {
  gameManagerService = inject(GameManagerService);
  kills$ = this.gameManagerService.kills$;
  money$ = this.gameManagerService.money$;
  mode$ = this.gameManagerService.mode$;

  enableBuildMode() {
    this.gameManagerService.enableBuildingMode();
  }

  enableNormalMode() {
    this.gameManagerService.enableNormalMode();
  }
}
