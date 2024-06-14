import { Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { ViewDataComponent } from './view-data/view-data.component';

export const routes: Routes = [
    { path: '', redirectTo: '/add-data', pathMatch: 'full' },
    { path: 'add-data', component: AddDataComponent },
    { path: 'view-data', component: ViewDataComponent }
];
