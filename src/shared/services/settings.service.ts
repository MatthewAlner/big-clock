import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ISettings {
  message: IMessageSettings;
  clock: IClockSettings;
}

export interface IMessageSettings {
  text: string;
}

export interface IClockSettings {
  offset: IOffsetDuration;
}

export interface IOffsetDuration {
  hour: number;
  minute: number;
  second: number;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public readonly DEFAULT_SETTINGS: ISettings = {
    message: {
      text: `This needs to be way bigger and marquee scroll`,
    },
    clock: {
      offset: {
        hour: 0,
        minute: 0,
        second: 0,
      },
    },
  }

  private _settings$: BehaviorSubject<ISettings> = new BehaviorSubject<ISettings>(this.DEFAULT_SETTINGS);
  public settings$: Observable<ISettings> = this._settings$.asObservable();

  constructor(
    private toast: HotToastService,
  ) { }

  public saveSettings(updatedSettings: Partial<ISettings>) {
    const existingSettings = this._settings$.value;
    this._settings$.next({...existingSettings, ...updatedSettings});
    this.toast.success(`Settings updated`);
  }
}
