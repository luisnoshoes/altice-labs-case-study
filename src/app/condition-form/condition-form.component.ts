import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-condition-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSliderModule, MatDatepickerModule],
  templateUrl: './condition-form.component.html',
  styleUrl: './condition-form.component.scss'
})
export class ConditionFormComponent {

  conditionForm = this.formBuilder.group({
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
  
  constructor(private readonly formBuilder: FormBuilder){}
}
