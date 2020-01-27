import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullscreenComponent } from './motion/fullscreen/fullscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    GameComponent,
    FullscreenComponent
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
