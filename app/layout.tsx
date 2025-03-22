import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'cambio da rua',
  description: 'Created by Garcia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
