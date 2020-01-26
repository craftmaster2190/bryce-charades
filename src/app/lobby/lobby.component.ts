import { GyroscopeService } from '../motion/gyroscope.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"]
})
export class LobbyComponent implements OnInit {
  public notSupported = "Loading Gyroscope...";

  constructor(private readonly gyroscope: GyroscopeService) {}

  ngOnInit() {
    this.gyroscope.supported
      .then(() => (this.notSupported = null))
      .catch(err => (this.notSupported = err));
  }
}
