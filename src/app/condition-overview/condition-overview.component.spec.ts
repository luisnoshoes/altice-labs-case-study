import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionOverviewComponent } from './condition-overview.component';

describe('ConditionOverviewComponent', () => {
  let component: ConditionOverviewComponent;
  let fixture: ComponentFixture<ConditionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
