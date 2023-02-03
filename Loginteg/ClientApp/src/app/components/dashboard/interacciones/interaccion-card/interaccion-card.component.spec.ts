import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteraccionCardComponent } from './interaccion-card.component';

describe('InteraccionCardComponent', () => {
  let component: InteraccionCardComponent;
  let fixture: ComponentFixture<InteraccionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteraccionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteraccionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
