import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
import { ViewDataComponent } from '../view-data/view-data.component';
import { Subscription } from 'rxjs';
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
  // Subscription to data entries observable
  private dataSubscription!: Subscription;

  // Form group for handling data input
  dataForm: FormGroup;

  // Array to hold the data entries
  dataEntries: { datetime: string, temperature: number }[] = [];

  // Constructor to inject FormBuilder and DataService
  constructor(private fb: FormBuilder, private dataService: DataService) {
    // Initialize the form group with controls and validators
    this.dataForm = this.fb.group({
      datetime: ['', [Validators.required, this.pastDateValidator]],
      temperature: ['', [Validators.required, Validators.min(-50), Validators.max(50)]]
    });
  }

  // Lifecycle hook to perform initialization logic
  ngOnInit(): void {
    // Subscribe to the dataEntries$ observable to keep the dataEntries array updated
    this.dataSubscription = this.dataService.dataEntries$.subscribe(entries => {
      this.dataEntries = entries;
    });
  }

  // Lifecycle hook to clean up when the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from the dataEntries$ observable to prevent memory leaks
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  // Method to add new data entry
  addData() {
    // Check if the form is valid
    if (this.dataForm.valid) {
      // Add the data entry to the service
      this.dataService.addData(this.dataForm.value);
      // Reset the form
      this.dataForm.reset();
    }
  }

  // Custom validator to ensure the datetime is in the past
  pastDateValidator(control: AbstractControl) {
    const inputDate = new Date(control.value);
    const today = new Date();
    return inputDate < today ? null : { invalidDate: true };
  }

  // Method to show a confirmation modal before deleting an entry
  deleteModalConfirmation(index: number) {
    this.dataService.showAlertForWarning(
        'Delete',
        'Are you sure, you want to delete this Entry?'
      )
      .then((result: any) => {
        if (result) {
          // If the user confirms, delete the entry
          this.dataService.deleteData(index);
        }
      });
  }
}
