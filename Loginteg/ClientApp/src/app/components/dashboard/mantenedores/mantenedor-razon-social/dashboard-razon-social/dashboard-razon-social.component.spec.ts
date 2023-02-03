import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRazonSocialComponent } from './dashboard-razon-social.component';

describe('DashboardRazonSocialComponent', () => {
  let component: DashboardRazonSocialComponent;
  let fixture: ComponentFixture<DashboardRazonSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRazonSocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRazonSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
