import { SectionHeader } from "@/components/LayoutComponent/section-header";
import { OrdersTable } from "@/components/seller/orders/orde-table";


export default function SellerOrdersPage() {


    return (
        <>
        <SectionHeader
            title="Your Orders"
            subtitle="Manage your sales"
            description="View and manage your customer orders. Update order statuses, process returns, and keep track of your sales history."
        />
        {/* Order data */}
        <OrdersTable />

        </>
    )
}