import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBullhorn, faFastForward, faLock, faLockOpen, faMaximize, faMinimize } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { add } from 'date-fns/add';
import { Observable, combineLatest, map, shareReplay, timer } from 'rxjs';
import { SettingsService } from '../../../shared/services/settings.service';
import { WakeLockService } from '../../../shared/services/wake-lock.service';
import { SettingsButtonComponent } from '../../../shared/settings-button/settings-button.component';
import { TimeOffsetToStringPipe } from '../settings-page/settings-form/time-offset-to-string.pipe';
import { ClockComponent } from './clock/clock.component';

@Component({
  selector: `app-home-page`,
  standalone: true,
  imports: [
    ClockComponent,
    CommonModule,
    FaIconComponent,
    NgbTooltip,
    RouterLink,
    SettingsButtonComponent,
    TimeOffsetToStringPipe,
  ],
  templateUrl: `./home-page.component.html`,
  styleUrl: `./home-page.component.scss`,
})
export class HomePageComponent {

  public offsetTime$: Observable<Date>;
  public clockSettings$ = this.settingsService.settings$.pipe(map(settings => settings.clock));
  public isFullScreen = false;
  public isWakeLockEnabled: Signal<boolean>;

  public icons = {
    faBullhorn,
    faFastForward,
    faLock,
    faLockOpen,
    faMaximize,
    faMinimize,
  };

  constructor (
    private wakeLockService: WakeLockService,
    public settingsService: SettingsService,
  ) {
    this.isWakeLockEnabled = this.wakeLockService.isWakeLockEnabled;

    this.offsetTime$ = combineLatest({ time: this.time$, settings: this.settingsService.settings$ })
      .pipe(
        map(({ time, settings }) => {
          const { hour, minute, second } = settings.clock.offset;
          return add(time, {
            hours: hour,
            minutes: minute,
            seconds: second,
          });
        }),
        shareReplay(1),
      );
  }

  public time$: Observable<Date> = timer(0, 1000)
    .pipe(
      map(tick => new Date()),
      shareReplay(1),
    );

  onSetTimeOffset (offsetEnabled: boolean) {
    this.settingsService.saveSettings({ clock: { offsetEnabled } });
  }

  public async onToggleMaximise () {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      this.isFullScreen = true;
    } else {
      await document.exitFullscreen();
      this.isFullScreen = false;
    }
  }
}
