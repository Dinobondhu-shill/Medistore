'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, Heart } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      console.log('[v0] Password reset requested for:', email);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/5 flex items-center justify-center px-4 py-12">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-secondary/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image Section */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-full aspect-square max-w-md">
              {/* Animated background circle */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl animate-pulse"></div>

                {/*  Form Section */}
          <div className="w-full space-y-8">
            {/* Back Button */}
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Sign In</span>
            </Link>

            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">MediStore</h1>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Reset Password</h2>
              <p className="text-muted-foreground">
                {submitted
                  ? 'Check your email for password reset instructions'
                  : 'Enter your email address and we will send you a link to reset your password'}
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-linear-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 text-white font-semibold text-base transition-all duration-300 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-5">
                {/* Success Message */}
                <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 space-y-2">
                  <p className="font-semibold text-accent">Email Sent Successfully!</p>
                  <p className="text-sm text-accent/80">
                    Check your email <span className="font-semibold">{email}</span> for instructions to reset your password.
                  </p>
                  <p className="text-xs text-accent/60 pt-2">
                    The link will expire in 24 hours. If you don't see the email, check your spam folder.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="w-full h-11 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all"
                  >
                    Try Another Email
                  </Button>
                  <Link href="/login" className="block">
                    <Button className="w-full h-11 bg-primary hover:bg-secondary text-primary-foreground font-semibold transition-all">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Help Text */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Having trouble?{' '}
                <Link href="#" className="font-semibold text-primary hover:text-secondary transition-colors">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
              {/* Floating element */}
              <div className="absolute top-4 right-4 z-20 animate-bounce">
                <div className="w-12 h-12 rounded-full bg-accent/20 backdrop-blur-md flex items-center justify-center border border-accent/40">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
              </div>

           
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
