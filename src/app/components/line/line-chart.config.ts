export const getOptions = () => {
  return {
    responsive: true,
    aspectRatio: 2,
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };
};

export const getDataConfig = (
  dataLabels: number[],
  medalsCount: string[],
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
