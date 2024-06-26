import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeftLong, faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UpdateService } from '../../../shared/services/update.service';
import { SettingsFormComponent } from './settings-form/settings-form.component';

@Component({
  selector: `app-settings-page`,
  standalone: true,
  imports: [
    CommonModule,
    FaIconComponent,
    NgbTooltip,
    RouterLink,
    SettingsFormComponent,
  ],
  templateUrl: `./settings-page.component.html`,
  styleUrl: `./settings-page.component.scss`,
})
export class SettingsPageComponent {

  constructor (
    private updateService: UpdateService,
  ) { }

  public icons = {
    faArrowLeftLong,
    faCircleDown,
  };

  onUpdateApp () {
    const serviceWorkerEnabled = this.updateService.serviceWorkerEnabled();

    if (serviceWorkerEnabled) {
      this.forceUpdate();
    } else {
      console.log(`Service worker is not enabled`);
    }
  }

  private forceUpdate () {
    this.updateService.forceUpdate()
      .subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log(`Update completed`);
        },
      });
  }
}
