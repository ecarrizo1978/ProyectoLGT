import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRazonSocialComponent } from './crear-razon-social.component';

describe('CrearRazonSocialComponent', () => {
  let component: CrearRazonSocialComponent;
  let fixture: ComponentFixture<CrearRazonSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRazonSocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRazonSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
