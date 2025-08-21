import { Component, signal } from '@angular/core';
import { Pitch } from './pitch/pitch';
import { Terrain } from './pitch/terrain/terrain';

@Component({
  selector: 'app-field',
  imports: [Pitch],
  templateUrl: './field.html',
  styleUrl: './field.css'
})
export class Field {
}
