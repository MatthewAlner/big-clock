import { Injectable } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  public updateAvailable$: Observable<VersionEvent>;

  constructor(
    private swUpdate: SwUpdate,
  ) {
    this.updateAvailable$ = this.swUpdate.versionUpdates;
  }

  public forceUpdate(): Observable<boolean> {
    return from(this.swUpdate.activateUpdate());
  }

  public checkForUpdate(): Observable<boolean> {
    return from(this.swUpdate.checkForUpdate());
  }

  public serviceWorkerEnabled(): boolean {
    return this.swUpdate.isEnabled;
  }
}
