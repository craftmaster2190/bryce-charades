import { TestBed } from '@angular/core/testing';

import { WordListsService } from './word-lists.service';

describe('WordListsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordListsService = TestBed.get(WordListsService);
    expect(service).toBeTruthy();
  });
});
