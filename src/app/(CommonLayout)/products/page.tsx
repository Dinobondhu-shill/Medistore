'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductFilters } from '@/components/ProductComp/product-filter';
import { ProductGrid } from '@/components/ProductComp/product-grid';
import Link from 'next/link';

interface PriceRange {
  min: number;
  max: number;
}

// Sample products data
const allProducts = [
  {
    id: '1',
    name: 'Aspirin Pain Relief',
    category: 'Pain Relief',
    price: 4.99,
    originalPrice: 6.99,
    image: '/products/aspirin.jpg',
    rating: 4.8,
    reviews: 234,
    discount: 28,
  },
  {
    id: '2',
    name: 'Cough Syrup Plus',
    category: 'Cold Care',
    price: 6.49,
    originalPrice: 8.99,
    image: '/products/cough-syrup.jpg',
    rating: 4.6,
    reviews: 189,
    discount: 27,
  },
  {
    id: '3',
    name: 'Daily Multivitamin',
    category: 'Vitamins',
    price: 12.99,
    originalPrice: 16.99,
    image: '/products/multivitamin.jpg',
    rating: 4.9,
    reviews: 512,
    discount: 23,
  },
  {
    id: '4',
    name: 'Antacid Tablets',
    category: 'Pain Relief',
    price: 5.99,
    originalPrice: 7.99,
    image: '/products/antacid.jpg',
    rating: 4.5,
    reviews: 156,
    discount: 25,
  },
  {
    id: '5',
    name: 'Ibuprofen 200mg',
    category: 'Pain Relief',
    price: 3.99,
    originalPrice: 5.99,
    image: '/products/ibuprofen.jpg',
    rating: 4.7,
    reviews: 423,
    discount: 33,
  },
  {
    id: '6',
    name: 'Antihistamine Allergy Relief',
    category: 'Cold Care',
    price: 7.49,
    originalPrice: 9.99,
    image: '/products/antihistamine.jpg',
    rating: 4.6,
    reviews: 267,
    discount: 25,
  },
  {
    id: '7',
    name: 'Vitamin C Effervescent',
    category: 'Vitamins',
    price: 8.99,
    originalPrice: 11.99,
    image: '/products/vitamin-c.jpg',
    rating: 4.8,
    reviews: 345,
    discount: 25,
  },
  {
    id: '8',
    name: 'Digestive Aid Capsules',
    category: 'First Aid',
    price: 9.99,
    originalPrice: 12.99,
    image: '/products/digestive-aid.jpg',
    rating: 4.4,
    reviews: 178,
    discount: 23,
  },
  {
    id: '9',
    name: 'Aspirin Pain Relief',
    category: 'Pain Relief',
    price: 4.99,
    originalPrice: 6.99,
    image: '/products/aspirin.jpg',
    rating: 4.8,
    reviews: 234,
    discount: 28,
  },
  {
    id: '10',
    name: 'Cough Syrup Plus',
    category: 'Cold Care',
    price: 6.49,
    originalPrice: 8.99,
    image: '/products/cough-syrup.jpg',
    rating: 4.6,
    reviews: 189,
    discount: 27,
  },
  {
    id: '11',
    name: 'Daily Multivitamin',
    category: 'Vitamins',
    price: 12.99,
    originalPrice: 16.99,
    image: '/products/multivitamin.jpg',
    rating: 4.9,
    reviews: 512,
    discount: 23,
  },
  {
    id: '12',
    name: 'Antacid Tablets',
    category: 'Pain Relief',
    price: 5.99,
    originalPrice: 7.99,
    image: '/products/antacid.jpg',
    rating: 4.5,
    reviews: 156,
    discount: 25,
  },
];

const categories = [
  'All Categories',
  'Vitamins',
  'Pain Relief',
  'Cold Care',
  'First Aid',
  'Skin Care',
  'Diabetes',
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 500 });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedRating(null);
    setPriceRange({ min: 0, max: 500 });
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Rating filter
    if (selectedRating) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.reverse();
    }

    return result;
  }, [selectedCategories, priceRange, selectedRating, searchQuery, sortBy]);

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent border-b border-border py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Products</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            All Medicines & Healthcare Products
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse our complete collection of quality medicines and healthcare
            products. Use filters and search to find exactly what you need.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search medicines, supplements, or care products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Filter Button */}
            <Button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              variant="outline"
              className="lg:hidden border-primary text-primary hover:bg-primary/10"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>

            {/* Sort Dropdown */}
            <div className="flex-1 lg:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="price-low">Sort: Price Low to High</option>
                <option value="price-high">Sort: Price High to Low</option>
                <option value="rating">Sort: Highest Rated</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="hidden sm:block text-sm text-muted-foreground">
              {filteredProducts.length} results
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategories.length > 0 ||
            selectedRating ||
            priceRange.min > 0 ||
            priceRange.max < 500 ||
            searchQuery) && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((cat) => (
                <div
                  key={cat}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {cat}
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className="hover:text-primary/70 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
              {selectedRating && (
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                  {selectedRating}+ Stars
                  <button
                    onClick={() => setSelectedRating(null)}
                    className="hover:text-accent/70 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Products Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
              <ProductFilters
                selectedCategories={selectedCategories}
                selectedRating={selectedRating}
                priceRange={priceRange}
                onCategoryChange={handleCategoryChange}
                onRatingChange={setSelectedRating}
                onPriceChange={setPriceRange}
                onClearAll={handleClearAll}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <ProductGrid
              products={filteredProducts}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
