import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRoles } from './dashboard-roles.component';

describe('DashboardRoles', () => {
  let component: DashboardRoles;
  let fixture: ComponentFixture<DashboardRoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardRoles ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRoles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
