import { TestBed } from '@angular/core/testing';

import { ForFilterService } from './for-filter.service';

describe('ForFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForFilterService = TestBed.get(ForFilterService);
    expect(service).toBeTruthy();
  });
});
