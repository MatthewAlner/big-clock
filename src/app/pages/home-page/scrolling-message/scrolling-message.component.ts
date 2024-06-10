import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxMarqueeModule } from 'ngx-marquee';

@Component({
  selector: 'app-scrolling-message',
  standalone: true,
  imports: [
    CommonModule,
    NgxMarqueeModule,
  ],
  templateUrl: './scrolling-message.component.html',
  styleUrl: './scrolling-message.component.scss'
})
export class ScrollingMessageComponent {

}
