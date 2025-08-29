import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function GET() {
  try {
    // Verificar configuración de variables de entorno
    const envVars = {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? "✅ Configurada" : "❌ No configurada",
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        ? "✅ Configurada"
        : "❌ No configurada",
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    }

    // Obtener productos de Stripe
    const products = await stripe.products.list({ limit: 10 })
    const prices = await stripe.prices.list({ limit: 20 })

    return NextResponse.json({
      status: "✅ Conexión con Stripe exitosa",
      environment: process.env.NODE_ENV,
      envVars,
      products: products.data.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
      })),
      prices: prices.data.map((price) => ({
        id: price.id,
        product: price.product,
        unit_amount: price.unit_amount,
        currency: price.currency,
        recurring: price.recurring,
      })),
    })
  } catch (error) {
    console.error("Error en test de Stripe:", error)
    return NextResponse.json(
      {
        status: "❌ Error conectando con Stripe",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
