import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersManagementComponent } from './careers-management.component';

describe('CareersManagementComponent', () => {
  let component: CareersManagementComponent;
  let fixture: ComponentFixture<CareersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareersManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
