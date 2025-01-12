import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface DataType {
    Location: string;
    CashSales: string;
    CreditSales: string;
    [key: string]: string;
}

export default function CashVsCreditTransactions({ data }: { data: DataType[] }) {
    const locations = [...new Set(data.map(d => d.Location))];

    const chartData = {
        labels: locations,
        datasets: [
            {
                label: 'Cash',
                data: locations.map(location =>
                    data.filter(d => d.Location === location)
                        .reduce((sum, d) => sum + parseFloat(d.CashSales || '0'), 0)
                ),
                backgroundColor: 'rgba(59, 130, 246, 0.7)', // Light blue
            },
            {
                label: 'Credit',
                data: locations.map(location =>
                    data.filter(d => d.Location === location)
                        .reduce((sum, d) => sum + parseFloat(d.CreditSales || '0'), 0)
                ),
                backgroundColor: 'rgba(255, 182, 193, 0.7)', // Light pink
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                title: {
                    display: true,
                    text: 'Total Transaction',
                },
                ticks: {
                    callback: (value: number) => value.toLocaleString(),
                },
            },
            x: {
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Location',
                },
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Payment Type in each Machine',
            },
        },
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-lg">
            <Bar data={chartData} options={options} />
        </div>
    );
}

