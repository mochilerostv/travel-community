import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TravelDeals Pro - Los mejores chollos de viajes detectados por IA",
  description:
    "Únete a nuestra comunidad premium y recibe alertas instantáneas de errores de tarifa, ofertas de hoteles y chollos verificados por nuestro equipo.",
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
