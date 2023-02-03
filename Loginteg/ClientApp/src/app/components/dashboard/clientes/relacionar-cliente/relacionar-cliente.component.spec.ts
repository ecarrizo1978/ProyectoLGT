import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionarClienteComponent } from './relacionar-cliente.component';

describe('RelacionarClienteComponent', () => {
  let component: RelacionarClienteComponent;
  let fixture: ComponentFixture<RelacionarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelacionarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
