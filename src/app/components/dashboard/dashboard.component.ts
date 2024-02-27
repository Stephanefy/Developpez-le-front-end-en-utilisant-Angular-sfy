import { Component, OnDestroy, OnInit, OnChanges, ViewChild, DoCheck } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Input } from '@angular/core';
import { IOlympic } from 'src/app/core/models/Olympic';
import { Observable, Subscription, of } from 'rxjs';
import { IParticipation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})


/**
 * DashboardComponent
 * Component for displaying Olympic data and statistics
 * @export
 * @class DashboardComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {OnChanges}
 * 
 */
export class DashboardComponent implements OnInit, OnDestroy, OnChanges {

  olympics$: Observable<IOlympic[]> = this.olympicService.olympics;


  public countries: number = 0;
  public numberOfJos: number = 0;
  public isLoading: boolean = false;
  public errorMessage: string = "";

  private subscription: Subscription = new Subscription();
  private loadingSubscription: Subscription = new Subscription();


  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.loadingSubscription = this.olympicService.isLoading.subscribe(
      (value) => (this.isLoading = value)
    );
    this.subscription = this.olympics$.subscribe((countries) => {
      if (countries) {
        this.countries = countries.length;
        for (const country of countries) {
          this.numberOfJos = country.participations.length;
        }
      }
    },
    (error) => {
      this.errorMessage = error.error
    }
    );
    
  }
  
  ngOnChanges(changes: any) {
    console.log("changes",changes)
  }
 

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

}
