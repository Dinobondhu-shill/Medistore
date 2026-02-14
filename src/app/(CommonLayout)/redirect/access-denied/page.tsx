'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { ShieldAlert } from "lucide-react"

export default function AccessDeniedPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <section
        className={`max-w-md w-full bg-white rounded-2xl border p-8 text-center
        transition-all duration-500 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-slate-100">
            <ShieldAlert className="text-slate-700" />
          </div>
        </div>

        <h1 className="text-xl font-semibold text-slate-900">
          Seller Access Required
        </h1>

        <p className="text-slate-600 mt-2 text-sm leading-relaxed">
          You’re signed in, but your account doesn’t have permission to
          access the seller dashboard.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-slate-900 text-white
            hover:bg-slate-800 transition"
          >
            Go to Home
          </Link>

          <Link
            href="/login"
            className="px-5 py-2.5 rounded-lg border border-slate-300
            hover:bg-slate-100 transition"
          >
            Switch Account
          </Link>
        </div>
      </section>
    </main>
  )
}
