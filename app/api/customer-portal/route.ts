import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { customerId, returnUrl } = await request.json()

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "Stripe no configurado",
        },
        { status: 500 },
      )
    }

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer ID requerido",
        },
        { status: 400 },
      )
    }

    // Crear sesión del portal del cliente
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    })

    return NextResponse.json({
      success: true,
      url: portalSession.url,
    })
  } catch (error) {
    console.error("Customer portal error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Error creando portal del cliente",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint del portal del cliente",
    methods: ["POST"],
    requiredFields: ["customerId"],
    optionalFields: ["returnUrl"],
    timestamp: new Date().toISOString(),
  })
}
