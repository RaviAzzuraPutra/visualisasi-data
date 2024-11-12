import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TopSellingCategoryBarChart({ data }) {
    const categories = ['Carbonated Sales', 'Food Sales', 'NonCarbonated Sales', 'Water Sales'];
    const totals = categories.map(category =>
        data.reduce((sum, item) => sum + parseFloat(item[category.replace(' ', '')]), 0)
    );

    const chartData = {
        labels: categories,
        datasets: [
            {
                label: 'Total Sales',
                data: totals,
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 205, 86, 0.6)'],
            },
        ],
    };

    return <Bar data={chartData} />;
}
