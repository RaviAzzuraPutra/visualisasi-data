import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface DataType {
    Location: string;
    TotalSales: string;
    TotalTransactions: string;
    [key: string]: string;
}

export default function AverageTransactionLineChart({ data }: { data: DataType[] }) {
    const locations = [...new Set(data.map(d => d.Location))];

    const averageTransactions = locations.map(location => {
        const locationData = data.filter(d => d.Location === location);
        const totalSales = locationData.reduce((sum, d) => sum + parseFloat(d.TotalSales), 0);
        const totalTransactions = locationData.reduce((sum, d) => sum + parseFloat(d.TotalTransactions), 0);
        return totalTransactions > 0 ? totalSales / totalTransactions : 0;
    });

    const chartData = {
        labels: locations,
        datasets: [
            {
                label: 'Average Transaction',
                data: averageTransactions,
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                min: 1.8,
                max: 2.2,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                title: {
                    display: true,
                    text: 'Avg Transaction',
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
                text: 'Average Value of Transaction',
            },
        },
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-lg">
            <Line data={chartData} options={options} />
        </div>
    );
}

