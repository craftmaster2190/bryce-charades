import { FullscreenService } from './motion/fullscreen/fullscreen.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(fullscreen: FullscreenService) {}
}
