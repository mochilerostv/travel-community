import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, subscription_id } = await request.json()

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email requerido",
        },
        { status: 400 },
      )
    }

    // Simulación de verificación de suscripción
    // En producción, aquí verificarías con Stripe o tu base de datos
    const mockSubscription = {
      email,
      subscription_id: subscription_id || `sub_${Math.random().toString(36).substr(2, 9)}`,
      status: "active",
      plan: "premium",
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      features: {
        premium_deals: true,
        ai_alerts: true,
        community_access: true,
        api_access: true,
      },
    }

    return NextResponse.json({
      success: true,
      subscription: mockSubscription,
      message: "Suscripción verificada",
    })
  } catch (error) {
    console.error("Subscription check error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error verificando suscripción",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint de verificación de suscripciones",
    methods: ["POST"],
    requiredFields: ["email"],
    optionalFields: ["subscription_id"],
    timestamp: new Date().toISOString(),
  })
}
