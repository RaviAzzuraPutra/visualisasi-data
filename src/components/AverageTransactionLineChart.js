import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AverageTransactionLineChart({ data }) {
    const chartData = {
        labels: data.map(d => d.Month),
        datasets: [
            {
                label: 'Average Value of Transaction',
                data: data.map(d => parseFloat(d.TotalSales) / parseFloat(d.TotalTransactions)),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return <Line data={chartData} />;
}
