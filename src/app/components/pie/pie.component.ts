import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import Chart, { ChartEvent } from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

import { IOlympic } from 'src/app/core/models/Olympic';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import { getDataConfig, getOptions } from './pie-chart.config';

import { Context } from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';

// extend Chart.js context
interface HoveredContext extends Context {
  hovered?: boolean;
}

export type LabelPositions = {
  x: number;
  y: number;
  label: string,
  textWidth: number,
  textHeight: number
};


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
  olympics$: Observable<IOlympic[]> = this.olympicService.olympics;
  public chart: any;
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

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    // console.log(this.chart)
    // this.pieChartDatasets[0].data = this.medalsCounts
    // this.olympics$ = this.olympicService.getOlympics();

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

    const labelsPositions: LabelPositions[] = [];

    this.chart = new Chart('pie-chart', {
      type: 'pie', //this denotes tha type of chart
      data: getDataConfig(this.pieChartLabels, this.medalsCounts, this.pieSlicesBgColors),
      //@ts-ignore
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
                
                // ctx.fillStyle = 'black';
                // ctx.fill();
                // ctx.fillRect(x, y, 30, 30);
                // ctx.restore();

                //draw line
                const halfHeight = height / 2;
                const halfWidth = width / 2;

                

                const xLine = x >= halfWidth ? x + 90 : x - 90;
                // const yLine = y >= halfHeight ? y - 15 : y + 15;

                const isFI = [0, 4].includes(index) ? true : false;
                const isS = [1].includes(index) ? true : false;
                const fiMoveTo = y - 30;
                const sMoveTo = y - 10;

                

                //
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x, isFI ? fiMoveTo : isS ? sMoveTo : y);
                ctx.lineTo(xLine, isFI ? fiMoveTo : isS ? sMoveTo : y);
                //@ts-ignore
                ctx.strokeStyle = dataset.backgroundColor[index];
                ctx.stroke();

                // text
                //@ts-ignore
                const textLabel: string = chart.data.labels[index][0] ?? '';
                const textMetrics = ctx.measureText(
                  chart.data.labels![index] as string
                );
                

                // ctx.font = '14px Arial';

                // control text position
                // const textPosition = x >= halfWidth ? 'left' : 'right';
                // const textMargin = x >= halfWidth ? 5 : -5;

                // ctx.textAlign = textPosition;
                // ctx.textBaseline = 'middle';
                // ctx.fillStyle = 'black';
                // ctx.fillText(
                //   textLabel,
                //   xLine + textMargin,
                //   isFI ? fiMoveTo : isS ? sMoveTo : y
                // );

                // const labelPosition = {
                //   x: xLine + textMargin,
                //   y: isFI ? fiMoveTo : isS ? sMoveTo : y,
                //   label: textLabel,
                //   textWidth: textMetrics.width,
                //   textHeight:
                //     textMetrics.actualBoundingBoxAscent +
                //     textMetrics.actualBoundingBoxDescent,
                // };

                // if (labelsPositions.length < 5) {
                //   labelsPositions.push(labelPosition);
                // }
              });
            });
          },
        },
      ],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.chart.destroy();
  }

  onCountryClick(id: number, event: MouseEvent) {
    const bgColorToPassDown = this.pieSlicesBgColors[id - 1].split('#')[1];
      this.router.navigate(['/details', id, bgColorToPassDown]);
    
  }
}
