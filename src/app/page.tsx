"use client";
import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import dataJson from '../../public/data/Pivot_Table.json';
import TotalRevenueBarChart from '../components/TotalRevenueBarChart';
import AverageTransactionLineChart from '../components/AverageTransactionLineChart';
import SalesPerformanceByCategory from '../components/SalesPerformanceByCategory';
import PaymentErrorFrequency from '../components/PaymentErrorFrequency';
import CashVsCreditTransactions from '../components/CashVsCreditTransactions';
import PeakSalesDates from '../components/PeakSalesDates';

interface DataType {
  Location: string;
  Month: string;
  TotalMachines: string;
  UniqueProductsSold: string;
  TotalSales: string;
  TotalQuantitySold: string;
  TotalTransactions: string;
  CashSales: string;
  CreditSales: string;
  TotalUniqueCoilsUsed: string;
}

export default function Home() {
  // Set default location to the first location in the dataset
  const defaultLocation = dataJson.data[0]?.Location || '';
  const [locationFilter, setLocationFilter] = useState<string>(defaultLocation);
  const [monthFilter, setMonthFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<DataType[]>([]);

  // Function to handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    if (key === 'Location') {
      setLocationFilter(value);
    } else if (key === 'Month') {
      setMonthFilter(value);
    }
  };

  // Update filtered data whenever filters change
  useEffect(() => {
    let newFilteredData = dataJson.data;

    // Apply Location filter
    if (locationFilter) {
      newFilteredData = newFilteredData.filter((d: DataType) => d.Location === locationFilter);
    }

    // Apply Month filter
    if (monthFilter) {
      newFilteredData = newFilteredData.filter((d: DataType) => d.Month === monthFilter);
    }

    setFilteredData(newFilteredData);
  }, [locationFilter, monthFilter]);

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center my-4">Data Visualization</h1>

        <Filter
          locations={[...new Set(dataJson.data.map((d: DataType) => d.Location))]}
          categories={[...new Set(dataJson.data.map((d: DataType) => d.Month))]}
          onFilterChange={handleFilterChange}
        />

        <hr />

        <h1 className='flex justify-center text-2xl font-bold my-5'>Total Revenue by Location</h1>
        <p>
          Berapa total pendapatan yang dihasilkan oleh setiap mesin penjual otomatis dari berbagai lokasi?
        </p>
        <TotalRevenueBarChart data={filteredData} />
        <hr className='m-6' />

        <h1 className='flex justify-center text-2xl font-bold my-5'>Average Transaction Value</h1>
        <p>
          Berapa nilai rata-rata transaksi di setiap mesin penjual otomatis?
        </p>
        <AverageTransactionLineChart data={filteredData} />
        <hr className='m-6' />

        <h1 className='flex justify-center text-2xl font-bold my-5'>Sales Performance by Category</h1>
        <p>
          Bagaimana kinerja penjualan bervariasi di antara berbagai kategori produk (minuman berkarbonasi, makanan, minuman non-karbonasi, dan air) di mesin penjual otomatis?
        </p>
        <SalesPerformanceByCategory data={filteredData} />
        <hr className='m-6' />

        <h1 className='flex justify-center text-2xl font-bold my-5'>Payment Error Frequency</h1>
        <p>
          Seberapa sering terjadi kesalahan pembayaran atau kegagalan transaksi yang dilacak dalam operasi mesin penjual otomatis?
        </p>
        <PaymentErrorFrequency data={filteredData} />
        <hr className='m-6' />

        <h1 className='flex justify-center text-2xl font-bold my-5'>Cash vs Credit Transactions</h1>
        <p>
          Bagaimana perbandingan proporsi transaksi tunai dengan transaksi kredit dalam operasi mesin penjual otomatis? (berdasarkan ID mesin)
        </p>
        <CashVsCreditTransactions data={filteredData} />
        <hr className='m-6' />

        <h1 className='flex justify-center text-2xl font-bold my-5'>Peak Sales Dates</h1>
        <p>
          Bagaimana cara menentukan tanggal puncak (tanggal) dengan transaksi tertinggi untuk mengoptimalkan persediaan, pemeliharaan, dan strategi promosi? (3 Teratas)	Untuk mengoptimalkan persediaan, pemeliharaan, dan strategi promosi.
        </p>
        <PeakSalesDates data={filteredData} />
        <div className='mb-7'></div>
      </div>
    </div>
  );
}
