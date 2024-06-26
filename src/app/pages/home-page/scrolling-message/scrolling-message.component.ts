import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { NgxFastMarqueeModule } from 'ngx-fast-marquee';

@Component({
  selector: `app-scrolling-message`,
  standalone: true,
  imports: [
    CommonModule,
    NgxFastMarqueeModule,
  ],
  templateUrl: `./scrolling-message.component.html`,
  styleUrl: `./scrolling-message.component.scss`,
})
export class ScrollingMessageComponent {
  public messageText = input.required<string>();
}
