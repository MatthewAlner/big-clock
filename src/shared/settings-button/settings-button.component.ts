import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { VersionEvent } from '@angular/service-worker';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleDown, faCog } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UpdateService } from '../services/update.service';

@Component({
  selector: 'app-settings-button',
  standalone: true,
  imports: [
    CommonModule,
    FaIconComponent,
    NgbTooltip,
    RouterLink,
  ],
  templateUrl: './settings-button.component.html',
  styleUrl: './settings-button.component.scss'
})
export class SettingsButtonComponent implements OnInit {

  constructor(
    private destroyRef: DestroyRef,
    private updateService: UpdateService,
  ) { }

  public isNewAppVersionAvailable = false;
  public icons = {
    faCircleDown,
    faCog,
  };

  public ngOnInit(): void {
    this.updateService.updateAvailable$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((versionEvent: VersionEvent) => {
        if (versionEvent.type === 'VERSION_READY') {
          this.isNewAppVersionAvailable = true;
        }
      });
  }
}
