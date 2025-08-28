import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { plan, billing, successUrl, cancelUrl } = await request.json()

    console.log("🚀 Creating checkout session for plan:", plan, "billing:", billing)

    // Verificar que tenemos las claves de Stripe
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("❌ STRIPE_SECRET_KEY not found")
      return NextResponse.json({ error: "Stripe no configurado" }, { status: 500 })
    }

    // Mapear planes a Price IDs
    const priceIds = {
      premium: process.env.STRIPE_PREMIUM_PRICE_ID,
      premium_plus: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID,
    }

    const priceId = priceIds[plan as keyof typeof priceIds]

    console.log("💰 Using price ID:", priceId)

    if (!priceId || priceId.includes("tu_price_id")) {
      console.error("❌ Invalid price ID:", priceId)
      return NextResponse.json(
        {
          error: "Price ID no configurado correctamente. Ve a Stripe Dashboard y configura los productos.",
          debug: {
            plan,
            priceId,
            allPriceIds: priceIds,
          },
        },
        { status: 400 },
      )
    }

    // Crear sesión de checkout
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      customer_creation: "always",
      metadata: {
        plan,
        billing,
      },
    })

    console.log("✅ Checkout session created:", session.id)
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("❌ Error creating checkout session:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint de creación de sesiones de checkout",
    methods: ["POST"],
    requiredFields: ["plan"],
    optionalFields: ["billing", "successUrl", "cancelUrl"],
    stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
    priceIds: {
      premium: process.env.STRIPE_PREMIUM_PRICE_ID ? "configured" : "missing",
      premium_plus: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID ? "configured" : "missing",
    },
    timestamp: new Date().toISOString(),
  })
}
