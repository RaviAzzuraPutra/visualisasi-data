import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CashVsCreditTransactions({ data }) {
    const locations = [...new Set(data.map(d => d.Location))];

    return (
        <div>
            {locations.map(location => {
                const locationData = data.filter(d => d.Location === location);
                const cashSales = locationData.reduce((sum, d) => sum + parseFloat(d.CashSales), 0);
                const creditSales = locationData.reduce((sum, d) => sum + parseFloat(d.CreditSales), 0);

                const chartData = {
                    labels: ['Cash Transactions', 'Credit Transactions'],
                    datasets: [
                        {
                            label: `${location} - Cash vs Credit`,
                            data: [cashSales, creditSales],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)'
                            ],
                        }
                    ],
                };

                return (
                    <div key={location}>
                        <hr className='m-5' />
                        <h3 className='mb-7'>{location}</h3>
                        <Bar data={chartData} options={{ indexAxis: 'y' }} />
                    </div>
                );
            })}
        </div>
    );
}
