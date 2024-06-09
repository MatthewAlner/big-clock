import { Component } from '@angular/core';
import { ClockComponent } from './clock/clock.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ClockComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
