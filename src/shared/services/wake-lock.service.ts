import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WakeLockService {

  private wakeLock: any;
  private _isWakeLockEnabled = signal<boolean>(false);
  public isWakeLockEnabled = this._isWakeLockEnabled.asReadonly();

  constructor() {
    if ('WakeLock' in window && 'request' in window.WakeLock) {
      this.requestWakeLock();
      this.setupVisibilityChangeListener();
    } else if ('wakeLock' in navigator && 'request' in navigator.wakeLock) {
      // alt way to request wake lock
    } else {
      console.error('Wake Lock API not supported.');
    }
  }

  public toggleWakeLock() {
    if (this._isWakeLockEnabled()) {
      this.wakeLock.abort();
      this.wakeLock = null;
    } else {
      this.wakeLock = this.requestWakeLock();
    }
  }

  private requestWakeLock() {
    const controller = new AbortController();
    const signal = controller.signal;
    // @ts-ignore
    window.WakeLock.request('screen', {signal})
      .catch((e: Error) => {
        if (e.name === 'AbortError') {
          this._isWakeLockEnabled.set(false);
          console.log('Wake Lock was aborted');
        } else {
          console.error(`${e.name}, ${e.message}`);
        }
      });
    this._isWakeLockEnabled.set(true);
    console.log('Wake Lock is active');
    return controller;
  }

  private handleVisibilityChange() {
    if (this.wakeLock !== null && document.visibilityState === 'visible') {
      this.wakeLock = this.requestWakeLock();
    }
  }

  private setupVisibilityChangeListener() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    document.addEventListener('fullscreenchange', this.handleVisibilityChange);
  }
}
