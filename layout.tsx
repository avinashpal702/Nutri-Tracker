import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './home.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nutri Tracker | Barcode-Based Nutrition Information Retrieval System',
  description: 'Scan food product barcodes and explore nutrition facts, nutrient ratings, and additives with Nutri Tracker.',
  icons: '/nutrition-facts-scanner-logo.png',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
