import React from 'react';

export default function Filter({ locations, categories, onFilterChange }) {
    return (
        <div className="flex space-x-4 p-4">
            {/* Filter Location */}
            <select value={locations[0]} onChange={(e) => onFilterChange('Location', e.target.value)} className="p-2 border rounded">
                <option value="">Select Location</option>
                {locations.map((location, idx) => (
                    <option key={idx} value={location}>{location}</option>
                ))}
            </select>

            {/* Filter Category */}
            <select onChange={(e) => onFilterChange('Category', e.target.value)} className="p-2 border rounded">
                <option value="">Select Category</option>
                {categories.map((category, idx) => (
                    <option key={idx} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
}
