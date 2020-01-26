import { GyroscopeService } from './gyroscope.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerticalDirectionService {
  constructor(private readonly gyroscope: GyroscopeService) {}
}
