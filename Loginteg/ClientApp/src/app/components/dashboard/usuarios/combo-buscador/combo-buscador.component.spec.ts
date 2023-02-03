import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBuscadorComponent } from './combo-buscador.component';

describe('ComboBuscadorComponent', () => {
  let component: ComboBuscadorComponent;
  let fixture: ComponentFixture<ComboBuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboBuscadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
