import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerTimelineComponent } from './career-timeline.component';

describe('CareerTimelineComponent', () => {
  let component: CareerTimelineComponent;
  let fixture: ComponentFixture<CareerTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
