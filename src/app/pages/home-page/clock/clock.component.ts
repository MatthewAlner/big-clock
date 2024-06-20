import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { add } from 'date-fns/add';
import { combineLatest, map, Observable, shareReplay, timer } from 'rxjs';
import { SettingsService } from '../../../../shared/services/settings.service';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent {

  public offsetTime$: Observable<Date>;

  constructor(
    private settingsService: SettingsService,
  ) {
    this.offsetTime$ = combineLatest({ time: this.time$, settings: this.settingsService.settings$ })
      .pipe(
        map(({time, settings}) => {
          const { hour, minute, second} = settings.clock.offset;
          return add(time, {
            hours: hour,
            minutes: minute,
            seconds: second,
          });
        }),
        shareReplay(1)
      );
  }

  public time$: Observable<Date> = timer(0, 1000)
    .pipe(
      map(tick => new Date()),
      shareReplay(1)
    );

}
