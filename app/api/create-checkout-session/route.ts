import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { priceId, email, successUrl, cancelUrl } = await request.json()

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "Stripe no configurado",
        },
        { status: 500 },
      )
    }

    if (!priceId) {
      return NextResponse.json(
        {
          success: false,
          message: "Price ID requerido",
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
      customer_email: email,
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      metadata: {
        email: email || "",
        plan: priceId.includes("premium_plus") ? "premium_plus" : "premium",
      },
      subscription_data: {
        metadata: {
          email: email || "",
          plan: priceId.includes("premium_plus") ? "premium_plus" : "premium",
        },
      },
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error("Checkout session error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Error creando sesión de pago",
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
    requiredFields: ["priceId"],
    optionalFields: ["email", "successUrl", "cancelUrl"],
    timestamp: new Date().toISOString(),
  })
}
