import { Component, signal } from '@angular/core';
import { Field } from '../field/field';

@Component({
  selector: 'app-root',
  imports: [Field],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('my-proyect');
}
