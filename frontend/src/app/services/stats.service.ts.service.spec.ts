import { TestBed } from '@angular/core/testing';

import { StatsServiceTsService } from './stats.service.ts.service';

describe('StatsServiceTsService', () => {
  let service: StatsServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
