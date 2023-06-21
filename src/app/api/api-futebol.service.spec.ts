import { TestBed } from '@angular/core/testing';

import { ApiFutebolService } from './api-futebol.service';

describe('ApiFutebolService', () => {
  let service: ApiFutebolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFutebolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
