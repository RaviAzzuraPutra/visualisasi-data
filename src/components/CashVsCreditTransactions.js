import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CashVsCreditTransactions({ data }) {
    const chartData = {
        labels: data.map(d => d.Location),
        datasets: [
            {
                label: 'Cash Transactions',
                data: data.map(d => parseFloat(d.CashSales)),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Credit Transactions',
                data: data.map(d => parseFloat(d.CreditSales)),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} options={{ indexAxis: 'y' }} />;
}
