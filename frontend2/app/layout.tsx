import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hygindust',
  description: 'SARL Hygindust - Your partner in industrial hygiene and safety solutions.',
  generator: 'Bluck',
  icons: {
    icon: '/logo.ico', // Path to your favicon file in the public directory
  },
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
