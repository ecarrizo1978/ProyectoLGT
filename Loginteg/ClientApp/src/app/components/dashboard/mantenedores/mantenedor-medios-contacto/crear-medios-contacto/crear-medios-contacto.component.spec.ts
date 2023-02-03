import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMediosContactoComponent } from './crear-medios-contacto.component';

describe('CrearMediosContactoComponent', () => {
  let component: CrearMediosContactoComponent;
  let fixture: ComponentFixture<CrearMediosContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMediosContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMediosContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
