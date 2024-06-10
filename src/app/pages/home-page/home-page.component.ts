import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { ClockComponent } from './clock/clock.component';
import { ScrollingMessageComponent } from './scrolling-message/scrolling-message.component';

export type mode = 'clock' | 'message';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ClockComponent,
    CommonModule,
    FaIconComponent,
    ScrollingMessageComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  public mode: mode = 'clock';
  public icons = {
    faBullhorn,
    faClock,
  };

  public onEnableClockModeClick(): void {
    this.mode = 'clock';
  }

  public onEnableMessageModeClick(): void {
    this.mode = 'message';
  }
}
