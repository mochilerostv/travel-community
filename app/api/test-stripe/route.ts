import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function GET() {
  try {
    // Verificar conexión con Stripe
    const prices = await stripe.prices.list({ limit: 10 })

    return NextResponse.json({
      success: true,
      message: "Stripe configurado correctamente",
      priceIds: {
        premium: process.env.STRIPE_PREMIUM_PRICE_ID,
        premium_plus: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID,
      },
      availablePrices: prices.data.map((price) => ({
        id: price.id,
        amount: price.unit_amount,
        currency: price.currency,
        product: price.product,
      })),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
