import { TestBed } from '@angular/core/testing';

import { IdentityResourceService } from './identity-resource.service';

describe('IdentityResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentityResourceService = TestBed.get(IdentityResourceService);
    expect(service).toBeTruthy();
  });
});
