import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables, ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { CommonModule, DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-data',
  standalone: true,
  imports: [BaseChartDirective,CommonModule],
  providers: [DatePipe], // Provide DatePipe here
  templateUrl: './view-data.component.html',
  styleUrl: './view-data.component.scss'
})
export class ViewDataComponent implements OnInit, OnDestroy  {
 // Subscription to the dataEntries$ observable
 private dataSubscription!: Subscription;

 // Data configuration for the line chart
 lineChartData: ChartData<'line'> = {
   datasets: [
     {
       data: [], // Data points for the temperature
       label: 'Temperature (°C)', // Label for the dataset
       borderColor: 'black', // Color of the line
       backgroundColor: 'rgba(255,0,0,0.3)', // Background color under the line
     }
   ],
   labels: [] // Labels for the x-axis
 };

 // Options configuration for the line chart
 lineChartOptions: ChartOptions = {
   maintainAspectRatio: false, // Maintain aspect ratio
   aspectRatio: 1, // Aspect ratio of the chart
   responsive: true, // Make the chart responsive
   // Uncomment to add a title to the chart using Chart.js plugins
   // plugins: {
   //   title: {
   //     display: true,
   //     text: 'Temperature Data Over Time'
   //   }
   // }
 };

 // Display the legend for the chart
 lineChartLegend = true;

 // Type of chart to display
 lineChartType: ChartType = 'line';

 // Constructor to inject services
 constructor(
   private cdr: ChangeDetectorRef, // Service to manually trigger change detection
   private dataService: DataService, // Custom service to handle data
   private datePipe: DatePipe // Service to format dates
 ) {
   // Register all required components for Chart.js
   Chart.register(...registerables);
 }

 // Lifecycle hook that is called after data-bound properties are initialized
 ngOnInit(): void {
   // Subscribe to dataEntries$ observable to get data updates
   this.dataSubscription = this.dataService.dataEntries$.subscribe(dataEntries => {
     // Sort dataEntries by datetime in ascending order
     dataEntries.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

     // Update the chart data with sorted entries
     this.lineChartData.datasets[0].data = dataEntries.map(entry => entry.temperature);

     // Update the labels with formatted datetime values
     this.lineChartData.labels = dataEntries.map(entry => this.formatDateTime(entry.datetime));
   });
 }

 // Lifecycle hook that is called when the component is destroyed
 ngOnDestroy(): void {
   // Unsubscribe from the dataEntries$ observable to prevent memory leaks
   this.dataSubscription.unsubscribe();
 }

 // Method to format datetime strings into 'dd/MMM/yyyy, hh:mm a' format
 formatDateTime(datetime: string): string {
   const date = new Date(datetime); // Create a new Date object
   const formattedDate = this.datePipe.transform(date, 'dd/MMM/yyyy, hh:mm a'); // Format the date
   return formattedDate || datetime; // Return the formatted date or the original datetime string if formatting fails
 }
}
