import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, map, delay, timeout, filter, retry } from 'rxjs/operators';
import { IOlympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<IOlympic[]>([]);  
  private isLoading$ = new BehaviorSubject<boolean>(false);

  public olympics = this.olympics$.asObservable();
  public isLoading = this.isLoading$.asObservable();


  constructor(private http: HttpClient) {}

  loadInitialData() {
    this.isLoading$.next(true)
    return this.http.get<IOlympic[]>(this.olympicUrl).pipe(
      tap((value) => { 
        this.olympics$.next(value)
      }),
      delay(1500),
      map((olympics: IOlympic[]) => {
        this.isLoading$.next(false)
        return olympics
      }),
      catchError((error) => {
        // TODO: improve error handling
        this.catchGetOlympicsErrors(error);
        // can be useful to end loading state and let the user know something went wrong
        this.isLoading$.next(false)
        this.olympics$.next([]);
        this.olympics$.error({error: "Something bad happened; please try again later."});
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );
  }

  getOlympics() {
    return this.olympics;
  }

  getOlympicById(id: number) {
     return this.http.get<IOlympic[]>(this.olympicUrl).pipe(
      map((olympics: IOlympic[]) => {
       const olympic = olympics?.find((o) => o.id === id)
        
       if (!olympic) {
         throw new Error("Olympic not found");
       }
       
       return olympic
      })
      
      )
  }

  catchGetOlympicsErrors(error: any): Observable<Response> {
    if (error.error && error.error.message) {
      console.log("reached")
      alert(error.error.message);
    }

    return throwError(error);
  }
}
