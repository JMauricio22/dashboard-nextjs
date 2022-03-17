import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Chart as ReactChartJS } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

type ChartType = 'bar' | 'pie' | 'line' | 'doughnut';

type CharProps = {
  type: ChartType;
  title: string;
  data: number[];
  labels: string[];
  dataOptions?: object;
};

export default function Char({
  type,
  title,
  data,
  labels,
  dataOptions,
}: CharProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
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
