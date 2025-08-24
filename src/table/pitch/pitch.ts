import { Component, input, signal } from '@angular/core';
import { Tocken, TockenComponent } from "./tocken/tocken";

@Component({
  selector: 'app-pitch',
  imports: [TockenComponent],
  templateUrl: './pitch.html',
  styleUrl: './pitch.css'
})
export class Pitch {
  pitch = signal({path: 'pitches/grass.jpg', alt: 'Grass Pitch'});
  tockens = input<Tocken[]>([]);
}
