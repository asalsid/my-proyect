import { Component, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Tocken } from '../../tocken/tocken';

@Component({
  selector: 'app-terrain',
  imports: [NgStyle],
  templateUrl: './terrain.html',
  styleUrl: './terrain.css'
})
export class Terrain extends Tocken {
  terrain = signal('terrain/barrier-1.png');
}
