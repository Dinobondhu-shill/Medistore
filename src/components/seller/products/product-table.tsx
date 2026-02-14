'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Trash2, Edit2 } from 'lucide-react'

interface Product {
  id: string
  name: string
  image: string
  stock: number
  price: number
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    image:
      'http://example.com/headphones.jpg',
    stock: 45,
    price: 79.99,
  },
  {
    id: '2',
    name: 'USB-C Cable',
    image:
      'http://example.com/usb-cable.jpg',
    stock: 120,
    price: 12.99,
  },
  {
    id: '3',
    name: 'Smart Watch',
    image:
      'http://example.com/smart-watch.jpg',
    stock: 28,
    price: 199.99,
  },
]

export function ProductsTable() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setDeleteId(null)
  }

  const stockColor = (stock: number) => {
    if (stock > 50) return 'bg-green-500/10 text-green-600'
    if (stock > 20) return 'bg-yellow-500/10 text-yellow-600'
    return 'bg-red-500/10 text-red-600'
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={product.id}
              className={`group transition ${
                index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
              } hover:bg-muted/40`}
            >
              {/* PRODUCT */}
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg border">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-medium leading-none">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ID: {product.id}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* STOCK */}
              <TableCell className="text-right">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${stockColor(
                    product.stock
                  )}`}
                >
                  {product.stock}
                </span>
              </TableCell>

              {/* PRICE */}
              <TableCell className="text-right font-semibold">
                ${product.price.toFixed(2)}
              </TableCell>

              {/* ACTIONS */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 opacity-0 transition group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => console.log('Edit', product.id)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(product.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* DELETE MODAL */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure?
          </AlertDialogDescription>

          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
