import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import Chart from 'chart.js/auto';
import {Chart as ChartInstanceType, ChartType, ChartConfiguration} from 'chart.js'

import { IOlympic } from 'src/app/core/models/Olympic';
import { getDataConfig, getOptions } from './pie-chart.config';

import { Router } from '@angular/router';
import { ChartColorService } from 'src/app/core/services/chart-color.service';


@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})


/**
 * PieComponent
 * Component for displaying a pie chart that display total medals per country in dataset over 3 participations
 * @class PieComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */

export class PieComponent implements OnInit, OnDestroy {

  title = 'Olympic games countries medals';
  private olympics$: Observable<IOlympic[]> = this.olympicService.olympics;

  // reference of the pie chart
  public chart!: ChartInstanceType;

  public screenWidth!: number;
  public screenHeight!: number;

  public countries: IOlympic[] = [];
  public medalsCounts: number[] = [];
  public selectedId: number = 0;


  private pieSlicesBgColors: string[] =  [
    '#945f65',
    '#b8cae6',
    '#89a1da',
    '#793d52',
    '#9680a1',
  ]
  private subscription: Subscription = new Subscription();

  public pieChartLabels: string[][] = [];

  public pieChartLegend = false;
  public pieChartPlugins = [];

  constructor(
    private olympicService: OlympicService, 
    private router: Router,
    private colorService: ChartColorService
    ) {}

  ngOnInit(): void {
    // console.log(this.chart)
    // this.pieChartDatasets[0].data = this.medalsCounts
    // this.olympics$ = this.olympicService.getOlympics();


    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    this.subscription = this.olympics$.subscribe((countries) => {
      if (countries) {
        this.countries = countries.slice();
        const totalMedalsPerCountry = countries.map((country: IOlympic) => {
          const totalMedals = country.participations.reduce(
            (acc, participation) => acc + participation.medalsCount,
            0
          );
          return totalMedals;
        });

        for (const medalCount of totalMedalsPerCountry) {
          this.medalsCounts.push(medalCount);
        }

        for (const country of countries) {
          this.pieChartLabels.push([country.country]);
        }

        if (this.chart) {
          this.chart.destroy();
        }

        this.generatePieChart();
      }
    });
  }

  generatePieChart() {

    // references router service and countries data member of the Pie component
    // so that it can be used inside the pie chart events for redirecting to country details
    const countriesRef = this.countries;
    const routerRef = this.router;
    const screenWidthRef = this.screenWidth;

    const chartConfig: ChartConfiguration = {
      type: 'pie' as ChartType, //this denotes tha type of chart
      data: getDataConfig(this.pieChartLabels, this.medalsCounts, this.pieSlicesBgColors),
      options: getOptions(countriesRef, routerRef),
      plugins: [
        {
          id: 'pie-chart-lines',
          beforeDatasetDraw: (chart, args, options) => {
            const {
              ctx,
              chartArea: { width, height },
            } = chart;

            chart.data.datasets.forEach((dataset, i) => {
              chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
                const { x, y } = datapoint.tooltipPosition(true);
          
                //draw lines to the buttons (country name)
                const halfHeight = height / 2;
                const halfWidth = width / 2;

                const linePadding = screenWidthRef >= 360 ? 90 : 50;

                const xLine = x >= halfWidth ? x + linePadding : x - linePadding;

                const isFI = [0, 4].includes(index) ? true : false;
                const isS = [1].includes(index) ? true : false;
                const fiMoveTo = y - 30;
                const sMoveTo = y - 10;
            
                
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x, isFI ? fiMoveTo : isS ? sMoveTo : y);
                ctx.lineTo(xLine, isFI ? fiMoveTo : isS ? sMoveTo : y);
                ctx.strokeStyle = (dataset.backgroundColor as string[])[index]
                ctx.stroke();

                // text
                const labels = chart.data.labels as string[][];
                const textLabel = labels[index][0];
                const textMetrics = ctx.measureText(
                  chart.data.labels![index] as string
                );
              });
            });
          },
        },
      ],
    }
    
    this.chart = new Chart('pie-chart', chartConfig );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.chart.destroy();
  }

  onCountryClick(id: number, event: MouseEvent) {
    const bgColorToPassDown = this.pieSlicesBgColors[id - 1];
    this.colorService.updateData(bgColorToPassDown);
    this.router.navigate(['/details', id]);
    
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
}
