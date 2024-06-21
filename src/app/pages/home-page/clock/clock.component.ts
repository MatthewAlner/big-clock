import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent {
  time: InputSignal<Date | null> = input.required();
}
