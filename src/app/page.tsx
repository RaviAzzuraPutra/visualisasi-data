"use client";
import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import dataJson from '../../public/data/Pivot_Table.json';
import TotalRevenueBarChart from '../components/TotalRevenueBarChart';
import AverageTransactionLineChart from '../components/AverageTransactionLineChart';
import SalesPerformanceByCategory from '../components/SalesPerformanceByCategory';
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
  CarbonatedSales: string;
  FoodSales: string;
  NonCarbonatedSales: string;
  WaterSales: string;
  [key: string]: string;
}

export default function Home() {
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Carbonated', 'Food', 'NonCarbonated', 'Water']);
  const [locationFilteredData, setLocationFilteredData] = useState<DataType[]>(dataJson.data);

  const handleFilterChange = (key: string, value: string[], allSelected: boolean) => {
    if (key === 'Location') {
      setLocationFilter(allSelected ? [] : value);
    } else if (key === 'Category') {
      setSelectedCategories(allSelected ? ['Carbonated', 'Food', 'NonCarbonated', 'Water'] : value);
    }
  };

  useEffect(() => {
    // Location-filtered data (for location-based charts only)
    let newLocationFilteredData = dataJson.data;
    if (locationFilter.length > 0) {
      newLocationFilteredData = newLocationFilteredData.filter((d: DataType) =>
        locationFilter.includes(d.Location)
      );
    }
    setLocationFilteredData(newLocationFilteredData);
  }, [locationFilter]);

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center my-4">Data Visualization</h1>

        <Filter
          locations={[...new Set(dataJson.data.map((d: DataType) => d.Location))]}
          categories={['Carbonated', 'Food', 'NonCarbonated', 'Water']}
          onFilterChange={handleFilterChange}
        />

        <hr />

        <h1 className='flex justify-center text-2xl font-bold my-5'>Top Selling Category Across Machine</h1>
        <TotalRevenueBarChart data={dataJson.data} selectedCategories={selectedCategories} />
        <hr className='m-6' />

        <h1 className='flex justify-center text-2xl font-bold my-5'>Average Value of Transaction</h1>
        <AverageTransactionLineChart data={locationFilteredData} />
        <hr className='m-6' />

        <h1 className='flex justify-center text-2xl font-bold my-5'>Sales in each Category</h1>
        <SalesPerformanceByCategory data={dataJson.data} selectedCategories={selectedCategories} />
        <hr className='m-6' />

        <h1 className='flex justify-center text-2xl font-bold my-5'>Payment Type in each Machine</h1>
        <CashVsCreditTransactions data={locationFilteredData} />
        <hr className='m-6' />

        <h1 className='flex justify-center text-2xl font-bold my-5'>Peak Sales Date</h1>
        <PeakSalesDates data={locationFilteredData} locationFilter={locationFilter} />
        <div className='mb-7'></div>
      </div>
    </div>
  );
}
