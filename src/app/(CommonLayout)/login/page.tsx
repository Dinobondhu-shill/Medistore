'use client';

import React from "react"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, Heart } from 'lucide-react';
import photo from './loginimg.png'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      console.log('[v0] Login attempt:', { email, password });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/5 flex items-center justify-center px-4 py-12">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-secondary/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image Section */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-full aspect-square max-w-md">
              {/* Animated background circle */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl animate-pulse"></div>

              {/* Image container */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={photo}
                  alt="Medical Professional"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Floating elements */}
              <div className="absolute top-4 right-4 z-20 animate-bounce">
                <div className="w-12 h-12 rounded-full bg-accent/20 backdrop-blur-md flex items-center justify-center border border-accent/40">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
              </div>

              <div className="absolute bottom-8 left-4 z-20 animate-pulse">
                <div className="px-4 py-2 rounded-lg bg-background/80 backdrop-blur-md border border-border shadow-lg">
                  <p className="text-sm font-semibold text-foreground">24/7 Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form Section */}
          <div className="w-full space-y-8">
            {/* Header */}
            <div className="space-y-3">

              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Welcome Back</h2>
              <p className="text-muted-foreground">Sign in to access your health records and order history</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-card border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e ) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 bg-card border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-border" />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-linear-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 text-white font-semibold text-base transition-all duration-300 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 border-border hover:border-primary hover:bg-primary/5 transition-all bg-transparent"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Google</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 border-border hover:border-primary hover:bg-primary/5 transition-all bg-transparent"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.99 3.85 9.12 8.8 9.1.65-.03 1.95.4 1.95.4s.27.59 1.25.59c2.8 0 5.17-2.35 5.17-5.15C19.15 10.77 16.08 8 12.5 8c-2 0-3.8 1.15-4.66 2.8-.22.42-.18 1.04.16 1.4.35.37.87.44 1.19.15.22-.2.4-.45.63-.72.46-.56 1.1-.9 1.81-.9 1.86 0 3.37 1.51 3.37 3.37S14.36 16.2 12.5 16.2c-.3 0-.6-.04-.88-.12-.95-.28-1.76-1.08-2.17-2.08-.21-.5-.65-.78-1.23-.78-.66 0-1.23.65-1.23 1.4 0 1.8 1.45 3.35 3.22 3.35.15 0 .29-.01.44-.03C16.34 21.64 19.25 19 19.25 15.5 19.25 11 16 7.7 12 7.7z" />
                </svg>
                <span className="ml-2 text-sm font-medium">Apple</span>
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center space-y-3 pt-4 border-t border-border">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="font-semibold text-primary hover:text-secondary transition-colors"
                >
                  Create one now
                </Link>
              </p>
              <p className="text-xs text-muted-foreground">
                By signing in, you agree to our{' '}
                <Link href="#" className="underline hover:text-foreground transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="underline hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
