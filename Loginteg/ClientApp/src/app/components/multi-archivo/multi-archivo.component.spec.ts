import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiArchivoComponent } from './multi-archivo.component';

describe('MultiArchivoComponent', () => {
  let component: MultiArchivoComponent;
  let fixture: ComponentFixture<MultiArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiArchivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
