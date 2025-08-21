import { Component, signal } from '@angular/core';
import { Terrain } from "./terrain/terrain";

@Component({
  selector: 'app-pitch',
  imports: [Terrain],
  templateUrl: './pitch.html',
  styleUrl: './pitch.css'
})
export class Pitch {
  pitch = signal({path: 'pitches/grass.jpg', alt: 'Grass Pitch'});
}
