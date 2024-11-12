import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PeakSalesDates({ data }) {
    // Urutkan dan ambil 3 transaksi tertinggi
    const sortedData = [...data].sort((a, b) => parseFloat(b.TotalTransactions) - parseFloat(a.TotalTransactions));
    const top3Data = sortedData.slice(0, 3);

    const chartData = {
        labels: top3Data.map(d => d.Month),
        datasets: [
            {
                label: 'Top Sales Dates',
                data: top3Data.map(d => parseFloat(d.TotalTransactions)),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} />;
}
