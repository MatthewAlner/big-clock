import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-scrolling-message',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './scrolling-message.component.html',
  styleUrl: './scrolling-message.component.scss'
})
export class ScrollingMessageComponent {
  messageText = input.required<string>();
}
