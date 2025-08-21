import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Terrain } from './terrain';

describe('Terrain', () => {
  let component: Terrain;
  let fixture: ComponentFixture<Terrain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Terrain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Terrain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
