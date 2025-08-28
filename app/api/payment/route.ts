import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const { plan, email, successUrl, cancelUrl } = await request.json()

    // Validar plan
    if (!plan || !["premium", "premium_plus"].includes(plan)) {
      return NextResponse.json({ error: "Plan no válido" }, { status: 400 })
    }

    // Obtener Price ID según el plan
    const priceIds = {
      premium: process.env.STRIPE_PREMIUM_PRICE_ID,
      premium_plus: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID,
    }

    const priceId = priceIds[plan as keyof typeof priceIds]

    if (!priceId) {
      return NextResponse.json({ error: "Price ID no configurado para este plan" }, { status: 500 })
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
      customer_email: email,
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata: {
        plan,
        email: email || "",
      },
      subscription_data: {
        metadata: {
          plan,
          email: email || "",
        },
      },
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error("Error creating payment session:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint de pagos",
    methods: ["POST"],
    requiredFields: ["plan"],
    optionalFields: ["email", "successUrl", "cancelUrl"],
    availablePlans: ["premium", "premium_plus"],
    timestamp: new Date().toISOString(),
  })
}
