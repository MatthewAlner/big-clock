import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ISettings {
  message: IMessageSettings;
}

export interface IMessageSettings {
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public readonly DEFAULT_SETTINGS: ISettings = {
    message: {
      text: `This needs to be way bigger and marquee scroll`,
    }
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
