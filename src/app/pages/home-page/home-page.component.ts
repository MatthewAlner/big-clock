import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { VersionEvent } from '@angular/service-worker';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faBullhorn, faCircleDown, faCog } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
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
        if (versionEvent.type === 'VERSION_READY') {
          this.isNewAppVersionAvailable = true;
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
