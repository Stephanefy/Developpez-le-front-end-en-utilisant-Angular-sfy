import { ChartEvent, ActiveElement } from 'chart.js';
import { IOlympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

export type PieChartLabels = string[][];
export type MedalsCount = number[];

export const getDataConfig = (
  pieChartLabels: PieChartLabels,
  medalsCounts: MedalsCount,
  pieSlicesBgColors: string[]
) => {
  return {
    // values on X-Axis
    labels: pieChartLabels,
    datasets: [
      {
        label: 'Medals',
        data: medalsCounts,
        backgroundColor: pieSlicesBgColors,
        borderWidth: 0,
      },
    ],
  };
};

export const getOptions = (
  countriesRef: IOlympic[],
  routerRef: Router
) => {

    const image = new Image(15 ,15)
    image.src = 'https://www.svgrepo.com/show/522948/medal-ribbons-star.svg'
  {
    return {
      spacing: 0,
      interaction: {
        mode: 'nearest' as 'nearest',
      },
      responsive: true,
      aspectRatio: 2,
      layout: {
        padding: 10,
      },
      onHover: (event: ChartEvent, chartElement: ActiveElement[]) => {

        if (event.native && event.native.target instanceof HTMLElement) {
          event.native.target.style.cursor =
            chartElement.length === 1 ? 'pointer' : 'default';
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          padding: 10,
          yAlign: 'bottom' as const,
          displayColors: false,
          backgroundColor: '#05828e',
          titleAlign: 'center' as const,
          usePointStyle: true,
          // callbacks: {
          //   labelPointStyle: function (context: Context) {
          //     return {
          //       pointStyle: image,
          //     };
          //   },
          // },
        },
      },
    };
  }
};

