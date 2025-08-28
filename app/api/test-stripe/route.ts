import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function GET() {
  try {
    console.log("🔍 Testing Stripe configuration...")

    // Verificar claves de Stripe
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          error: "STRIPE_SECRET_KEY not found",
          configured: false,
        },
        { status: 500 },
      )
    }

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      return NextResponse.json(
        {
          error: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY not found",
          configured: false,
        },
        { status: 500 },
      )
    }

    // Verificar Price IDs
    const priceIds = {
      premium: process.env.STRIPE_PREMIUM_PRICE_ID,
      premium_plus: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID,
    }

    console.log("💰 Price IDs:", priceIds)

    // Intentar obtener información de los precios
    const priceChecks = await Promise.allSettled([
      priceIds.premium ? stripe.prices.retrieve(priceIds.premium) : Promise.reject("No premium price ID"),
      priceIds.premium_plus
        ? stripe.prices.retrieve(priceIds.premium_plus)
        : Promise.reject("No premium_plus price ID"),
    ])

    const results = {
      success: true,
      stripe_configured: true,
      environment: process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_") ? "test" : "live",
      price_ids: priceIds,
      price_validation: {
        premium: priceChecks[0].status === "fulfilled" ? "✅ Valid" : `❌ ${priceChecks[0].reason}`,
        premium_plus: priceChecks[1].status === "fulfilled" ? "✅ Valid" : `❌ ${priceChecks[1].reason}`,
      },
      price_details: {
        premium:
          priceChecks[0].status === "fulfilled"
            ? {
                id: priceChecks[0].value.id,
                amount: priceChecks[0].value.unit_amount,
                currency: priceChecks[0].value.currency,
                interval: priceChecks[0].value.recurring?.interval,
              }
            : null,
        premium_plus:
          priceChecks[1].status === "fulfilled"
            ? {
                id: priceChecks[1].value.id,
                amount: priceChecks[1].value.unit_amount,
                currency: priceChecks[1].value.currency,
                interval: priceChecks[1].value.recurring?.interval,
              }
            : null,
      },
      timestamp: new Date().toISOString(),
    }

    console.log("✅ Stripe test results:", results)
    return NextResponse.json(results)
  } catch (error) {
    console.error("❌ Stripe test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        stripe_configured: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
