import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { DateTime } from 'luxon';
import { Conditions } from '../models/conditions';
import { ConditionsService } from '../services/conditions.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-condition-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSliderModule, MatDatepickerModule],
  templateUrl: './condition-form.component.html',
  styleUrl: './condition-form.component.scss'
})
export class ConditionFormComponent {

  conditionForm = this.formBuilder.nonNullable.group({
    city: ['', Validators.required],
    date: [DateTime.now(), Validators.required],
    temperature: [25, [Validators.required, Validators.min(-90), Validators.max(57)]],
    altitude: [120, [Validators.required, Validators.min(-420), Validators.max(8848)]],
    rainingStatus: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    networkPower: [5],
  });

  get temperature() {
    return this.conditionForm.controls.temperature;
  }

  get altitude() {
    return this.conditionForm.controls.altitude;
  }

  get rainingStatus() {
    return this.conditionForm.controls.rainingStatus;
  }

  constructor(private readonly formBuilder: FormBuilder, private readonly conditionsService: ConditionsService, private readonly snackBar: MatSnackBar) { }

  onClickSend() {
    const conditions: Conditions = {
      city: this.conditionForm.controls.city.value,
      date: this.conditionForm.controls.date.value.toISODate(),
      temperature: this.conditionForm.controls.temperature.value,
      altitude: this.conditionForm.controls.altitude.value,
      rainingStatus: this.conditionForm.controls.rainingStatus.value,
      networkPower: this.conditionForm.controls.networkPower.value
    }

    this.conditionsService.sendConditions(conditions).subscribe({
      next: () => this.snackBar.open("Succesfully sent conditions", 'Close'),
      error: () => this.snackBar.open("Failed to send conditions", 'Close')
    })
  }
}
