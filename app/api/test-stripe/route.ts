import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function GET() {
  try {
    // Test de conexión básica
    const products = await stripe.products.list({ limit: 10 })
    const prices = await stripe.prices.list({ limit: 10 })

    // Verificar variables de entorno
    const envVars = {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? "✅ Configurada" : "❌ No configurada",
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        ? "✅ Configurada"
        : "❌ No configurada",
      STRIPE_PREMIUM_MONTHLY_PRICE_ID: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID
        ? "✅ Configurada"
        : "❌ No configurada",
      STRIPE_PREMIUM_YEARLY_PRICE_ID: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID
        ? "✅ Configurada"
        : "❌ No configurada",
      STRIPE_PREMIUM_PLUS_MONTHLY_PRICE_ID: process.env.STRIPE_PREMIUM_PLUS_MONTHLY_PRICE_ID
        ? "✅ Configurada"
        : "❌ No configurada",
      STRIPE_PREMIUM_PLUS_YEARLY_PRICE_ID: process.env.STRIPE_PREMIUM_PLUS_YEARLY_PRICE_ID
        ? "✅ Configurada"
        : "❌ No configurada",
    }

    return NextResponse.json({
      status: "✅ Conexión con Stripe exitosa",
      environment: process.env.NODE_ENV || "development",
      envVars,
      products: products.data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
      })),
      prices: prices.data.map((p) => ({
        id: p.id,
        product: p.product,
        unit_amount: p.unit_amount,
        currency: p.currency,
        recurring: p.recurring,
      })),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "❌ Error conectando con Stripe",
        error: error.message,
        environment: process.env.NODE_ENV || "development",
      },
      { status: 500 },
    )
  }
}
