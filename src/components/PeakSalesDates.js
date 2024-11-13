import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PeakSalesDates({ data, locationFilter }) {
    // Sort the data by total transactions
    const sortedData = [...data].sort((a, b) => parseFloat(b.TotalTransactions) - parseFloat(a.TotalTransactions));

    // Filter the data based on locationFilter, if it exists
    const filteredData = locationFilter
        ? sortedData.filter(d => d.Location === locationFilter)
        : sortedData;

    // Prepare the datasets for the chart
    const locations = [...new Set(sortedData.map(d => d.Location))]; // Get unique locations
    const datasets = locations.map(location => {
        const locationData = filteredData.filter(d => d.Location === location);
        return {
            label: location,
            data: locationData.map(d => parseFloat(d.TotalTransactions)),
            backgroundColor: location === 'Brunswick Sq Mall' ? 'rgba(54, 162, 235, 0.6)' :
                location === 'EB Public Library' ? 'rgba(255, 99, 132, 0.6)' :
                    location === 'Earle Asphalt' ? 'rgba(75, 192, 192, 0.6)' :
                        'rgba(153, 102, 255, 0.6)',
        };
    });

    const chartData = {
        labels: filteredData.map(d => d.Month),
        datasets,
    };

    return <Bar data={chartData} options={{ indexAxis: 'x' }} />;
}
