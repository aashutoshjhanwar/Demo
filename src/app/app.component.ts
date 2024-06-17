import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddDataComponent } from './add-data/add-data.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatTabsModule,AddDataComponent,ViewDataComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BaseChartDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title: any = ''; // Placeholder for the title
  activeTabIndex = 0; // Index to keep track of the currently active tab
  selectedIndex: number = 0; // Index to keep track of the selected tab

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    // Subscribe to router events to detect navigation changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the URL to set the active tab index based on the current route
        if (event.url === '/add-data') {
          this.activeTabIndex = 0; // Set active tab index to 0 if URL is '/add-data'
        } else if (event.url === '/view-data') {
          this.activeTabIndex = 1; // Set active tab index to 1 if URL is '/view-data'
        }
      }
    });
  }

  // Method to handle tab changes
  onTabChange(event: any) {
    this.selectedIndex = event.index; // Update selectedIndex based on the event's index
    if (this.selectedIndex == 0) {
      this.router.navigate(['/add-data']); // Navigate to '/add-data' if the first tab is selected
    } else if (this.selectedIndex == 1) {
      this.router.navigate(['/view-data']); // Navigate to '/view-data' if the second tab is selected
    }
  }
}
