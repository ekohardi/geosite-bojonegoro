import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Geopark Kedung Lantung | Bojonegoro',
  description: 'Menjelajahi warisan geologi Kedung Lantung, Geopark Bojonegoro.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>
}
