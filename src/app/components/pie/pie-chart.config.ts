import { ChartEvent, ActiveElement } from 'chart.js';
import { IOlympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';
import { LabelButton } from 'src/app/utils/labelButton';
import { ChartColorService } from 'src/app/core/services/chart-color.service';

export type PieChartLabels = string[][];
export type MedalsCount = number[];

//Helper function
const getMousePositionRelativeToCanvas = (
  canvas: HTMLCanvasElement,
  event: ChartEvent
) => {
  let x = event.x ? event.x - (canvas.clientLeft + canvas.offsetLeft) : 0;
  let y = event.y ? event.y - (canvas.clientTop + canvas.offsetTop) : 0;

  return { x, y };
};

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
  routerRef: Router,
  labelButtons: LabelButton[],
  colorService: ChartColorService,
  pieSlicesBgColors: string[]
) => {

  {
    return {
      spacing: 0,
      interaction: {
        mode: 'nearest' as 'nearest',
      },
      responsive: true,
      aspectRatio: 2.5,
      layout: {
        padding: 1,
      },
      onClick: (event: ChartEvent, activeElement: ActiveElement[]) => {

        const canvas = document.getElementById(
          'pie-chart'
        ) as HTMLCanvasElement;

        if (canvas !== null) {
          const { x, y } = getMousePositionRelativeToCanvas(canvas, event);

          labelButtons.forEach((b) => {
            if (b.inBounds(x, y)) {
              const country = countriesRef.find(
                (country) => country.country === b.text
              );

              colorService.updateData(pieSlicesBgColors[country!.id - 1]);

              routerRef.navigate(['/details', country!.id]);
            }
          });
        }
      },
      onHover: (event: ChartEvent, chartElement: ActiveElement[]) => {
        if (event.native && event.native.target instanceof HTMLElement) {
          event.native.target.style.cursor =
            chartElement.length === 1 ? 'pointer' : 'default';
        }

        const canvas = document.getElementById(
          'pie-chart'
        ) as HTMLCanvasElement;

        if (canvas !== null) {
          const { x, y } = getMousePositionRelativeToCanvas(canvas, event);

          labelButtons.forEach((b) => {
            if (b.inBounds(x, y)) {
              if (event.native && event.native.target instanceof HTMLElement) {
                event.native.target.style.cursor = 'pointer';
              }
            }
          });
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
        },
      },
    };
  }
};
