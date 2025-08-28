import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function GET() {
  try {
    console.log("🔍 Testing Stripe configuration...")

    // Verificar variables de entorno
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const stripePremiumPriceId = process.env.STRIPE_PREMIUM_PRICE_ID
    const stripePremiumPlusPriceId = process.env.STRIPE_PREMIUM_PLUS_PRICE_ID

    console.log("🔑 Stripe Secret Key:", stripeSecretKey ? "✅ Present" : "❌ Missing")
    console.log("💰 Premium Price ID:", stripePremiumPriceId)
    console.log("💎 Premium Plus Price ID:", stripePremiumPlusPriceId)

    if (!stripeSecretKey) {
      return NextResponse.json({
        error: "STRIPE_SECRET_KEY no configurado",
        status: "error",
      })
    }

    // Verificar conexión con Stripe
    const prices = await stripe.prices.list({ limit: 10 })
    console.log(
      "📋 Available prices:",
      prices.data.map((p) => ({ id: p.id, product: p.product })),
    )

    return NextResponse.json({
      status: "success",
      message: "Stripe configurado correctamente",
      config: {
        stripeSecretKey: stripeSecretKey ? "configured" : "missing",
        premiumPriceId: stripePremiumPriceId || "missing",
        premiumPlusPriceId: stripePremiumPlusPriceId || "missing",
      },
      availablePrices: prices.data.map((price) => ({
        id: price.id,
        product: price.product,
        currency: price.currency,
        unit_amount: price.unit_amount,
        recurring: price.recurring,
      })),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Error testing Stripe:", error)
    return NextResponse.json({
      error: "Error conectando con Stripe",
      details: error instanceof Error ? error.message : "Unknown error",
      status: "error",
    })
  }
}
