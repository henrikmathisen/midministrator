import { TestBed } from '@angular/core/testing';

import { GrantService } from './grant.service';

describe('GrantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrantService = TestBed.get(GrantService);
    expect(service).toBeTruthy();
  });
});
