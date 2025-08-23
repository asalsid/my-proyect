import { Component, input, signal, effect } from '@angular/core';
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
