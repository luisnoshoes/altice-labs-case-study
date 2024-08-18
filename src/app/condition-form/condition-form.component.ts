import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { DateTime } from 'luxon';
import { Condition } from '../models/condition';
import { ConditionsService } from '../services/conditions.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-condition-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSliderModule, MatDatepickerModule, TranslateModule, MatProgressSpinnerModule],
  templateUrl: './condition-form.component.html',
  styleUrl: './condition-form.component.scss'
})
export class ConditionFormComponent {

  readonly maxDate = DateTime.now();

  conditionForm = this.formBuilder.nonNullable.group({
    city: ['', Validators.required],
    date: [DateTime.now(), Validators.required],
    temperature: [25, [Validators.required, Validators.min(-90), Validators.max(57)]],
    altitude: [120, [Validators.required, Validators.min(-420), Validators.max(8848)]],
    rainingStatus: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    networkPower: [5],
  });

  get date() {
    return this.conditionForm.controls.date;
  }

  get temperature() {
    return this.conditionForm.controls.temperature;
  }

  get altitude() {
    return this.conditionForm.controls.altitude;
  }

  get rainingStatus() {
    return this.conditionForm.controls.rainingStatus;
  }

  sendRequestPending = false;

  constructor(private readonly formBuilder: FormBuilder, private readonly conditionsService: ConditionsService, private readonly snackBar: MatSnackBar) { }

  onClickSend() {
    if (this.conditionForm.invalid) {
      this.conditionForm.markAllAsTouched();
      return;
    }

    const conditions: Condition = {
      city: this.conditionForm.controls.city.value,
      date: this.conditionForm.controls.date.value.toISODate(),
      temperature: this.conditionForm.controls.temperature.value,
      altitude: this.conditionForm.controls.altitude.value,
      rainingStatus: this.conditionForm.controls.rainingStatus.value,
      networkPower: this.conditionForm.controls.networkPower.value
    }

    this.sendRequestPending = true;
    this.conditionsService.sendConditions(conditions)
    .pipe(finalize(() => this.sendRequestPending = false))
    .subscribe({
      next: () => this.snackBar.open("Succesfully sent conditions", 'Close'),
      error: () => this.snackBar.open("Failed to send conditions", 'Close')
    })
  }
}
