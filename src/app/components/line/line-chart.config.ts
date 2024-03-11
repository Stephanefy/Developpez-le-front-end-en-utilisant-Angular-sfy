/**
 * Function to get the options for the pie chart
 *
 * @return {object} options object
 */
export const getOptions = () => {
  return {
    responsive: true,
    aspectRatio: 2,
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 50
        }

      },
    },
  };
};
/**
 * Retrieves the data configuration for the pie chart.
 *
 * @param {number[]} dataLabels - Array of data labels
 * @param {string[]} medalsCount - Array of medal counts
 * @param {string} currentBgColor - Current background color
 * @return {object} Data configuration for the chart
 */
export const getDataConfig = (
  dataLabels: number[],
  medalsCount: number[],
  currentBgColor: string
) => {
  return {
    labels: dataLabels,
    datasets: [
      {
        label: 'Medals',
        data: medalsCount,
        backgroundColor: currentBgColor,
        borderColor: currentBgColor,
        tension: 0,
      },
    ],
  };
};
