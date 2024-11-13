import React from 'react';

export default function Filter({ locations, categories, onFilterChange }) {
    return (
        <div className="flex space-x-4 p-4">
            {/* Filter Location */}
            <select onChange={(e) => onFilterChange('Location', e.target.value)} className="p-2 border rounded">
                <option value="">Select Location</option>
                {locations.map((location, idx) => (
                    <option key={idx} value={location}>{location}</option>
                ))}
            </select>

            {/* Filter Category */}
            <select onChange={(e) => onFilterChange('Category', e.target.value)} className="p-2 border rounded">
                <option value="">Pilih Kategori</option>
                <option value="CarbonatedSales">Penjualan Minuman Berkarbonasi</option>
                <option value="FoodSales">Penjualan Makanan</option>
                <option value="NonCarbonatedSales">Penjualan Minuman Non-Karbonasi</option>
                <option value="WaterSales">Penjualan Air</option>
            </select>
        </div>
    );
}
