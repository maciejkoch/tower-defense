import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BottomPanelComponent } from './bottom-panel/bottom-panel.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, BottomPanelComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
