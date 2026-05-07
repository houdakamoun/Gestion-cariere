import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionChartComponentTsComponent } from './evolution-chart.component.ts.component';

describe('EvolutionChartComponentTsComponent', () => {
  let component: EvolutionChartComponentTsComponent;
  let fixture: ComponentFixture<EvolutionChartComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionChartComponentTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionChartComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
