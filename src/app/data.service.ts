import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  // BehaviorSubject to hold the current state of data entries. It is initialized with an empty array.
  private dataEntriesSubject = new BehaviorSubject<{ datetime: string, temperature: number }[]>([]);
  // Observable stream that components can subscribe to in order to get updates on data entries.
  dataEntries$ = this.dataEntriesSubject.asObservable();

  constructor() {
    // On service initialization, fetch stored entries from localStorage.
    const storedEntries = JSON.parse(localStorage.getItem('dataEntries') || '[]');
    // Update the BehaviorSubject with the stored entries.
    this.dataEntriesSubject.next(storedEntries);
  }

  /**
   * Adds a new data entry to the current list and updates localStorage.
   * @param entry - The data entry to be added.
   */
  addData(entry: { datetime: string, temperature: number }) {
    // Get the current list of entries.
    const currentEntries = this.dataEntriesSubject.value;
    // Add the new entry to the list.
    currentEntries.push(entry);
    // Update the BehaviorSubject with the new list.
    this.dataEntriesSubject.next(currentEntries);
    // Save the updated list to localStorage.
    localStorage.setItem('dataEntries', JSON.stringify(currentEntries));
  }
  
  /**
   * Deletes a data entry at the specified index from the current list and updates localStorage.
   * @param index - The index of the data entry to be deleted.
   */
  deleteData(index: number) {
    // Get the current list of entries.
    const currentEntries = this.dataEntriesSubject.value;
    // Remove the entry at the specified index.
    currentEntries.splice(index, 1);
    // Update the BehaviorSubject with the new list.
    this.dataEntriesSubject.next(currentEntries);
    // Save the updated list to localStorage.
    localStorage.setItem('dataEntries', JSON.stringify(currentEntries));
  }

  /**
   * Displays a warning alert dialog using SweetAlert2.
   * @param title - The title of the alert.
   * @param subtitle - The text of the alert.
   * @param showCancelButton - Whether to show the cancel button (default: true).
   * @param primaryButtonText - The text for the primary button (default: 'Yes').
   * @param secondaryButtonText - The text for the secondary button (default: 'No').
   * @returns A Promise that resolves to true if the primary button is clicked, and false if the cancel button is clicked.
   */
  showAlertForWarning(
    title: string,
    subtitle: string,
    showCancelButton: boolean = true,
    primaryButtonText?: string,
    secondaryButtonText?: string
  ) {
    return Swal.fire({
      title: title, // Title of the alert.
      text: subtitle, // Text of the alert.
      icon: 'warning', // Icon type of the alert.
      showCancelButton: showCancelButton, // Whether to show the cancel button.
      confirmButtonColor: '#3085d6', // Color of the confirm button.
      cancelButtonColor: '#d33', // Color of the cancel button.
      cancelButtonText: secondaryButtonText ? secondaryButtonText : 'No', // Text for the cancel button.
      confirmButtonText: primaryButtonText ? primaryButtonText : 'Yes', // Text for the confirm button.
    }).then((result): any => {
      if (result.isConfirmed) {
        return true; // User clicked the confirm button.
      } else if (result.isDismissed) {
        return false; // User clicked the cancel button or dismissed the alert.
      }
    });
  }
}
