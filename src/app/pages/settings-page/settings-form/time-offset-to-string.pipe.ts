import { Pipe, PipeTransform } from '@angular/core';
import { IOffsetDuration } from '../../../../shared/services/settings.service';

@Pipe({
  name: 'timeOffsetToString',
  standalone: true
})
export class TimeOffsetToStringPipe implements PipeTransform {

  transform(offset: IOffsetDuration): string {
    if (!offset) { return ``;}

    const { hour, minute, second } = offset;
    const durationString = [];

    if ( hour > 0 || minute > 0 || second > 0 ) { durationString.push(`Offset:`); }

    if ( hour === 1) { durationString.push(`${hour} hour`); }
    if ( hour > 1) { durationString.push(`${hour} hours`); }

    if ( minute === 1) { durationString.push(`${minute} minute`); }
    if ( minute > 1) { durationString.push(`${minute} minutes`); }

    if ( second === 1) { durationString.push(`${second} second`); }
    if ( second > 1) { durationString.push(`${second} seconds`); }

    return durationString.join(` `);
  }

}
