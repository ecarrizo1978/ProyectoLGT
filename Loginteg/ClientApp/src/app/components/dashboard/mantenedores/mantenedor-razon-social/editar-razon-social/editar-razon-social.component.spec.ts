import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRazonSocialComponent } from './editar-razon-social.component';

describe('EditarRazonSocialComponent', () => {
  let component: EditarRazonSocialComponent;
  let fixture: ComponentFixture<EditarRazonSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRazonSocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRazonSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
