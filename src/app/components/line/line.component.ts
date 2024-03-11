import {
  Component,
  OnChanges,
  OnInit,
  AfterViewInit,
  Input,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { IOlympic } from 'src/app/core/models/Olympic';
import { getDataConfig, getOptions } from './line-chart.config';
import { Chart, ChartType, ChartConfiguration} from 'chart.js';
import { ChartColorService } from 'src/app/core/services/chart-color.service';
import { StorageService } from '../../../../.history/src/app/core/services/storage.service_20240305233251';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})

/**
 * LineComponent
 * Component for displaying a line chart that display individual medals count evolution per country
 * @class LineComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 * @implements {AfterViewInit}
 */
export class LineComponent implements OnInit, AfterViewInit {
  public chart!: Chart;
  public color!: string;

  constructor(
    private location: Location,
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private chartColorService: ChartColorService
  ) {}
  @Input() errorMessage!: string;

  public olympic!: IOlympic;

  ngOnInit(): void {

    this.chartColorService.color.subscribe((value) => { 
      this.color = value;
    })

    const id = +this.route.snapshot.params['id'];
    this.olympicService.getOlympicById(id).subscribe((value) => {
      if (value) {
        this.olympic = value;

        if (this.chart) {
          this.chart.destroy();
        }
        this.generateLineChart(this.olympic);
      }
    });
  }


  ngAfterViewInit(): void {}

  generateLineChart(olympic: IOlympic) {
    const dataLabels = olympic.participations.map(
      (participation) => participation.year
    );
    const medalsCount = olympic.participations.map((participation) =>
      participation.medalsCount
    );


    const chartConfig: ChartConfiguration = {
      type: 'line' as ChartType,
      data: getDataConfig(dataLabels, medalsCount, this.color),
      options: getOptions(),
    }

    this.chart = new Chart('line-chart', chartConfig);
  }

  onGoBack() {
    this.chart.destroy();
    this.location.back();
  }
}
