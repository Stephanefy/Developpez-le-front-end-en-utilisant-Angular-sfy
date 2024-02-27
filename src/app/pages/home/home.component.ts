import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, timeout, delay, Subscription } from 'rxjs';
import { IOlympic } from 'src/app/core/models/Olympic';
import { IParticipation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<IOlympic[]> = this.olympicService.olympics;
  private subscription: Subscription = new Subscription()
  participations: IParticipation[][] = [];
  medalsCounts: number[] = []
  

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$.subscribe((value) => {
      if (value) {
        for (const country of value) {
          this.participations.push(country.participations);
          const medalCountArray = country.participations.map((p: IParticipation) => p.medalsCount);
          this.medalsCounts.push(medalCountArray.reduce((a:number, b:number) => a + b, 0))
        }
      }
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
