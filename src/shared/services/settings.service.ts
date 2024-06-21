import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeepPartial } from '../../utils';

export interface ISettings {
  message: IMessageSettings;
  clock: IClockSettings;
}

export interface IMessageSettings {
  text: string;
}

export interface IClockSettings {
  offset: IOffsetDuration;
  offsetEnabled: boolean;
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
      text: `This is a default message. You can change it in the settings.`,
    },
    clock: {
      offset: {
        hour: 0,
        minute: 0,
        second: 0,
      },
      offsetEnabled: false,
    },
  }

  private _settings$: BehaviorSubject<ISettings> = new BehaviorSubject<ISettings>(this.DEFAULT_SETTINGS);
  public settings$: Observable<ISettings> = this._settings$.asObservable();

  constructor(
    private toast: HotToastService,
  ) { }

  public saveSettings(updatedSettings: DeepPartial<ISettings>) {
    const existingSettings = this._settings$.value;

    const clock: IClockSettings = { ...existingSettings.clock, ...updatedSettings.clock };
    const message: IMessageSettings = { ...existingSettings.message, ...updatedSettings.message };

    this._settings$.next({ clock, message });
    this.toast.success(`Settings updated`);
  }
}
