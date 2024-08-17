import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityOverviewItemComponent } from './city-overview-item.component';


describe('ConditionItemComponent', () => {
  let component: CityOverviewItemComponent;
  let fixture: ComponentFixture<CityOverviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityOverviewItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityOverviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
