"use client";
import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import AverageTransactionLineChart from '../components/AverageTransactionLineChart';
import PaymentTypeBarChart from '../components/PaymentTypeBarChart';
import SalesCategoryBarChart from '../components/SalesCategoryBarChart';
import PeakSalesDateBarChart from '../components/PeakSalesDateBarChart';
import TopSellingCategoryBarChart from '../components/TopSellingCategoryBarChart';
import dataJson from '../../public/data/Pivot_Table.json';

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
  const [filteredData, setFilteredData] = useState<DataType[]>(dataJson.data);

  const handleFilterChange = (key: keyof DataType, value: string) => {
    const newFilteredData = dataJson.data.filter(d => d[key] === value || value === '');
    setFilteredData(newFilteredData);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">Data Visualization</h1>

      <Filter
        locations={[...new Set(dataJson.data.map(d => d.Location))]}
        months={[...new Set(dataJson.data.map(d => d.Month))]}
        onFilterChange={handleFilterChange}
      />

      <hr />

      <h1 className='flex justify-center text-2xl font-bold my-5'>AverageTransaction</h1>
      <AverageTransactionLineChart data={filteredData} />
      <hr className='m-6' />
      <h1 className='flex justify-center text-2xl font-bold my-5'>PaymentType</h1>
      <PaymentTypeBarChart data={filteredData} />
      <hr className='m-6' />
      <h1 className='flex justify-center text-2xl font-bold my-5'>SalesCategoryBar</h1>
      <SalesCategoryBarChart data={filteredData} />
      <hr className='m-6' />
      <h1 className='flex justify-center text-2xl font-bold my-5'>PeakSalesDate</h1>
      <PeakSalesDateBarChart data={filteredData} />
      <hr className='m-6' />
      <h1 className='flex justify-center text-2xl font-bold my-5'>TopSellingCategory</h1>
      <TopSellingCategoryBarChart data={filteredData} />
      <div className='mb-7'></div>
    </div>
  );
}
