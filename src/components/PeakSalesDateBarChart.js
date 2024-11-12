import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function PeakSalesDateBarChart({ data }) {
    const peakData = data.filter(d => parseFloat(d.TotalTransactions) === Math.max(...data.map(d => parseFloat(d.TotalTransactions))));

    const chartData = {
        labels: peakData.map(d => d.Month),
        datasets: [
            {
                label: 'Peak Sales',
                data: peakData.map(d => parseFloat(d.TotalTransactions)),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} />;
}
