import { TestBed } from '@angular/core/testing';

import { CareerServiceService } from './career-service.service';

describe('CareerServiceService', () => {
  let service: CareerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
