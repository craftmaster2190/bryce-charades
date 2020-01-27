import { FullscreenService } from './fullscreen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss']
})
export class FullscreenComponent implements OnInit {
  constructor(public readonly fullscreen: FullscreenService) {}

  ngOnInit() {}

  toggle() {
    this.fullscreen.toggle();
  }
}
