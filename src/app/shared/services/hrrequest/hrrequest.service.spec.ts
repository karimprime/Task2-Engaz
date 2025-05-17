import { TestBed } from '@angular/core/testing';

import { HrrequestService } from './hrrequest.service';

describe('HrrequestService', () => {
  let service: HrrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
