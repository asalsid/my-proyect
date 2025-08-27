import { Component, signal, output, input } from '@angular/core';
import { Tocken } from '../tocken/tocken';

@Component({
  selector: 'app-action-bar',
  imports: [],
  templateUrl: './action-bar.html',
  styleUrl: './action-bar.css'
})
export class ActionBar {
  tocken = input<Tocken>();
  values = signal([
    {nombre: 'Remove Token', icono: '1', accion: () => { console.log('Remove Token') }},
    {nombre: 'Token 2', icono: '2', accion: () => { console.log('Token 2') }},
    {nombre: 'Token 3', icono: '3', accion: () => { console.log('Token 3') }},
    {nombre: 'Token 4', icono: '4', accion: () => { console.log('Token 4') }}
  ]);
}
