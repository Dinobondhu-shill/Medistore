'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Settings,
  Heart,
  LogOut,
  Edit2,
  Calendar,
  CheckCircle,
  Clock,
  Package,
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data - replace with actual API call
  const userData = {
    id: '12345',
    name: 'John Anderson',
    email: 'john.anderson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '/avatars/default-user.jpg',
    joinedDate: 'January 15, 2023',
    totalOrders: 24,
    totalSpent: '$2,456.00',
  };

  // Mock orders data
  const orders = [
    {
      id: 'ORD001',
      date: 'Feb 10, 2026',
      total: '$89.99',
      status: 'delivered',
      items: 3,
    },
    {
      id: 'ORD002',
      date: 'Feb 5, 2026',
      total: '$156.50',
      status: 'in-transit',
      items: 5,
    },
    {
      id: 'ORD003',
      date: 'Jan 28, 2026',
      total: '$245.00',
      status: 'delivered',
      items: 8,
    },
  ];

  // Mock addresses
  const addresses = [
    {
      id: 1,
      type: 'Home',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      default: true,
    },
    {
      id: 2,
      type: 'Work',
      street: '456 Business Ave',
      city: 'San Jose',
      state: 'CA',
      zip: '95110',
      default: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'in-transit':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-transit':
        return <Package className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-background to-muted/30 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header Section */}
        <div className="mb-12 animate-fade-in">
          <Card className="border-border bg-card backdrop-blur-sm">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <Image
                      src={userData.avatar}
                      alt={userData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                        {userData.name}
                      </h1>
                      <p className="text-primary font-semibold flex items-center gap-2 justify-center md:justify-start">
                        <User className="w-4 h-4" /> Customer Since{' '}
                        {userData.joinedDate}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 py-6 border-y border-border">
                    <div className="text-center md:text-left">
                      <p className="text-3xl font-bold text-primary">
                        {userData.totalOrders}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-3xl font-bold text-secondary">
                        {userData.totalSpent}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                    </div>
                    <div className="text-center md:text-left md:col-span-1 col-span-2">
                      <p className="text-lg font-semibold text-accent">
                        ⭐ Valued Customer
                      </p>
                      <p className="text-sm text-muted-foreground">Premium Member</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="bg-primary hover:bg-secondary text-primary-foreground font-semibold flex items-center gap-2 justify-center"
                    >
                      <Edit2 className="w-4 h-4" /> Edit Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="border-border text-primary hover:bg-primary/10 font-semibold flex items-center gap-2 justify-center"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-border overflow-x-auto animate-fade-in">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'addresses', label: 'Addresses', icon: MapPin },
            { id: 'wishlists', label: 'Wishlist', icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-semibold flex items-center gap-2 whitespace-nowrap border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card className="border-border bg-card p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                    <p className="text-foreground font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      {userData.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                    <p className="text-foreground font-semibold flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      {userData.phone}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Account Preferences */}
              <Card className="border-border bg-card p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-accent" />
                  Preferences
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-muted transition-all">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded accent-primary"
                    />
                    <span className="text-sm text-foreground">
                      Receive order updates
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-muted transition-all">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded accent-primary"
                    />
                    <span className="text-sm text-foreground">
                      Newsletter and promotions
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-muted transition-all">
                    <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                    <span className="text-sm text-foreground">
                      Health tips and articles
                    </span>
                  </label>
                </div>
              </Card>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <Card
                    key={order.id}
                    className="border-border bg-card p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Order ID</p>
                            <p className="text-lg font-bold text-foreground">
                              {order.id}
                            </p>
                          </div>
                          <div className="hidden md:block w-px h-8 bg-border"></div>
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="text-foreground font-semibold flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              {order.date}
                            </p>
                          </div>
                          <div className="hidden md:block w-px h-8 bg-border"></div>
                          <div>
                            <p className="text-sm text-muted-foreground">Items</p>
                            <p className="text-foreground font-semibold">
                              {order.items} item{order.items > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-2xl font-bold text-primary">
                            {order.total}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-1 px-3 py-2 rounded-full font-semibold text-sm ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="capitalize">
                            {order.status === 'in-transit'
                              ? 'In Transit'
                              : order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="border-border bg-card p-12 text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground text-lg">
                    No orders yet. Start shopping!
                  </p>
                </Card>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address, index) => (
                <Card
                  key={address.id}
                  className="border-border bg-card p-6 hover:shadow-lg transition-all duration-300 animate-fade-in relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {address.default && (
                    <div className="absolute top-4 right-4 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                      Default
                    </div>
                  )}
                  <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {address.type}
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zip}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-border hover:bg-muted"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-border hover:bg-muted"
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}

              {/* Add New Address */}
              <Card className="border-2 border-dashed border-border bg-card/50 p-6 flex items-center justify-center hover:bg-card transition-all duration-300 cursor-pointer group">
                <button className="text-center w-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-all">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-all">
                    Add New Address
                  </p>
                </button>
              </Card>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlists' && (
            <Card className="border-border bg-card p-12 text-center">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-lg">
                Your wishlist is empty. Add some medicines to save for later!
              </p>
              <Button className="mt-6 bg-primary hover:bg-secondary text-primary-foreground">
                <Link href="/products">
                Start Shopping
                </Link>
              </Button>
            </Card>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-12 flex justify-center animate-fade-in">
          <Button
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10 font-semibold flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
