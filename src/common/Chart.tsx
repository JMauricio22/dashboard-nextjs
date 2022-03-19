import { Chart as ReactChartJS } from 'react-chartjs-2';
import { useTheme } from 'next-themes';

import { Chart, ChartComponentLike } from 'chart.js';
import * as Chartjs from 'chart.js';

const controllers = Object.values(Chartjs).filter((chart: any) => chart.id !== undefined);

Chart.register(controllers as ChartComponentLike);

type ChartType = 'bar' | 'pie' | 'line' | 'doughnut';

type CharProps = {
  type: ChartType;
  title: string;
  data: number[];
  labels: string[];
  dataOptions?: object;
};

export default function Char({ type, title, data, labels, dataOptions }: CharProps) {
  const { theme } = useTheme();

  const fontColor = theme === 'dark' ? 'white' : '#212121';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: fontColor,
        },
      },
      title: {
        display: true,
        text: title,
        color: fontColor,
      },
    },
    scales: {
      x: {
        ticks: {
          color: fontColor,
        },
      },
      y: {
        ticks: {
          color: fontColor,
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        data,
        ...dataOptions,
      },
    ],
  };

  return <ReactChartJS type={type} data={chartData} options={options} />;
}
