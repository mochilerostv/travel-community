import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json()

    if (!priceId) {
      return NextResponse.json({ error: "Price ID es requerido" }, { status: 400 })
    }

    console.log("Creando sesión de checkout para Price ID:", priceId)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/pricing?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      customer_creation: "always",
    })

    console.log("Sesión creada exitosamente:", session.id)

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Error creando sesión de checkout:", error)
    return NextResponse.json({ error: "Error creando sesión de checkout", details: error.message }, { status: 500 })
  }
}
