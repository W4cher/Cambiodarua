import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cambio da rua',
  description: 'Create By Garcia Bernardino',
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
