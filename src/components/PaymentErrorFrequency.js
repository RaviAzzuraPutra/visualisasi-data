import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PaymentErrorFrequency({ data }) {
    const locations = [...new Set(data.map(d => d.Location))];

    return (
        <div>
            {locations.map(location => {
                const locationData = data.filter(d => d.Location === location);
                const errors = locationData.reduce((sum, d) => sum + (d.Errors || 0), 0);
                const totalTransactions = locationData.reduce((sum, d) => sum + parseFloat(d.TotalTransactions), 0);

                const chartData = {
                    labels: ['Successful Transactions', 'Errors'],
                    datasets: [
                        {
                            label: `${location} - Transaction Errors`,
                            data: [totalTransactions - errors, errors],
                            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                            borderWidth: 1,
                        },
                    ],
                };

                const options = {
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                    const percentage = ((value / total) * 100).toFixed(2);
                                    return `${label}: ${value} (${percentage}%)`;
                                },
                            },
                        },
                    },
                    indexAxis: 'y',
                };

                return (

                    <div key={location}>
                        <hr className='m-5' />
                        <h3 className='mb-7'>{location}</h3>
                        <Bar data={chartData} options={options} />
                    </div>
                );
            })}
        </div>
    );
}
