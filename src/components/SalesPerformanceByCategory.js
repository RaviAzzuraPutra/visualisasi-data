import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SalesPerformanceByCategory({ data }) {
    const chartData = {
        labels: data.map(d => d.Location),
        datasets: [
            {
                label: 'Carbonated Sales',
                data: data.map(d => parseFloat(d.CarbonatedSales)),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Food Sales',
                data: data.map(d => parseFloat(d.FoodSales)),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
            {
                label: 'Non-Carbonated Sales',
                data: data.map(d => parseFloat(d.NonCarbonatedSales)),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Water Sales',
                data: data.map(d => parseFloat(d.WaterSales)),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />;
}
