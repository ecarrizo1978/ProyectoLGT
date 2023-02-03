import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMediosContactoComponent } from './editar-medios-contacto.component';

describe('EditarMediosContactoComponent', () => {
  let component: EditarMediosContactoComponent;
  let fixture: ComponentFixture<EditarMediosContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMediosContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMediosContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
