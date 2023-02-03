import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCargosComponent } from './editar-cargos.component';

describe('EditarCargosComponent', () => {
  let component: EditarCargosComponent;
  let fixture: ComponentFixture<EditarCargosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCargosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
