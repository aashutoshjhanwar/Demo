import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,  MatFormFieldModule,MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.scss'
})
export class AddDataComponent {
  dataForm: FormGroup;
  dataEntries: { datetime: string, temperature: number }[] = [];

  constructor(private fb: FormBuilder) {
    this.dataForm = this.fb.group({
      datetime: ['', [Validators.required, this.pastDateValidator]],
      temperature: ['', [Validators.required, Validators.min(-50), Validators.max(50)]]
    });
  }

  ngOnInit(): void {}

  addData() {
    if (this.dataForm.valid) {
      this.dataEntries.push(this.dataForm.value);
      this.dataForm.reset();
    }
  }

  pastDateValidator(control: AbstractControl) {
    const inputDate = new Date(control.value);
    const today = new Date();
    return inputDate < today ? null : { invalidDate: true };
  }
}
