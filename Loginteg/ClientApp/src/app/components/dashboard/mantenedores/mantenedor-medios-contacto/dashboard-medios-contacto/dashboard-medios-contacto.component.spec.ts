import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMediosContactoComponent } from './dashboard-medios-contacto.component';

describe('DashboardMediosContactoComponent', () => {
  let component: DashboardMediosContactoComponent;
  let fixture: ComponentFixture<DashboardMediosContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMediosContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMediosContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
