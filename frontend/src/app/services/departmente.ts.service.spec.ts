import { TestBed } from '@angular/core/testing';

import { DepartmenteTsService } from './departmente.ts.service';

describe('DepartmenteTsService', () => {
  let service: DepartmenteTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmenteTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
