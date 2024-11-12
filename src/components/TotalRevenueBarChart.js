import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TotalRevenueBarChart({ data }) {
    const chartData = {
        labels: data.map(d => d.Location),
        datasets: [
            {
                label: 'Total Revenue',
                data: data.map(d => parseFloat(d.TotalSales)),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} />;
}
