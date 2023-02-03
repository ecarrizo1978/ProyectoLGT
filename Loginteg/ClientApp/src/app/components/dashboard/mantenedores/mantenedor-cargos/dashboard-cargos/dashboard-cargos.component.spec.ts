import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCargosComponent } from './dashboard-cargos.component';

describe('DashboardCargosComponent', () => {
  let component: DashboardCargosComponent;
  let fixture: ComponentFixture<DashboardCargosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCargosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
