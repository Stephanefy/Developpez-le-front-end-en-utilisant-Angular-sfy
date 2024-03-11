import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../../../../.history/src/app/core/services/storage.service_20240305233251';

// this service is used to update the color of the chart when navigating to the detail page
@Injectable({ providedIn: 'root' })
export class ChartColorService {

  constructor(private storageService : StorageService) {
    this.initializeData();
  }
  private dataSource$ = new BehaviorSubject<string>("");
  color = this.dataSource$.asObservable();


  initializeData() {
    const color = this.storageService.getItem<string>('color');
    if (color) {
      this.dataSource$.next(color);
    }
  }

  updateData(data: string) {
    this.storageService.setItem('color', data);
    this.dataSource$.next(data);
  }
}
