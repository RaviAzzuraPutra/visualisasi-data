import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend);

export default function SalesCategoryBarChart({ data }) {
    const chartData = {
        labels: data.map(d => d.Location),
        datasets: [
            {
                label: 'Carbonated Sales',
                data: data.map(d => parseFloat(d.CarbonatedSales)),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Food Sales',
                data: data.map(d => parseFloat(d.FoodSales)),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
            {
                label: 'Non-Carbonated Sales',
                data: data.map(d => parseFloat(d.NonCarbonatedSales)),
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
            },
            {
                label: 'Water Sales',
                data: data.map(d => parseFloat(d.WaterSales)),
                backgroundColor: 'rgba(255, 205, 86, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} />;
}
