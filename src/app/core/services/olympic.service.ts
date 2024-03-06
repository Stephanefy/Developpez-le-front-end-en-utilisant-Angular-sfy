import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  catchError,
  tap,
  map,
  delay,
} from 'rxjs/operators';
import { IOlympic } from '../models/Olympic';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<IOlympic[]>([]);
  private isLoading$ = new BehaviorSubject<boolean>(false);

  public olympics = this.olympics$.asObservable();
  public isLoading = this.isLoading$.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  loadInitialData() {
    this.isLoading$.next(true);
    return this.http.get<IOlympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.storageService.setItem('olympics', value);
        this.olympics$.next(value);
      }),
      delay(1500),
      map((olympics: IOlympic[]) => {
        this.isLoading$.next(false);
        return olympics;
      }),
      catchError((error) => {
        this.isLoading$.next(false);
        this.olympics$.next([]);
        this.olympics$.error({
          error: 'Something bad happened; please try again later.',
        });
        return throwError(
          () => new Error('Something bad happened; please try again later.')
        );
      })
    );
  }

  getOlympics() {
    return this.olympics;
  }

  getOlympicById(id: number) {
    // to avoid another http request when reloading the detail page
    const storedOlympics = this.storageService.getItem<IOlympic[]>('olympics');
    if (storedOlympics !== null) {
      this.olympics = new BehaviorSubject<IOlympic[]>(storedOlympics);
    }

    return this.olympics.pipe(
      map((olympics: IOlympic[]) => {
        const olympic = olympics?.find((o) => o.id === id);

        if (!olympic) {
          throw new Error('no data on this country');
        }

        return olympic;
      })
    );
  }
}
