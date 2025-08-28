import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json()

    console.log("Plan solicitado:", plan)

    // Price IDs de tus productos en Stripe
    const prices = {
      premium: process.env.STRIPE_PREMIUM_PRICE_ID,
      premium_plus: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID,
    }

    const priceId = prices[plan as keyof typeof prices]

    if (!priceId) {
      return NextResponse.json({ error: "Plan no válido" }, { status: 400 })
    }

    console.log("Price ID:", priceId)

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    })

    console.log("Sesión creada:", session.id)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Error creando sesión" }, { status: 500 })
  }
}
