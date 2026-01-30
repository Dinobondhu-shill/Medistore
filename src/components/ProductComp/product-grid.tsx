'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  discount: number;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  selectedCategory: string | null;
  searchQuery: string;
}

export function ProductGrid({
  products,
  isLoading = false,
  selectedCategory,
  searchQuery,
}: ProductGridProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    const searchMatch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = async (productId: string) => {
    setAddingToCart(productId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));
    setAddingToCart(null);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-foreground mb-2">No Products Found</h3>
          <p className="text-muted-foreground max-w-md">
            {searchQuery
              ? `No products match your search for "${searchQuery}"`
              : 'No products available in this category'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-sm text-muted-foreground">
        Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50 animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both',
            }}
          >
            {/* Image Container */}
            <div className="relative h-28 bg-muted overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              {product.discount > 0 && (
                <div className="absolute top-3 right-3 bg-accent/90 text-accent-foreground rounded-full px-3 py-1 text-sm font-bold animate-pulse">
                  {product.discount}% OFF
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-full transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 ${
                    wishlist.includes(product.id)
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-primary/80 text-primary-foreground hover:bg-primary'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5" fill="currentColor" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col h-full">
              {/* Category Badge */}
              <span className="text-xs text-primary font-semibold mb-2">
                {product.category}
              </span>

              {/* Product Name */}
              <h3 className="font-bold text-foreground line-clamp-2 pb-4">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex">
                  {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
                    <span key={i} className="text-sm">
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-lg font-bold text-primary">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 mb-4 bg-muted rounded-lg">
                <button
                  onClick={() =>
                    updateQuantity(
                      product.id,
                      (quantities[product.id] || 1) - 1
                    )
                  }
                  className="px-2 py-1 text-foreground hover:bg-primary/20 rounded transition-colors"
                >
                  −
                </button>
                <span className="flex-1 text-center font-semibold text-sm">
                  {quantities[product.id] || 1}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(
                      product.id,
                      (quantities[product.id] || 1) + 1
                    )
                  }
                  className="px-2 py-1 text-foreground hover:bg-primary/20 rounded transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={() => handleAddToCart(product.id)}
                disabled={addingToCart === product.id}
                className="w-full bg-primary hover:bg-secondary text-primary-foreground font-semibold transition-all duration-300"
              >
                {addingToCart === product.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
