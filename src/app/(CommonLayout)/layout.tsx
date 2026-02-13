import React from "react"
import type { Metadata } from 'next'
import { Navbar } from '@/components/LayoutComponent/navbar'
import '../../app/globals.css'
import { Footer } from "@/components/LayoutComponent/footer"
import { userServices } from "@/services/user-services"


export const metadata: Metadata = {
  title: 'MediStore - Your Trusted Medical Pharmacy',
  description: 'Shop quality medicines, health products, and wellness solutions at MediStore. Fast delivery, professional service.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const data = await userServices.getSession()
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Navbar sessionData={data} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
