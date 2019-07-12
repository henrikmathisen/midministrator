import { TestBed } from '@angular/core/testing';

import { ServerInterceptorService } from './server-interceptor.service';

describe('ServerInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerInterceptorService = TestBed.get(ServerInterceptorService);
    expect(service).toBeTruthy();
  });
});
