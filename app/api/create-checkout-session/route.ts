import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(req: NextRequest) {
  try {
    const { priceId, email, successUrl, cancelUrl } = await req.json()

    // Verificar que tenemos Stripe configurado
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "Stripe no configurado - añade STRIPE_SECRET_KEY",
        },
        { status: 500 },
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
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
      metadata: {
        email,
        priceId,
      },
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error creando sesión de pago",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint de checkout Stripe",
    methods: ["POST"],
    requiredFields: ["priceId"],
    optionalFields: ["email", "successUrl", "cancelUrl"],
    timestamp: new Date().toISOString(),
  })
}
