import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// this service is used to update the color of the chart when navigating to the detail page
@Injectable({ providedIn: 'root' })
export class ChartColorService {
  private dataSource$ = new BehaviorSubject<string>("");
  color = this.dataSource$.asObservable();

  updateData(data: string) {
    this.dataSource$.next(data);
  }
}
