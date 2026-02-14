import { SectionHeader } from "@/components/LayoutComponent/section-header";
import { ProductsTable } from "@/components/seller/products/product-table";

export default function ProductsPage() {
    return (
       <>
        <SectionHeader
            title="Your Products"
            subtitle="Manage your inventory"
            description="Add, edit, or remove products from your store. Keep your inventory up-to-date and organized."
        />

        <ProductsTable />
        </>
    ) 
}