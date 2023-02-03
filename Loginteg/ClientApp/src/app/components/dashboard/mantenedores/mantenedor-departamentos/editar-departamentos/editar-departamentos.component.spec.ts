import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDepartamentosComponent } from './editar-departamentos.component';

describe('EditarDepartamentosComponent', () => {
  let component: EditarDepartamentosComponent;
  let fixture: ComponentFixture<EditarDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDepartamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
