import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { CodeEditorModule } from '@ngstack/code-editor';

import { environment } from '../environments/environment';
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
