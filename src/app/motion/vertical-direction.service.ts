import { GyroscopeService } from './gyroscope.service';
import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { throttle } from 'rxjs/operators';

export enum ScreenLayout {
  PORTRAIT = 'PORTRAIT',
  LANDSCAPE = 'LANDSCAPE'
}

export enum ScreenDirection {
  DOWN = 'DOWN',
  SIDEWAYS = 'SIDEWAYS',
  UP = 'UP'
}
@Injectable({
  providedIn: 'root'
})
export class VerticalDirectionService {
  private currentLayout;
  public readonly layout = new Subject<ScreenLayout>();
  public readonly direction = new Subject<ScreenDirection>();

  constructor(gyroscope: GyroscopeService) {
    gyroscope.layoutOrientation
      .pipe(throttle(() => interval(200)))
      .subscribe((layoutOrientation) => {
        switch (layoutOrientation) {
          case 'portrait-primary':
          case 'portrait-secondary':
            this.layout.next(ScreenLayout.PORTRAIT);
            this.currentLayout = ScreenLayout.PORTRAIT;
            break;
          case 'landscape-primary':
          case 'landscape-secondary':
            this.layout.next(ScreenLayout.LANDSCAPE);
            this.currentLayout = ScreenLayout.LANDSCAPE;
            break;
        }
      });

    gyroscope.gyroOrientation
      .pipe(throttle(() => interval(200)))
      .subscribe((gyroOrientation) => {
        if (this.currentLayout === ScreenLayout.LANDSCAPE) {
          if (gyroOrientation.gamma < 0 && gyroOrientation.gamma > -40) {
            this.direction.next(ScreenDirection.UP);
          } else if (gyroOrientation.gamma > 0 && gyroOrientation.gamma < 40) {
            this.direction.next(ScreenDirection.DOWN);
          } else {
            this.direction.next(ScreenDirection.SIDEWAYS);
          }
        } else if (this.currentLayout === ScreenLayout.PORTRAIT) {
          if (gyroOrientation.beta < 50) {
            this.direction.next(ScreenDirection.UP);
          } else if (gyroOrientation.beta > 130) {
            this.direction.next(ScreenDirection.DOWN);
          } else {
            this.direction.next(ScreenDirection.SIDEWAYS);
          }
        }
      });
  }
}
