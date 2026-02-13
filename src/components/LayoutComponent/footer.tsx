'use client'

import React from "react"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  ShieldCheck,
  Truck,
  Clock,
} from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gradient-to-b from-card to-muted border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-muted-foreground">
                Get health tips, product updates, and exclusive offers delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-11 bg-background border-border"
                required
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-secondary text-primary-foreground font-semibold h-11 px-6 transition-all"
              >
                Subscribe
              </Button>
            </form>

            {subscribed && (
              <p className="col-span-full text-sm text-accent font-medium animate-fade-in">
                ✓ Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex gap-3 items-start">
            <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">100% Authentic</h4>
              <p className="text-sm text-muted-foreground">Verified medicines from trusted manufacturers</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Truck className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Fast Delivery</h4>
              <p className="text-sm text-muted-foreground">Same-day delivery available in select areas</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Heart className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Health First</h4>
              <p className="text-sm text-muted-foreground">Expert pharmacist guidance included</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">Customer service always available for you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground">MediStore</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted online pharmacy for quality medicines and health products.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-foreground flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-foreground flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-secondary hover:text-secondary-foreground text-foreground flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-secondary hover:text-secondary-foreground text-foreground flex items-center justify-center transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-2">
              {['Medicines', 'Supplements', 'First Aid', 'Medical Devices', 'Wellness Products'].map(
                (item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Blog', 'Careers', 'Press', 'Partners'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {['Help Center', 'Track Order', 'Returns', 'Refunds', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <a href="mailto:support@medistore.com" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                  support@medistore.com
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">123 Health Street, Medical City, MC 12345</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-b border-border">
        <p className="text-sm font-semibold text-foreground mb-4">We Accept</p>
        <div className="flex flex-wrap gap-3">
          {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer'].map((method) => (
            <div
              key={method}
              className="px-3 py-2 rounded-lg border border-border bg-muted text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {method}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="text-sm text-muted-foreground">
            <p>&copy; 2024 MediStore. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap gap-6 md:justify-end">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
