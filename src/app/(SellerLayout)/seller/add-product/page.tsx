'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Image from 'next/image';

interface FormData {
  name: string;
  description: string;
  imgUrl: string;
  manufacturer: string;
  tags: string;
  price: string;
  stock: string;
  isActive: boolean;
  isFeatured: boolean;
}

export default function AddProductPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    imgUrl: '',
    manufacturer: '',
    tags: '',
    price: '',
    stock: '',
    isActive: true,
    isFeatured: false,
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, imgUrl: url }));
    if (url) {
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - replace with your actual API endpoint
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        tags: formData.tags.split(',').map(tag => tag.trim()),
      };

      console.log('Product data:', productData);
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(productData),
      // });

      setSubmitStatus('success');
      setFormData({
        name: '',
        description: '',
        imgUrl: '',
        manufacturer: '',
        tags: '',
        price: '',
        stock: '',
        isActive: true,
        isFeatured: false,
      });
      setImagePreview('');
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      imgUrl: '',
      manufacturer: '',
      tags: '',
      price: '',
      stock: '',
      isActive: true,
      isFeatured: false,
    });
    setImagePreview('');
    setSubmitStatus('idle');
  };

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Add Product</h1>
          <p className="text-muted-foreground">Add a new product to your medical store inventory</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Product Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Paracetamol 500mg"
                  required
                  className="border-border focus:ring-accent"
                />
              </div>

              {/* Manufacturer */}
              <div className="space-y-2">
                <Label htmlFor="manufacturer" className="text-sm font-medium">
                  Manufacturer <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  placeholder="e.g., Pharma Inc."
                  required
                  className="border-border focus:ring-accent"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the product details, usage, and benefits..."
                  rows={4}
                  className="border-border focus:ring-accent resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Image Section */}
          <Card className="border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Product Image</CardTitle>
              <CardDescription className="text-sm">Add an image URL for the product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imgUrl" className="text-sm font-medium">
                  Image URL
                </Label>
                <Input
                  id="imgUrl"
                  name="imgUrl"
                  type="url"
                  value={formData.imgUrl}
                  onChange={handleImageUrlChange}
                  placeholder="https://example.com/product.jpg"
                  className="border-border focus:ring-accent"
                />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <p className="text-xs text-muted-foreground mb-3">Image Preview</p>
                  <div className="relative w-full h-48 bg-background rounded-md overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Product preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 400px"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing & Stock */}
          <Card className="border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">
                    Price <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                    className="border-border focus:ring-accent"
                  />
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-sm font-medium">
                    Stock Quantity <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                    className="border-border focus:ring-accent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags & Status */}
          <Card className="border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-sm font-medium">
                  Tags <span className="text-muted-foreground text-xs">(comma-separated)</span>
                </Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., medicine, pain-relief, otc"
                  className="border-border focus:ring-accent"
                />
              </div>

              {/* Status Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-border cursor-pointer accent-accent"
                  />
                  <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
                    Active Product
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="isFeatured"
                    name="isFeatured"
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-border cursor-pointer accent-accent"
                  />
                  <Label htmlFor="isFeatured" className="text-sm font-medium cursor-pointer">
                    Featured Product
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Message */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm font-medium">✓ Product added successfully!</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm font-medium">✗ Error adding product. Please try again.</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? 'Adding...' : 'Add Product'}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-secondary"
                >
                  Clear Form
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Clear Form</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to clear all form fields? This action cannot be undone.
                </AlertDialogDescription>
                <div className="flex gap-3 justify-end">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset} className="bg-destructive hover:bg-destructive/90">
                    Clear
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </div>
    </main>
  );
}
