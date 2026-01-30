'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface Medicine {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount: number;
}

const medicines: Medicine[] = [
  {
    id: 1,
    name: 'Aspirin 500mg',
    description: 'Effective pain relief and fever reduction',
    price: 2.99,
    originalPrice: 4.99,
    image: '/products/aspirin.jpg',
    rating: 4.8,
    reviews: 324,
    inStock: true,
    discount: 40,
  },
  {
    id: 2,
    name: 'Cough Syrup',
    description: 'Fast-acting cough and cold relief',
    price: 4.49,
    originalPrice: 6.99,
    image: '/products/cough-syrup.jpg',
    rating: 4.6,
    reviews: 218,
    inStock: true,
    discount: 35,
  },
  {
    id: 3,
    name: 'Multivitamin',
    description: 'Daily essential vitamins and minerals',
    price: 8.99,
    originalPrice: 12.99,
    image: '/products/multivitamin.jpg',
    rating: 4.9,
    reviews: 512,
    inStock: true,
    discount: 30,
  },
  {
    id: 4,
    name: 'Antacid Tablets',
    description: 'Quick relief from heartburn and acidity',
    price: 1.99,
    originalPrice: 3.49,
    image: '/products/antacid.jpg',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    discount: 42,
  },
  {
    id: 5,
    name: 'Ibuprofen 200mg',
    description: 'Powerful pain and inflammation relief',
    price: 3.49,
    originalPrice: 5.99,
    image: '/products/ibuprofen.jpg',
    rating: 4.8,
    reviews: 401,
    inStock: true,
    discount: 41,
  },
  {
    id: 6,
    name: 'Antihistamine',
    description: 'Allergy relief and antihistamine',
    price: 3.99,
    originalPrice: 6.49,
    image: '/products/antihistamine.jpg',
    rating: 4.5,
    reviews: 289,
    inStock: true,
    discount: 38,
  },
  {
    id: 7,
    name: 'Vitamin C 1000mg',
    description: 'Immune system booster and support',
    price: 5.99,
    originalPrice: 8.99,
    image: '/products/vitamin-c.jpg',
    rating: 4.7,
    reviews: 445,
    inStock: true,
    discount: 33,
  },
  {
    id: 8,
    name: 'Digestive Aid',
    description: 'Natural digestive enzyme supplement',
    price: 6.99,
    originalPrice: 10.49,
    image: '/products/digestive-aid.jpg',
    rating: 4.6,
    reviews: 178,
    inStock: true,
    discount: 33,
  },
];

export function HotSellingMedicines() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updateQuantity = (id: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const newQuantity = Math.max(1, current + delta);
      return { ...prev, [id]: newQuantity };
    });
  };

  const getQuantity = (id: number) => quantities[id] || 1;

  return (
    <div className="space-y-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {medicines.map((medicine) => (
          <div
            key={medicine.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative h-48 bg-muted overflow-hidden group">
              <Image
                src={medicine.image || "/placeholder.svg"}
                alt={medicine.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
              />

              {/* Discount Badge */}
              {medicine.discount > 0 && (
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground rounded-lg px-2 py-1 font-bold text-sm">
                  -{medicine.discount}%
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(medicine.id)}
                className="absolute top-3 left-3 bg-white rounded-full p-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-md"
                aria-label="Add to wishlist"
              >
                <Heart
                  className="w-5 h-5"
                  fill={wishlist.includes(medicine.id) ? 'currentColor' : 'none'}
                  color={wishlist.includes(medicine.id) ? '#d4af37' : '#6b3fd6'}
                />
              </button>

              {/* Stock Status */}
              {!medicine.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill={i < Math.floor(medicine.rating) ? '#d4af37' : '#e5e7eb'}
                      color={i < Math.floor(medicine.rating) ? '#d4af37' : '#e5e7eb'}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({medicine.reviews})
                </span>
              </div>

              {/* Name */}
              <h3 className="font-bold text-foreground text-base mb-1 line-clamp-2">
                {medicine.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {medicine.description}
              </p>

              {/* Price Section */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-primary">
                  ${medicine.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${medicine.originalPrice.toFixed(2)}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 mb-4 bg-muted rounded-lg p-1 w-fit">
                <button
                  onClick={() => updateQuantity(medicine.id, -1)}
                  className="px-2 py-1 hover:bg-primary hover:text-primary-foreground rounded transition-colors"
                  disabled={!medicine.inStock}
                >
                  −
                </button>
                <span className="px-3 font-semibold text-sm">
                  {getQuantity(medicine.id)}
                </span>
                <button
                  onClick={() => updateQuantity(medicine.id, 1)}
                  className="px-2 py-1 hover:bg-primary hover:text-primary-foreground rounded transition-colors"
                  disabled={!medicine.inStock}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                className="w-full bg-primary hover:bg-secondary text-primary-foreground font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                disabled={!medicine.inStock}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
