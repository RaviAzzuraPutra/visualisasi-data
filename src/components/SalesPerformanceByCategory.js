import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SalesPerformanceByCategory({ data }) {
    const locations = [...new Set(data.map(d => d.Location))];
    const chartData = {
        labels: locations,
        datasets: [
            {
                label: 'Carbonated',
                data: locations.map(location => {
                    const locationData = data.filter(d => d.Location === location);
                    return locationData.reduce((sum, d) => sum + parseFloat(d.CarbonatedSales), 0);
                }),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Non Carbonated',
                data: locations.map(location => {
                    const locationData = data.filter(d => d.Location === location);
                    return locationData.reduce((sum, d) => sum + parseFloat(d.NonCarbonatedSales), 0);
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Food',
                data: locations.map(location => {
                    const locationData = data.filter(d => d.Location === location);
                    return locationData.reduce((sum, d) => sum + parseFloat(d.FoodSales), 0);
                }),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
            {
                label: 'Water',
                data: locations.map(location => {
                    const locationData = data.filter(d => d.Location === location);
                    return locationData.reduce((sum, d) => sum + parseFloat(d.WaterSales), 0);
                }),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h2>Sales Performance by Category</h2>
            <Bar
                data={chartData}
                options={{
                    indexAxis: 'y', // Mengubah orientasi menjadi horizontal
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true }
                    },
                    plugins: {
                        legend: { position: 'top' },
                        title: {
                            display: true,
                            text: 'Top Selling Category by Location'
                        }
                    }
                }}
            />
        </div>
    );
}
