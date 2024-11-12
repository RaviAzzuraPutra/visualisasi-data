import React from 'react';

export default function Filter({ locations, months, onFilterChange }) {
    return (
        <div className="flex space-x-4 p-4">
            <select onChange={(e) => onFilterChange('location', e.target.value)} className="p-2 border rounded">
                <option value="">Select Location</option>
                {locations.map((location, idx) => (
                    <option key={idx} value={location}>{location}</option>
                ))}
            </select>

            <select onChange={(e) => onFilterChange('month', e.target.value)} className="p-2 border rounded">
                <option value="">Select Month</option>
                {months.map((month, idx) => (
                    <option key={idx} value={month}>{month}</option>
                ))}
            </select>
        </div>
    );
}
