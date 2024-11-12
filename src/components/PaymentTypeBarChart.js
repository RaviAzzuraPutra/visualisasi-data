import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function PaymentTypeBarChart({ data }) {
    const chartData = {
        labels: data.map(d => d.Location),
        datasets: [
            {
                label: 'Cash Sales',
                data: data.map(d => parseFloat(d.CashSales)),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Credit Sales',
                data: data.map(d => parseFloat(d.CreditSales)),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} />;
}
