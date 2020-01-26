import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface GyroOrientation {
  absolute: boolean;
  alpha: number;
  beta: number;
  gamma: number;
}

export interface GyroMotion {
  acceleration: DeviceMotionEventAcceleration;
  rotationRate: DeviceMotionEventRotationRate;
}

@Injectable({
  providedIn: 'root'
})
export class GyroscopeService {
  public readonly desktop = !navigator.userAgent.match(
    /(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i
  );
  public readonly orientationSupport = !!(window as any).DeviceOrientationEvent;
  public readonly layoutSupport =
    !!window.screen && !!window.screen.orientation;
  public readonly notSupportedMessage = [
    this.desktop ? 'This is a Desktop' : null,
    this.orientationSupport ? null : 'Orientation is not supported',
    this.layoutSupport ? null : 'Layout is not supported'
  ]
    .filter((status) => !!status)
    .join(', ');
  public readonly gyroOrientation = new Subject<GyroOrientation>();
  public readonly layoutOrientation = new Subject<OrientationType>();

  constructor() {
    if (this.orientationSupport) {
      window.addEventListener(
        'deviceorientation',
        this.onDeviceOrientation,
        true
      );
    }
    if (this.layoutSupport) {
      screen.orientation.addEventListener(
        'change',
        this.onScreenOrientationChange
      );
      setTimeout(() => this.onScreenOrientationChange(), 100);
    }
  }

  onDeviceOrientation = (event: DeviceOrientationEvent) => {
    const { absolute, alpha, beta, gamma } = event;
    this.gyroOrientation.next({ absolute, alpha, beta, gamma });
  };

  onScreenOrientationChange = () => {
    this.layoutOrientation.next(screen.orientation.type);
  };
}
