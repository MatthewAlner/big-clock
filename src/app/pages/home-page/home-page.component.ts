import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { SettingsButtonComponent } from '../../../shared/settings-button/settings-button.component';
import { ClockComponent } from './clock/clock.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ClockComponent,
    CommonModule,
    FaIconComponent,
    RouterLink,
    SettingsButtonComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  public icons = {
    faBullhorn,
  };
}
