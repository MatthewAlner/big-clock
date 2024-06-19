import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ISettings, SettingsService } from '../../../../shared/services/settings.service';

@Component({
  selector: 'app-settings-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.scss'
})
export class SettingsFormComponent implements OnInit {

  public readonly FORM_KEYS = {
    messageText: `messageText`,
  };

  public form: FormGroup | undefined;
  public get messageText() { return this.form ? this.form.get(this.FORM_KEYS.messageText) as FormControl : null; }

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.settingsService.settings$.pipe(take(1))
      .subscribe((settings) => {
        this.buildForm(settings);
    });
  }

  private buildForm(settings: ISettings) {
    this.form = this.formBuilder.group({
      [ this.FORM_KEYS.messageText ]: [ settings?.message?.text, Validators.required ],
    });
  }

  onSaveSettings() {
    if (this.form?.invalid) { return; }

    const updatedSettings: Partial<ISettings> = {
      message: {
        text: this.form?.value[this.FORM_KEYS.messageText],
      }
    }

    this.settingsService.saveSettings(updatedSettings);
  }
}
