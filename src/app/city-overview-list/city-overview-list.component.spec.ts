import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityOverviewListComponent } from './city-overview-list.component';

describe('ConditionListComponent', () => {
  let component: CityOverviewListComponent;
  let fixture: ComponentFixture<CityOverviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityOverviewListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityOverviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
