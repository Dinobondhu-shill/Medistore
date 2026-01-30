'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PriceRange {
  min: number;
  max: number;
}

interface FiltersProps {
  selectedCategories: string[];
  selectedRating: number | null;
  priceRange: PriceRange;
  onCategoryChange: (category: string) => void;
  onRatingChange: (rating: number | null) => void;
  onPriceChange: (range: PriceRange) => void;
  onClearAll: () => void;
}

const categories = [
  'Vitamins',
  'Pain Relief',
  'Cold Care',
  'First Aid',
  'Skin Care',
  'Diabetes',
];

const ratings = [5, 4, 3, 2, 1];

export function ProductFilters({
  selectedCategories,
  selectedRating,
  priceRange,
  onCategoryChange,
  onRatingChange,
  onPriceChange,
  onClearAll,
}: FiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'categories',
    'price',
    'rating',
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedRating !== null || priceRange.min > 0 || priceRange.max < 500;

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-28 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-xs text-primary hover:text-secondary transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between text-foreground hover:text-primary transition-colors group"
        >
          <span className="font-semibold text-sm">Categories</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              expandedSections.includes('categories') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.includes('categories') && (
          <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryChange(category)}
                  className="w-4 h-4 rounded border-2 border-primary accent-primary cursor-pointer"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-foreground hover:text-primary transition-colors"
        >
          <span className="font-semibold text-sm">Price Range</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              expandedSections.includes('price') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.includes('price') && (
          <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Min</span>
                <span className="text-sm font-semibold text-primary">${priceRange.min}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange.min}
                onChange={(e) =>
                  onPriceChange({
                    ...priceRange,
                    min: Math.min(parseInt(e.target.value), priceRange.max),
                  })
                }
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Max</span>
                <span className="text-sm font-semibold text-primary">${priceRange.max}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange.max}
                onChange={(e) =>
                  onPriceChange({
                    ...priceRange,
                    max: Math.max(parseInt(e.target.value), priceRange.min),
                  })
                }
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div>
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between text-foreground hover:text-primary transition-colors"
        >
          <span className="font-semibold text-sm">Rating</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              expandedSections.includes('rating') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.includes('rating') && (
          <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {ratings.map((rating) => (
              <button
                key={rating}
                onClick={() => onRatingChange(selectedRating === rating ? null : rating)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all ${
                  selectedRating === rating
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <div className="flex">
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} className="text-lg">
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium">{rating}+ Stars</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
