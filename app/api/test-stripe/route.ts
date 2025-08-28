import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function GET() {
  try {
    console.log("🔍 Testing Stripe configuration...")

    // Verificar claves
    const hasSecretKey = !!process.env.STRIPE_SECRET_KEY
    const hasPublishableKey = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    const hasPremiumPriceId = !!process.env.STRIPE_PREMIUM_PRICE_ID
    const hasPremiumPlusPriceId = !!process.env.STRIPE_PREMIUM_PLUS_PRICE_ID

    console.log("🔑 Keys status:", {
      hasSecretKey,
      hasPublishableKey,
      hasPremiumPriceId,
      hasPremiumPlusPriceId,
    })

    if (!hasSecretKey) {
      return NextResponse.json(
        {
          success: false,
          error: "STRIPE_SECRET_KEY no encontrada",
          debug: { hasSecretKey, hasPublishableKey, hasPremiumPriceId, hasPremiumPlusPriceId },
        },
        { status: 500 },
      )
    }

    // Probar conexión con Stripe
    const prices = await stripe.prices.list({ limit: 3 })
    console.log("💰 Found prices:", prices.data.length)

    // Verificar Price IDs específicos
    const priceIds = {
      premium: process.env.STRIPE_PREMIUM_PRICE_ID,
      premium_plus: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID,
    }

    const priceValidation = {}
    for (const [plan, priceId] of Object.entries(priceIds)) {
      if (priceId) {
        try {
          const price = await stripe.prices.retrieve(priceId)
          priceValidation[plan] = {
            valid: true,
            id: price.id,
            amount: price.unit_amount,
            currency: price.currency,
            interval: price.recurring?.interval,
          }
          console.log(`✅ ${plan} price valid:`, price.id)
        } catch (error) {
          priceValidation[plan] = {
            valid: false,
            error: error instanceof Error ? error.message : "Unknown error",
          }
          console.error(`❌ ${plan} price invalid:`, error)
        }
      } else {
        priceValidation[plan] = { valid: false, error: "Price ID not configured" }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Stripe configuration test",
      stripe: {
        connected: true,
        totalPrices: prices.data.length,
      },
      keys: {
        hasSecretKey,
        hasPublishableKey,
        hasPremiumPriceId,
        hasPremiumPlusPriceId,
      },
      priceValidation,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Stripe test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error connecting to Stripe",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
