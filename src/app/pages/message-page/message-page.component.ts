import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { SettingsService } from '../../../shared/services/settings.service';
import { SettingsButtonComponent } from '../../../shared/settings-button/settings-button.component';
import { ScrollingMessageComponent } from '../home-page/scrolling-message/scrolling-message.component';

@Component({
  selector: 'app-message-page',
  standalone: true,
  imports: [
    CommonModule,
    FaIconComponent,
    RouterLink,
    ScrollingMessageComponent,
    SettingsButtonComponent,
  ],
  templateUrl: './message-page.component.html',
  styleUrl: './message-page.component.scss'
})
export class MessagePageComponent {

  constructor(
    public settingsService: SettingsService,
  ) { }

  public icons = {
    faClock,
  };
}
