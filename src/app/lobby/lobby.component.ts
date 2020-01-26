import { GyroscopeService } from '../motion/gyroscope.service';
import { VerticalDirectionService } from '../motion/vertical-direction.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { throttle } from 'rxjs/operators';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public notSupported = 'Loading Gyroscope...';

  constructor(private readonly gyroscope: GyroscopeService) {}

  ngOnInit() {
    this.notSupported = this.gyroscope.notSupportedMessage;
  }
}
