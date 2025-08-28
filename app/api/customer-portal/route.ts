import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(req: NextRequest) {
  try {
    const { customerId, returnUrl } = await req.json()

    // Verificar que tenemos Stripe configurado
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "Stripe no configurado",
        },
        { status: 500 },
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
        message: "Error creando portal del cliente",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint del portal del cliente Stripe",
    methods: ["POST"],
    requiredFields: ["customerId"],
    optionalFields: ["returnUrl"],
    timestamp: new Date().toISOString(),
  })
}
