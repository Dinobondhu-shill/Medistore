'use client'

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Package, ShoppingCart,
  BarChart3, Settings, Menu, X,
  PlusCircle
} from "lucide-react"


function usePersistentSidebar() {
  const [open, setOpen] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const saved = localStorage.getItem("sidebar-open")
    setOpen(saved ? JSON.parse(saved) : true)
  }, [])

  const toggle = React.useCallback(() => {
    setOpen(prev => {
      if (prev === null) return prev
      const next = !prev
      localStorage.setItem("sidebar-open", JSON.stringify(next))
      return next
    })
  }, [])

  return { open, toggle }
}


export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { open, toggle } = usePersistentSidebar()
  const pathname = usePathname()

  if (open === null) {
    return <div className="h-screen bg-background" />
  }

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/seller" },
    { label: "Products", icon: Package, href: "/seller/products" },
    { label: "Add Product", icon: PlusCircle, href: "/seller/add-product" },
    { label: "Orders", icon: ShoppingCart, href: "/seller/orders" },
    { label: "Analytics", icon: BarChart3, href: "/seller/analytics" },
    { label: "Settings", icon: Settings, href: "/seller/settings" },
  ]

  return (
    <div className="flex h-screen bg-background">

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-50 border-r 
        ${open ? "w-64" : "w-16"}
        transition-all duration-300`}
      >
        <nav className="p-4 space-y-2">
          {navItems.map(item => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg
                ${active 
                  ? "bg-slate-200 text-slate-900" 
                  : "text-slate-600 hover:bg-slate-100"}`}
              >
                <item.icon size={20} />
                {open && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main */}
      <div
        className={`flex-1 flex flex-col
        ${open ? "ml-64" : "ml-16"}
        transition-all duration-300`}
      >

        {/* Topbar */}
        <header className="h-16 border-b flex items-center px-4">
          <button
            onClick={toggle}
            aria-label="Toggle Sidebar"
            aria-expanded={open}
            className="p-2 rounded hover:bg-slate-100"
          >
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
