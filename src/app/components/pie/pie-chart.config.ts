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
      // onClick: (event: ChartEvent, element: any, chart: any) => {

      //   const clickedDetails = chart.getElementsAtEventForMode(
      //     event,
      //     'nearest',
      //     { intersect: true },
      //     true
      //   );

      //   if (clickedDetails.length) {
      //     const pieSlice = clickedDetails[0];
      //     routerRef.navigate(['/details', countriesRef[pieSlice.index].id]);
      //   }
      // },
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

function getCanvasCoords(mouseEvent: { clientX: number; clientY: number; }, canvasElem: { getBoundingClientRect: () => any; width: number; height: number; }) {
  const canvasBoundingRect = canvasElem.getBoundingClientRect();
  const scale = {
      x: canvasElem.width / canvasBoundingRect.width,
      y: canvasElem.height / canvasBoundingRect.height
  };
  return {
      x: (mouseEvent.clientX - canvasBoundingRect.left) * scale.x,
      y: (mouseEvent.clientY - canvasBoundingRect.top) * scale.y
  };
}
