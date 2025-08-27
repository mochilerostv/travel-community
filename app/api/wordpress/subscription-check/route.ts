import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, user_id } = body

    if (!email && !user_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Email o user_id requerido",
        },
        { status: 400 },
      )
    }

    // Simular verificación de suscripción
    // En producción, aquí consultarías Stripe o tu base de datos
    const mockSubscription = {
      active: true,
      plan: "premium",
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      features: ["ai_extraction", "premium_deals", "alerts"],
    }

    return NextResponse.json({
      success: true,
      subscription: mockSubscription,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Subscription check error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error verificando suscripción",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint de verificación de suscripción activo",
    methods: ["POST"],
    timestamp: new Date().toISOString(),
  })
}
