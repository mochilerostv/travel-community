import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TravelDeals Pro - Los mejores chollos de viajes detectados por IA",
  description:
    "Nuestra IA escanea miles de vuelos y hoteles cada minuto para encontrar errores de tarifa y ofertas increíbles. Únete a más de 10,000 viajeros que ahorran hasta un 70% en sus viajes.",
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
