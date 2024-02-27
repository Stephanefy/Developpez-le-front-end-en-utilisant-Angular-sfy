import { ChartEvent } from 'chart.js';
import { LabelPositions } from './pie.component';
import { IOlympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';
import { getRelativePosition } from 'chart.js/helpers';
import { Context } from 'chartjs-plugin-datalabels';

export type PieChartLabels = string[][];
export type MedalsCount = number[];

export const getDataConfig = (
  pieChartLabels: PieChartLabels,
  medalsCounts: MedalsCount
) => {
  return {
    // values on X-Axis
    labels: pieChartLabels,
    datasets: [
      {
        label: 'Medals',
        data: medalsCounts,
        backgroundColor: [
          '#945f65',
          '#b8cae6',
          '#89a1da',
          '#793d52',
          '#9680a1',
        ],
        borderWidth: 0,
      },
    ],
  };
};

export const getOptions = (
  labelsPositions: LabelPositions[],
  countriesRef: IOlympic[],
  routerRef: Router
) => {

    const image = new Image(15 ,15)
    image.src = 'https://www.svgrepo.com/show/522948/medal-ribbons-star.svg'
  {
    return {
      spacing: 0,
      interaction: {
        mode: 'nearest',
      },
      responsive: true,
      aspectRatio: 2,
      layout: {
        padding: 10,
      },
      onHover: (event: ChartEvent, chartElement: any, chart: any) => {
        //@ts-ignore
        event.native.target.style.cursor =
          chartElement.length === 1 ? 'pointer' : 'default';
      },
      onClick: (e: ChartEvent, element: any, chart: any) => {
        //@ts-ignore
        const canvasPosition = getRelativePosition(e, chart);

        const clickedDetails = chart.getElementsAtEventForMode(
          //@ts-ignore
          e,
          'nearest',
          { intersect: true },
          true
        );

        if (clickedDetails.length) {
          const pieSlice = clickedDetails[0];
          routerRef.navigate(['/details', countriesRef[pieSlice.index].id]);
        }

        labelsPositions.forEach((labelPosition, index) => {
          
          if (
            canvasPosition.x >= labelPosition.x &&
            canvasPosition.x <= labelPosition.x + labelPosition.textWidth &&
            canvasPosition.y >= labelPosition.y &&
            canvasPosition.y <= labelPosition.y + labelPosition.textHeight
          ) {
            
          }
        });
        
        

        // Substitute the appropriate scale IDs
        //@ts-ignore
        // const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
        // //@ts-ignore
        // const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
        // console.log(dataX, dataY)
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          padding: 10,
          yAlign: 'bottom',
          displayColors: false,
          backgroundColor: '#05828e',
          titleAlign: 'center',
          usePointStyle: true,
          callbacks: {
            labelPointStyle: function (context: Context) {
              return {
                pointStyle: image,
              };
            },
          },
        },
      },
    };
  }
};
