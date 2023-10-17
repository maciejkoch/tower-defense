import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { CodeEditorModule } from '@ngstack/code-editor';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BottomPanelComponent } from './bottom-panel/bottom-panel.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BottomPanelComponent,
    CodeEditorComponent,
  ],
  imports: [
    BrowserModule, //
    FormsModule,
    CodeEditorModule.forRoot(), // TODO this is here only to enable monaco editor. Finally it should not be needed.
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
