import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddDataComponent } from './add-data/add-data.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatTabsModule,AddDataComponent,ViewDataComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title:any=''
  activeTabIndex = 0;
  selectedIndex: number = 0;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/add-data') {
          this.activeTabIndex = 0;
        } else if (event.url === '/view-data') {
          this.activeTabIndex = 1;
        }
      }
    });
  }


  onTabChange(event: any) {
    this.selectedIndex = event.index;
    console.log("this is event",this.selectedIndex);
    if(this.selectedIndex==0){
      this.router.navigate(['/add-data']);
    }
   else if(this.selectedIndex==1){
      this.router.navigate(['/view-data']);
    }
  }
}
