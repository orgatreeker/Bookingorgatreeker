import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '50/30/20 Budgeting Sheet',
  description: 'Transform your financial life with clarity, not chaos. Master the proven 50/30/20 budgeting method.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
