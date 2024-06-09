import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map, Observable, shareReplay, timer } from 'rxjs';

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
  public time$: Observable<Date> = timer(0, 1000).pipe(
    map(tick => new Date()),
    shareReplay(1)
  );
}
