import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  isOpen = signal(false);
  isAddTockenVisible = output<boolean>();
  values = signal([
    {nombre: 'Add Token', icono: '1', accion: () => { this.isAddTockenVisible.emit(true) }},
    {nombre: 'Token 2', icono: '2', accion: () => { console.log('Token 2') }},
    {nombre: 'Token 3', icono: '3', accion: () => { console.log('Token 3') }},
    {nombre: 'Token 4', icono: '4', accion: () => { console.log('Token 4') }}
  ]);

  toggleMenu() {
    this.isOpen.update(open => !open);
  }
}
