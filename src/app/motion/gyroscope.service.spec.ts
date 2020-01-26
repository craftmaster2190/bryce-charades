import { TestBed } from '@angular/core/testing';

import { GyroscopeService } from './gyroscope.service';

describe('GyroscopeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GyroscopeService = TestBed.get(GyroscopeService);
    expect(service).toBeTruthy();
  });
});
