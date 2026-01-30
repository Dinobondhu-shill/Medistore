'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 'vitamins',
    name: 'Vitamins & Supplements',
    image: '/categories/vitamins.jpg',
    description: 'Boost your immunity',
  },
  {
    id: 'pain-relief',
    name: 'Pain Relief',
    image: '/categories/pain-relief.jpg',
    description: 'Fast pain relief',
  },
  {
    id: 'cold-care',
    name: 'Cold & Cough',
    image: '/categories/cold-care.jpg',
    description: 'Effective remedies',
  },
  {
    id: 'first-aid',
    name: 'First Aid',
    image: '/categories/first-aid.jpg',
    description: 'Safety essentials',
  },
  {
    id: 'skin-care',
    name: 'Skin Care',
    image: '/categories/skin-care.jpg',
    description: 'Healthy skin',
  },
  {
    id: 'diabetes',
    name: 'Diabetes Care',
    image: '/categories/diabetes.jpg',
    description: 'Manage with care',
  },
];

export function CategoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (categories.length - itemsPerView + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, itemsPerView]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
    setIsAutoPlay(false);
  };

  const handleCategoryClick = (categoryId: string) => {
    console.log('Category clicked:', categoryId);
    // Add navigation logic here
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div className="flex gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="flex-shrink-0 transition-all duration-300 px-2"
              style={{
                width: `${100 / itemsPerView}%`,
                minWidth: `${100 / itemsPerView}%`,
              }}
            >
              <button
                onClick={() => handleCategoryClick(category.id)}
                className="w-full h-full group cursor-pointer flex flex-col"
              >
                {/* Image Card */}
                <div className="relative h-56 w-full rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 flex-shrink-0">
                  {/* Image Container */}
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>

                  {/* Floating Badge */}
                  <div className="absolute top-3 right-3 bg-accent/90 text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                </div>

                {/* Category Info Below Image */}
                <div className="mt-4 flex flex-col items-center justify-center flex-grow">
                  <h3 className="text-base md:text-lg font-bold text-foreground text-center leading-tight">
                    {category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 text-center">
                    {category.description}
                  </p>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all">
                      Shop Now
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute -bottom-16 right-0 flex gap-3 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-12 h-12 bg-transparent"
          aria-label="Previous category"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          onClick={handleNext}
          className="rounded-full bg-primary hover:bg-secondary text-primary-foreground transition-all duration-300 w-12 h-12"
          aria-label="Next category"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="flex gap-2 mt-12 justify-center">
        {Array.from({ length: Math.max(0, categories.length - itemsPerView + 1) }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlay(false);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-muted-foreground/40 w-2 hover:bg-muted-foreground/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
