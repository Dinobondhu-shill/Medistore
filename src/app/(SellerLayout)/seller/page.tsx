export default function SellerDashboardPage() {
  const stats = [
    { label: "Total Products", value: 120 },
    { label: "Total Orders", value: 86 },
    { label: "Pending Orders", value: 14 },
    { label: "Revenue", value: "$12,450" },
  ]

  const recentOrders = [
    { id: "#1001", customer: "John Doe", status: "Pending", total: "$120" },
    { id: "#1002", customer: "Jane Smith", status: "Completed", total: "$340" },
    { id: "#1003", customer: "Alex Brown", status: "Processing", total: "$90" },
  ]

  return (
    <div className="space-y-8">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Seller Dashboard
        </h1>
        <p className="text-slate-500">
          Overview of your store performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-white border rounded-xl p-6"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <h2 className="text-2xl font-semibold mt-2">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Status</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-none">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-100">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
