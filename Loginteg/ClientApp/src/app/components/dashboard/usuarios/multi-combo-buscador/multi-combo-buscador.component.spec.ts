import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiComboBuscadorComponent } from './multi-combo-buscador.component';

describe('MultiComboBuscadorComponent', () => {
  let component: MultiComboBuscadorComponent;
  let fixture: ComponentFixture<MultiComboBuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiComboBuscadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiComboBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
