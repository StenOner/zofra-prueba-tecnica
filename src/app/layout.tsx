'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import Navigation from '@/components/navigation'

import 'tailwindcss/tailwind.css'
import '@/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`flex w-full ${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0`}
      >
        <Navigation>
          {children}
        </Navigation>
      </body>
    </html>
  )
}