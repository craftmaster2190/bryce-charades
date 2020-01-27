import { Injectable } from '@angular/core';

export interface Options {
  seconds: number;
  addTimeOnCorrect: number;
}
@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  constructor() {}

  getDefaultOptions(): Options {
    return {
      seconds: 5,
      addTimeOnCorrect: 0
    };
  }
}
