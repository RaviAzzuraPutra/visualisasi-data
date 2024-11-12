import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ArcElement for Pie and Doughnut charts
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PaymentErrorFrequency({ data }) {
    const errors = data.reduce((sum, d) => sum + (d.Errors || 0), 0);
    const totalTransactions = data.reduce((sum, d) => sum + parseFloat(d.TotalTransactions), 0);

    const chartData = {
        labels: ['Successful Transactions', 'Errors'],
        datasets: [
            {
                data: [totalTransactions - errors, errors],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return <Doughnut data={chartData} options={options} />;
}
