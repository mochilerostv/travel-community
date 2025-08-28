import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TravelDeals Pro - Ofertas Exclusivas de Viaje",
  description:
    "Descubre las mejores ofertas de vuelos, hoteles y seguros de viaje. Únete a nuestra comunidad premium y ahorra hasta un 80% en tus próximos viajes.",
  keywords: "ofertas viaje, vuelos baratos, hoteles descuento, seguros viaje, comunidad viajeros",
  authors: [{ name: "TravelDeals Pro" }],
  openGraph: {
    title: "TravelDeals Pro - Ofertas Exclusivas de Viaje",
    description:
      "Únete a nuestra comunidad premium y accede a ofertas de viaje que no encontrarás en ningún otro lugar.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelDeals Pro - Ofertas Exclusivas de Viaje",
    description: "Descubre las mejores ofertas de vuelos, hoteles y seguros de viaje.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
