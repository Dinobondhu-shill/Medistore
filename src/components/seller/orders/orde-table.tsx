'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ChevronRight } from 'lucide-react'

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  email: string
  totalAmount: number
  status: OrderStatus
  items: number
  orderDate: string
}

const SAMPLE_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customerName: 'Sarah Johnson',
    email: 'sarah@example.com',
    totalAmount: 156.50,
    status: 'pending',
    items: 3,
    orderDate: '2024-02-13',
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customerName: 'Michael Chen',
    email: 'michael@example.com',
    totalAmount: 89.99,
    status: 'processing',
    items: 2,
    orderDate: '2024-02-12',
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    customerName: 'Emma Davis',
    email: 'emma@example.com',
    totalAmount: 234.75,
    status: 'shipped',
    items: 5,
    orderDate: '2024-02-11',
  },
  {
    id: '4',
    orderNumber: 'ORD-004',
    customerName: 'James Wilson',
    email: 'james@example.com',
    totalAmount: 67.50,
    status: 'delivered',
    items: 1,
    orderDate: '2024-02-10',
  },
  {
    id: '5',
    orderNumber: 'ORD-005',
    customerName: 'Lisa Anderson',
    email: 'lisa@example.com',
    totalAmount: 145.00,
    status: 'shipped',
    items: 4,
    orderDate: '2024-02-09',
  },
  {
    id: '6',
    orderNumber: 'ORD-006',
    customerName: 'Robert Taylor',
    email: 'robert@example.com',
    totalAmount: 199.99,
    status: 'cancelled',
    items: 2,
    orderDate: '2024-02-08',
  },
  {
    id: '7',
    orderNumber: 'ORD-007',
    customerName: 'Jennifer Brown',
    email: 'jennifer@example.com',
    totalAmount: 82.25,
    status: 'pending',
    items: 2,
    orderDate: '2024-02-07',
  },
  {
    id: '8',
    orderNumber: 'ORD-008',
    customerName: 'David Martinez',
    email: 'david@example.com',
    totalAmount: 310.50,
    status: 'processing',
    items: 6,
    orderDate: '2024-02-06',
  },
]

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-yellow-700', bgColor: 'bg-yellow-100/30' },
  processing: { label: 'Processing', color: 'text-blue-700', bgColor: 'bg-blue-100/30' },
  shipped: { label: 'Shipped', color: 'text-purple-700', bgColor: 'bg-purple-100/30' },
  delivered: { label: 'Delivered', color: 'text-green-700', bgColor: 'bg-green-100/30' },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-100/30' },
}

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS)
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all')
  const [statusUpdateOrder, setStatusUpdateOrder] = useState<Order | null>(null)
  const [newStatus, setNewStatus] = useState<OrderStatus | null>(null)

  const filteredOrders =
    activeTab === 'all' ? orders : orders.filter((order) => order.status === activeTab)

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  }

  const handleStatusUpdate = (order: Order) => {
    setStatusUpdateOrder(order)
    setNewStatus(null)
  }

  const confirmStatusUpdate = () => {
    if (statusUpdateOrder && newStatus) {
      setOrders(
        orders.map((order) =>
          order.id === statusUpdateOrder.id ? { ...order, status: newStatus } : order
        )
      )
      setStatusUpdateOrder(null)
      setNewStatus(null)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | OrderStatus)}>
        <TabsList className="grid w-full grid-cols-6 bg-secondary">
          <TabsTrigger value="all" className="text-sm">
            All {statusCounts.all}
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-sm">
            Pending {statusCounts.pending}
          </TabsTrigger>
          <TabsTrigger value="processing" className="text-sm">
            Processing {statusCounts.processing}
          </TabsTrigger>
          <TabsTrigger value="shipped" className="text-sm">
            Shipped {statusCounts.shipped}
          </TabsTrigger>
          <TabsTrigger value="delivered" className="text-sm">
            Delivered {statusCounts.delivered}
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="text-sm">
            Cancelled {statusCounts.cancelled}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="rounded-lg border border-border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="font-semibold">Order #</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="text-center font-semibold">Items</TableHead>
                  <TableHead className="text-right font-semibold">Total</TableHead>
                  <TableHead className="text-center font-semibold">Status</TableHead>
                  <TableHead className="text-center font-semibold">Date</TableHead>
                  <TableHead className="text-center font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-border hover:bg-muted/50">
                      <TableCell className="font-semibold text-foreground">{order.orderNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-foreground">{order.items}</TableCell>
                      <TableCell className="text-right font-semibold text-foreground">
                        ${order.totalAmount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="secondary"
                          className={`${STATUS_CONFIG[order.status].bgColor} ${STATUS_CONFIG[order.status].color} border-0`}
                        >
                          {STATUS_CONFIG[order.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {new Date(order.orderDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusUpdate(order)}
                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                          title="Update order status"
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Update status for {order.orderNumber}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog open={!!statusUpdateOrder} onOpenChange={(open) => !open && setStatusUpdateOrder(null)}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogTitle>Update Order Status</AlertDialogTitle>
          <AlertDialogDescription>
            Change the status for order {statusUpdateOrder?.orderNumber}
          </AlertDialogDescription>
          <div className="py-4">
            <Select value={newStatus || ''} onValueChange={(value) => setNewStatus(value as OrderStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmStatusUpdate}
              disabled={!newStatus}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Update Status
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
