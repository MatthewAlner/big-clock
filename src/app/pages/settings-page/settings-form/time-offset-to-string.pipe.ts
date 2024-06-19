import { Pipe, PipeTransform } from '@angular/core';
import { IOffsetDuration } from '../../../../shared/services/settings.service';

@Pipe({
  name: 'timeOffsetToString',
  standalone: true
})
export class TimeOffsetToStringPipe implements PipeTransform {

  transform(offset: IOffsetDuration): string {
    if (!offset) { return ''; }

    const { hour, minute, second } = offset;

    const parts = [
      hour ? this.pluralize(hour, 'hour') : '',
      minute ? this.pluralize(minute, 'minute') : '',
      second ? this.pluralize(second, 'second') : '',
    ].filter(Boolean);

    return parts.length ? `Offset: ${parts.join(' ')}` : '';
  }

  private pluralize(count: number, noun: string): string {
    return `${count} ${noun}${count !== 1 ? 's' : ''}`;
  }
}
