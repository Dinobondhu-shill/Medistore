'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// Sample data for sales by month
const monthlySalesData = [
  { month: 'Jan', sales: 4000, orders: 240, revenue: 2400 },
  { month: 'Feb', sales: 3000, orders: 221, revenue: 2210 },
  { month: 'Mar', sales: 2000, orders: 229, revenue: 2290 },
  { month: 'Apr', sales: 2780, orders: 200, revenue: 2000 },
  { month: 'May', sales: 1890, orders: 218, revenue: 2181 },
  { month: 'Jun', sales: 2390, orders: 250, revenue: 2500 },
]

// Sample data for top products
const topProductsData = [
  { name: 'Paracetamol', value: 35, amount: 3500 },
  { name: 'Ibuprofen', value: 25, amount: 2500 },
  { name: 'Vitamin C', value: 20, amount: 2000 },
  { name: 'Antibiotics', value: 12, amount: 1200 },
  { name: 'Others', value: 8, amount: 800 },
]

// Sample data for inventory status
const inventoryData = [
  { category: 'Pain Relief', inStock: 450, lowStock: 120, outOfStock: 30 },
  { category: 'Vitamins', inStock: 380, lowStock: 90, outOfStock: 20 },
  { category: 'Antibiotics', inStock: 250, lowStock: 60, outOfStock: 10 },
  { category: 'Cold & Flu', inStock: 320, lowStock: 110, outOfStock: 25 },
  { category: 'Digestion', inStock: 290, lowStock: 85, outOfStock: 15 },
]

// Sample data for customer growth
const customerGrowthData = [
  { week: 'W1', customers: 120, returning: 40 },
  { week: 'W2', customers: 150, returning: 55 },
  { week: 'W3', customers: 180, returning: 75 },
  { week: 'W4', customers: 220, returning: 95 },
]

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe']
const INVENTORY_COLORS = {
  inStock: '#10b981',
  lowStock: '#f59e0b',
  outOfStock: '#ef4444',
}

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your sales, inventory, and customer metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground mt-1">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,158</div>
              <p className="text-xs text-muted-foreground mt-1">+8.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">670</div>
              <p className="text-xs text-muted-foreground mt-1">+15.3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$39.08</div>
              <p className="text-xs text-muted-foreground mt-1">+2.1% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sales & Orders Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Sales & Orders</CardTitle>
              <CardDescription>Revenue and order trends over 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sales: {
                    label: 'Sales',
                    color: 'hsl(var(--chart-1))',
                  },
                  orders: {
                    label: 'Orders',
                    color: 'hsl(var(--chart-2))',
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySalesData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#1e40af"
                      strokeWidth={2}
                      dot={{ fill: '#1e40af', r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Products Pie Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Product distribution by sales volume</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ChartContainer
                config={{
                  product: {
                    label: 'Sales',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
                className="h-80 w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topProductsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#1e40af"
                      dataKey="value"
                    >
                      {topProductsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Inventory Status Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Inventory Status by Category</CardTitle>
              <CardDescription>Stock levels across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  inStock: {
                    label: 'In Stock',
                    color: '#10b981',
                  },
                  lowStock: {
                    label: 'Low Stock',
                    color: '#f59e0b',
                  },
                  outOfStock: {
                    label: 'Out of Stock',
                    color: '#ef4444',
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inventoryData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inStock" fill="#10b981" name="In Stock" />
                    <Bar dataKey="lowStock" fill="#f59e0b" name="Low Stock" />
                    <Bar dataKey="outOfStock" fill="#ef4444" name="Out of Stock" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Customer Growth Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>New vs returning customers weekly</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  customers: {
                    label: 'New Customers',
                    color: '#1e40af',
                  },
                  returning: {
                    label: 'Returning Customers',
                    color: '#3b82f6',
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerGrowthData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="customers" fill="#1e40af" name="New Customers" />
                    <Bar dataKey="returning" fill="#3b82f6" name="Returning Customers" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Breakdown Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Breakdown</CardTitle>
            <CardDescription>Revenue trends with detailed breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: 'Revenue',
                  color: '#1e40af',
                },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="#1e40af" name="Revenue" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
