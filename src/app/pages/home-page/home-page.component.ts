import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { VersionEvent } from '@angular/service-worker';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faBullhorn, faCircleDown, faCog } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngxpert/hot-toast';
import { UpdateService } from '../../../shared/services/update.service';
import { ClockComponent } from './clock/clock.component';
import { ScrollingMessageComponent } from './scrolling-message/scrolling-message.component';

export type mode = 'clock' | 'message';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ClockComponent,
    CommonModule,
    CommonModule,
    FaIconComponent,
    NgbTooltip,
    RouterLink,
    ScrollingMessageComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(
    private destroyRef: DestroyRef,
    private toast: HotToastService,
    private updateService: UpdateService,
  ) { }

  public mode: mode = 'clock';
  public icons = {
    faBullhorn,
    faCircleDown,
    faClock,
    faCog,
  };

  public isNewAppVersionAvailable = false;

  public ngOnInit(): void {
    this.updateService.updateAvailable$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((versionEvent: VersionEvent) => {
        console.log({ versionEvent });

        switch (versionEvent.type) {
          case 'VERSION_READY':
            // An event emitted when a new version of the app is available.
            this.toast.info('New version is ready');
            this.isNewAppVersionAvailable = true;
            break;
          case 'VERSION_INSTALLATION_FAILED':
            // An event emitted when the installation of a new version failed. It may be used for logging/ monitoring purposes.
            this.toast.error('New version failed to install');
            break;
          case 'VERSION_DETECTED':
            // An event emitted when the service worker has detected a new version of the app on the server and is about to start downloading it.
            this.toast.info('New version detected');
            break;
          case 'NO_NEW_VERSION_DETECTED':
            // An event emitted when the service worker has checked the version of the app on the server and it didn't find a new version that it doesn't have already downloaded.
            this.toast.info('No new version detected');
            this.isNewAppVersionAvailable = false;
            break;
          default:
            this.toast.warning('Unknown version event');
            break;
        }

      });
  }

  public onEnableClockModeClick(): void {
    this.mode = 'clock';
  }

  public onEnableMessageModeClick(): void {
    this.mode = 'message';
  }
}
