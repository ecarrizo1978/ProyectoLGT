import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBuscadorComponent2 } from './combo-buscador2.component';

describe('ComboBuscadorComponent2', () => {
  let component: ComboBuscadorComponent2;
  let fixture: ComponentFixture<ComboBuscadorComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboBuscadorComponent2 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBuscadorComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
