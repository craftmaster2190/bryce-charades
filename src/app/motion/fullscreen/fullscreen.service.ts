import * as screenfull from 'screenfull';
import { Injectable } from '@angular/core';
import { Mutable } from 'src/app/mutable';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {
  private appRoot;

  constructor() {}

  isSupported() {
    return screenfull.isEnabled;
  }

  isFullscreen() {
    return (screenfull as any).isFullscreen;
  }

  toggle() {
    (screenfull as any).toggle();
  }
}
