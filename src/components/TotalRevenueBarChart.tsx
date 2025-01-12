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

export default function TotalRevenueBarChart({ data, selectedCategories }: Props) {
    const locations = [...new Set(data.map(d => d.Location))];

    const colors = {
        'Carbonated': 'rgba(135, 206, 235, 0.7)',    // Light blue
        'NonCarbonated': 'rgba(255, 182, 193, 0.7)', // Light pink
        'Food': 'rgba(255, 218, 185, 0.7)',          // Peach
        'Water': 'rgba(255, 235, 156, 0.7)',         // Light yellow
    };

    const datasets = selectedCategories.map(category => ({
        label: category,
        data: locations.map(location => {
            const locationData = data.filter(d => d.Location === location);
            return locationData.reduce((sum, d) => sum + parseFloat(d[`${category}Sales`] || '0'), 0);
        }),
        backgroundColor: colors[category as keyof typeof colors],
    }));

    const chartData = {
        labels: locations,
        datasets: datasets,
    };

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                title: {
                    display: true,
                    text: 'Category',
                },
            },
            y: {
                stacked: true,
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
                text: 'Top Selling Category Across Machine',
            },
        },
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-lg">
            <Bar data={chartData} options={options} />
        </div>
    );
}

