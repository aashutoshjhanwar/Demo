import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject([]);
  data$ = this.dataSubject.asObservable();

  addData(data:any) {
    const currentData:any = this.dataSubject.value;
    currentData.push(data);
    this.dataSubject.next(currentData);
  }
}
