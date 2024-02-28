import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { IParticipation } from 'src/app/core/models/Participation';
import { IOlympic } from 'src/app/core/models/Olympic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private subscription = new Subscription();

  public olympic: IOlympic = {} as IOlympic;
  public totalNumberOfEntries: number = 0;
  public totalNumberOfAthletes: number = 0;
  public totalNumberOfMedals: number = 0;
  public errorMessage: string = '';
  public currentBgColor: string = '#';

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.currentBgColor =
      this.currentBgColor + this.route.snapshot.params['bgColor'];

    if (isNaN(id)) {
      this.errorMessage = 'Invalid id';
      return;
    }

    // TODO: find a more 'elegant' way to handle unknown id or badly formatted id
    this.olympicService.getOlympicById(id).subscribe(
      (value) => {
        if (value) {
          this.olympic = value;

          this.totalNumberOfMedals = value.participations.reduce(
            (acc: number, participation: IParticipation) =>
              acc + participation.medalsCount,
            0
          );
          this.totalNumberOfEntries = value.participations.length;
          this.totalNumberOfAthletes = value.participations.reduce(
            (acc: number, participation: IParticipation) =>
              acc + participation.athleteCount,
            0
          );
        }
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
