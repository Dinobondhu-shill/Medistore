'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/LayoutComponent/section-header';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  productCount: number;
}

const categories: Category[] = [
  {
    id: 'vitamins',
    name: 'Vitamins & Supplements',
    image: '/categories/vitamins.jpg',
    description: 'Essential vitamins and supplements for daily wellness',
    productCount: 48,
  },
  {
    id: 'pain-relief',
    name: 'Pain Relief',
    image: '/categories/pain-relief.jpg',
    description: 'Effective pain management solutions',
    productCount: 32,
  },
  {
    id: 'cold-care',
    name: 'Cold & Cough',
    image: '/categories/cold-care.jpg',
    description: 'Relief from cold and cough symptoms',
    productCount: 28,
  },
  {
    id: 'first-aid',
    name: 'First Aid',
    image: '/categories/first-aid.jpg',
    description: 'Complete first aid and emergency supplies',
    productCount: 56,
  },
  {
    id: 'skin-care',
    name: 'Skin Care',
    image: '/categories/skin-care.jpg',
    description: 'Dermatology and skincare products',
    productCount: 42,
  },
  {
    id: 'diabetes',
    name: 'Diabetes Care',
    image: '/categories/diabetes.jpg',
    description: 'Diabetes management products and devices',
    productCount: 35,
  },
  {
    id: 'baby-care',
    name: 'Baby Care',
    image: '/categories/baby-care.jpg',
    description: 'Safe and gentle baby care products',
    productCount: 38,
  },
  {
    id: 'oral-care',
    name: 'Oral Care',
    image: '/categories/oral-care.jpg',
    description: 'Dental hygiene and oral health products',
    productCount: 24,
  },
  {
    id: 'fitness-supplements',
    name: 'Fitness & Sports',
    image: '/categories/fitness-supplements.jpg',
    description: 'Performance and fitness supplements',
    productCount: 45,
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    image: '/categories/womens-health.jpg',
    description: 'Health products for women',
    productCount: 33,
  },
  {
    id: 'mens-health',
    name: "Men's Health",
    image: '/categories/mens-health.jpg',
    description: 'Health products for men',
    productCount: 29,
  },
  {
    id: 'medical-devices',
    name: 'Medical Devices',
    image: '/categories/medical-devices.jpg',
    description: 'Professional medical devices and equipment',
    productCount: 41,
  },
];

export default function CategoriesPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-6 md:py-10 bg-gradient-to-b from-primary/5 to-transparent border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="SHOP"
            title="Browse All Medicine Categories"
            description="Explore our comprehensive range of medicines and health products organized by category. Click on any category to discover products tailored to your needs."
          />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <Link href={`/products?category=${category.id}`} key={category.id}>
                <div
                  className="group cursor-pointer h-full"
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Category Card Container */}
                  <div className="flex flex-col items-center space-y-4 h-full animation-delay" style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                  }}>
                    {/* Round Image Container */}
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-card border-2 border-muted shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-primary">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover w-full h-full group-hover:scale-125 transition-transform duration-500"
                        sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 192px"
                      />
                      
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-all duration-300"></div>

                      {/* Product Count Badge */}
                      <div className="absolute top-3 right-3 bg-accent text-accent-foreground rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-bold text-sm sm:text-base group-hover:scale-110 transition-transform duration-300">
                        {category.productCount}
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="text-center flex flex-col items-center space-y-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">
                        {category.description}
                      </p>

                      {/* Shop Button - Appears on Hover */}
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                          Shop Now
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-border bg-gradient-to-r from-primary/10 via-transparent to-secondary/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Use our advanced search and filter options to discover the perfect medicine for your needs.
          </p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-secondary text-primary-foreground font-semibold px-8 py-6 text-base">
              Explore All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✓',
                title: 'Wide Selection',
                description: '12+ categories with hundreds of authentic medicines and health products.',
              },
              {
                icon: '⚡',
                title: 'Easy Navigation',
                description: 'Intuitive category layout makes finding medicines quick and simple.',
              },
              {
                icon: '🎯',
                title: 'Expert Guidance',
                description: 'Detailed product information and expert recommendations in each category.',
              },
            ].map((info, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{info.title}</h3>
                <p className="text-muted-foreground">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay {
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
