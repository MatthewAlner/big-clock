import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { HotToastService } from '@ngxpert/hot-toast';
import { Observable, distinctUntilChanged, from } from 'rxjs';

@Injectable({
  providedIn: `root`,
})
export class UpdateService {

  public updateAvailable$: Observable<VersionEvent>;

  constructor (
    private destroyRef: DestroyRef,
    private swUpdate: SwUpdate,
    private toast: HotToastService,
  ) {
    this.updateAvailable$ = this.swUpdate.versionUpdates;

    this.swUpdate.versionUpdates
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
      )
      .subscribe((versionEvent: VersionEvent) => {
        console.log({ versionEvent });

        switch (versionEvent.type) {
          case `VERSION_READY`:
            // An event emitted when a new version of the app is available.
            this.toast.info(`New version is ready`);
            break;
          case `VERSION_INSTALLATION_FAILED`:
            // An event emitted when the installation of a new version failed. It may be used for logging/ monitoring purposes.
            this.toast.error(`New version failed to install`);
            break;
          case `VERSION_DETECTED`:
            // An event emitted when the service worker has detected a new version of the app on the server and is about to start downloading it.
            this.toast.info(`New version detected`);
            break;
          case `NO_NEW_VERSION_DETECTED`:
            // An event emitted when the service worker has checked the version of the app on the server and it didn't find a new version that it doesn't have already downloaded.
            break;
          default:
            this.toast.warning(`Unknown version event`);
            break;
        }
      });
  }

  public forceUpdate (): Observable<boolean> {
    return from(this.swUpdate.activateUpdate());
  }

  public checkForUpdate (): Observable<boolean> {
    return from(this.swUpdate.checkForUpdate());
  }

  public serviceWorkerEnabled (): boolean {
    return this.swUpdate.isEnabled;
  }
}
