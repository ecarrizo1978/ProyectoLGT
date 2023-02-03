import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDepartamentosComponent } from './dashboard-departamentos.component';

describe('DashboardDepartamentosComponent', () => {
  let component: DashboardDepartamentosComponent;
  let fixture: ComponentFixture<DashboardDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDepartamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
