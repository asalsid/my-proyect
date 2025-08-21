import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DraggableComponent } from './draggable';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DraggableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('my-proyect');
}
