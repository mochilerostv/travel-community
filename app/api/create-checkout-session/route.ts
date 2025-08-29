import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json()

    console.log("Recibido Price ID:", priceId)

    if (!priceId) {
      console.error("Price ID no proporcionado")
      return NextResponse.json({ error: "Price ID es requerido" }, { status: 400 })
    }

    console.log("Creando sesión de checkout...")

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata: {
        priceId: priceId,
      },
    })

    console.log("Sesión creada exitosamente:", session.id)
    console.log("URL de checkout:", session.url)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creando sesión de checkout:", error)
    return NextResponse.json(
      {
        error: "Error creando sesión de checkout",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
