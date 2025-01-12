import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface DataType {
    Location: string;
    TotalTransactions: string;
    Month: string; // Format: "2022-01", "2022-02", etc.
}

interface Props {
    data: DataType[];
    locationFilter?: string[];
}

export default function PeakSalesDates({ data, locationFilter }: Props) {
    // Nama bulan dalam urutan
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    // Filter data berdasarkan lokasi
    const filteredData = locationFilter?.length
        ? data.filter(d => locationFilter.includes(d.Location))
        : data;

    // Ambil daftar unik lokasi
    const locations = [...new Set(data.map(d => d.Location))];

    // Persiapkan dataset untuk setiap lokasi
    const datasets = locations.map(location => {
        const locationData = months.map((month, index) => {
            const monthData = filteredData.find(
                d => d.Location === location && parseInt(d.Month.split('-')[1]) === index + 1
            );
            return monthData ? parseFloat(monthData.TotalTransactions) : 0;
        });
        return {
            label: location,
            data: locationData,
            backgroundColor: {
                'GuttenPlans': 'rgba(255, 205, 86, 0.6)',
                'EB Public Library': 'rgba(255, 99, 132, 0.6)',
                'Brunswick Sq Mall': 'rgba(54, 162, 235, 0.6)',
                'Earle Asphalt': 'rgba(75, 192, 192, 0.6)',
            }[location] || 'rgba(153, 102, 255, 0.6)',
        };
    });

    // Data untuk ChartJS
    const chartData = {
        labels: months,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            tooltip: { enabled: true },
        },
        scales: {
            x: { title: { display: true, text: 'Transaction Date' } },
            y: { title: { display: true, text: 'Transaction Count' } },
        },
    };

    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            <h2 className="text-center font-bold text-xl mb-4">Peak Sales Date</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
}
