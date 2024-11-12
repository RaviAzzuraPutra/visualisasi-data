import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);


export default function AverageTransactionLineChart({ data }) {
    const chartData = {
        labels: data.map(d => d.Location),
        datasets: [
            {
                label: 'Average Transaction Value',
                data: data.map(d => parseFloat(d.TotalSales) / parseFloat(d.TotalTransactions)),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
        ],
    };

    return <Line data={chartData} />;
}
