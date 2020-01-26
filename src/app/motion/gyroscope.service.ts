import Parallax from 'parallax-js';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface GyroOrientation {
  absolute: boolean;
  alpha: number;
  beta: number;
  gamma: number;
}

@Injectable({
  providedIn: "root"
})
export class GyroscopeService {
  public readonly supported: Promise<void>;
  public readonly gyroOrientation = new Subject<GyroOrientation>();

  constructor() {
    this.supported = new Promise((resolve, reject) => {
      const searchInterval = setInterval(() => {
        const appRoot = document.getElementById("app-root");
        if (appRoot == null) {
          return;
        }

        clearInterval(searchInterval);
        const parallax = new Parallax(appRoot, {
          onReady: () =>
            setTimeout(() => {
              const errorMessage = [
                parallax.desktop ? "This is a Desktop" : null,
                parallax.motionSupport ? null : "Motion is not supported",
                parallax.orientationSupport
                  ? null
                  : "Orientation is not supported"
              ]
                .filter(status => !!status)
                .join(", ");
              if (errorMessage) {
                console.log("reject");
                reject(errorMessage);
              } else {
                console.log("resolve");
                resolve();
              }
            }, 100)
        });
        console.log(parallax);
        (window as any).parallax = parallax;
      }, 500);
    });
  }
}
