import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TotalRevenueBarChart({ data }) {
    // Define the specific sales categories and sum up total sales for each from the data
    const categories = ['CarbonatedSales', 'FoodSales', 'NonCarbonatedSales', 'WaterSales'];

    // Sum up total sales per category based on property names in data
    const totalSales = categories.map(category => {
        return data.reduce((sum, item) => sum + parseFloat(item[category] || 0), 0);
    });

    // Prepare data for the chart
    const chartData = {
        labels: ['Carbonated', 'Food', 'Non-Carbonated', 'Water'],
        datasets: [
            {
                label: 'Total Sales',
                data: totalSales,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    // Return the bar chart with appropriate options
    return (
        <Bar
            data={chartData}
            options={{
                plugins: {
                    legend: { display: true },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Sales',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Category',
                        },
                    },
                },
            }}
        />
    );
}
