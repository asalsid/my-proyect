import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tocken } from './tocken';

describe('Tocken', () => {
  let component: Tocken;
  let fixture: ComponentFixture<Tocken>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tocken]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tocken);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
