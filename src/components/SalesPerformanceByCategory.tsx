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
    CarbonatedSales: string;
    FoodSales: string;
    NonCarbonatedSales: string;
    WaterSales: string;
    [key: string]: string;
}

interface Props {
    data: DataType[];
    selectedCategories: string[];
}

export default function SalesPerformanceByCategory({ data, selectedCategories }: Props) {
    const categories = selectedCategories;

    const totalSales = categories.map(category =>
        data.reduce((sum, d) => sum + parseFloat(d[`${category}Sales`] || '0'), 0)
    );

    const chartData = {
        labels: categories,
        datasets: [
            {
                label: 'Total Sales',
                data: totalSales,
                backgroundColor: 'rgba(0, 84, 180, 0.8)',
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
                    text: 'Total Sales',
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
                    text: 'Category',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Sales in each Category',
            },
        },
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-lg">
            <Bar data={chartData} options={options} />
        </div>
    );
}

