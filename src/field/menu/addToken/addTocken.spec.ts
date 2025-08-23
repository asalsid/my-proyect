import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTocken } from './addTocken';

describe('AddTocken', () => {
  let component: AddTocken;
  let fixture: ComponentFixture<AddTocken>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTocken]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTocken);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
