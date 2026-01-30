import { CategoriesCarousel } from '@/components/category-carousal';
import { SectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-background to-muted">
           {/* Categories Carousel Section */}
      <section className="py-5 md:py-10 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="EXPLORE"
            title="Browse Our Medicine Categories"
            description="Discover a wide selection of medical products organized by category. Click on any category to explore our comprehensive collection."
          />
          <div className="pb-24">
            <CategoriesCarousel />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                  ✓ Trusted by 50K+ Customers
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                Your Health,{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Our Priority
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Access a complete range of authentic medicines, health products, and wellness solutions delivered to your doorstep with professional guidance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="bg-primary hover:bg-secondary text-primary-foreground font-semibold">
                  Shop Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold bg-transparent"
                >
                  Learn More
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Customer Support</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-secondary">Express</p>
                  <p className="text-sm text-muted-foreground">Fast Delivery</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-accent">100%</p>
                  <p className="text-sm text-muted-foreground">Authentic</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-card border border-border rounded-2xl p-8 h-full flex flex-col justify-center items-center space-y-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center text-foreground">
                  Premium Medical Products
                </h3>
                <p className="text-center text-muted-foreground">
                  Verified by healthcare professionals, trusted by thousands
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    Certified
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                    Safe
                  </span>
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    Reliable
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MediStore?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine quality, reliability, and customer care to deliver the best healthcare shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '💊',
                title: 'Authentic Products',
                description: 'All medicines and health products are sourced directly from manufacturers and verified suppliers.',
              },
              {
                icon: '🚚',
                title: 'Express Delivery',
                description: 'Same-day delivery available in selected areas. Fast and secure packaging for all orders.',
              },
              {
                icon: '👨‍⚕️',
                title: 'Expert Guidance',
                description: 'Consult with our licensed pharmacists for product recommendations and health advice.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
