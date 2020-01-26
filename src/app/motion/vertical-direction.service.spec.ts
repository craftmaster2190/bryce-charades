import { TestBed } from '@angular/core/testing';

import { VerticalDirectionService } from './vertical-direction.service';

describe('VerticalDirectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerticalDirectionService = TestBed.get(VerticalDirectionService);
    expect(service).toBeTruthy();
  });
});
