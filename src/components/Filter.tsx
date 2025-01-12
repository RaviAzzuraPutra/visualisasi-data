import React from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FilterProps {
    locations: string[];
    categories: string[];
    onFilterChange: (key: string, value: string[], allSelected: boolean) => void;
}

export default function Filter({ locations, categories, onFilterChange }: FilterProps) {
    const [selectedLocations, setSelectedLocations] = React.useState<string[]>(locations);
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>(categories);

    const handleLocationChange = (location: string) => {
        const updatedLocations = selectedLocations.includes(location)
            ? selectedLocations.filter(l => l !== location)
            : [...selectedLocations, location];
        setSelectedLocations(updatedLocations);
        onFilterChange('Location', updatedLocations, updatedLocations.length === locations.length);
    };

    const handleCategoryChange = (category: string) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updatedCategories);
        onFilterChange('Category', updatedCategories, updatedCategories.length === categories.length);
    };

    return (
        <div className="flex flex-col space-y-4 p-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">Locations</h3>
                <div className="flex flex-wrap gap-4">
                    {locations.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                            <Checkbox
                                id={`location-${location}`}
                                checked={selectedLocations.includes(location)}
                                onCheckedChange={() => handleLocationChange(location)}
                            />
                            <Label htmlFor={`location-${location}`}>{location}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <div className="flex flex-wrap gap-4">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                                id={`category-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => handleCategoryChange(category)}
                            />
                            <Label htmlFor={`category-${category}`}>{category}</Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

