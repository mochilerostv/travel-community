import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { priceId, successUrl, cancelUrl } = body

    // Verificar que Stripe esté configurado
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Stripe no configurado",
        },
        { status: 500 },
      )
    }

    // Simular creación de sesión de checkout
    // En producción, aquí usarías la API real de Stripe
    const mockSession = {
      id: "cs_test_" + Math.random().toString(36).substr(2, 9),
      url: successUrl || "https://example.com/success",
      payment_status: "unpaid",
      created: Math.floor(Date.now() / 1000),
    }

    return NextResponse.json({
      success: true,
      sessionId: mockSession.id,
      url: mockSession.url,
      message: "Sesión de checkout creada (modo demo)",
    })
  } catch (error) {
    console.error("Checkout session error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error creando sesión",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint de checkout activo",
    methods: ["POST"],
    stripe_configured: !!process.env.STRIPE_SECRET_KEY,
    timestamp: new Date().toISOString(),
  })
}
