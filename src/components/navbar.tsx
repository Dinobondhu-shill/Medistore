'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingCart, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(3);
  const user = true

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#', label: 'Products' },
    { href: '#', label: 'Categories' },
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-sm">
      {/* Main Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="hidden sm:inline-block font-bold text-xl text-primary">
              MediStore
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search - Hidden on Mobile */}
            <div className="hidden lg:flex items-center bg-muted rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-32 xl:w-48"
              />
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Wishlist */}
            <button
              className="relative p-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>

            {/* Shopping Cart */}
            <button
              className="relative p-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>

         {/* User Account */}
              {user ? (
                <button
                  className="p-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200"
                  aria-label="User account"
                >
                  <User className="w-5 h-5" />
                </button>) : (
               <div className="flex items-center gap-4">
                 <Button variant="outline" className="bg-primary hover:bg-secondary text-primary-foreground font-semibold">
                 <Link href="/login">Log In</Link>
                </Button>
                <Button variant="outline" className="bg-primary hover:bg-secondary text-primary-foreground font-semibold">
                  <Link href="/register">Register</Link>
                </Button>
               </div>
              
              )
           
            }


            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-card py-4 px-2">
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors duration-200 font-medium text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Search */}
            <div className="mt-4 px-3">
              <div className="flex items-center bg-muted rounded-lg px-3 py-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none flex-1"
                />
                <Search className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="mt-4 px-3 space-y-2">
              <Button className="w-full bg-primary hover:bg-secondary text-primary-foreground font-semibold">
                Sign In
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold bg-transparent"
              >
                Register
              </Button>
            </div>
          </div>
        )}
      </div>


    </nav>
  );
}
