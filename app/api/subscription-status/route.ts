import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(req: NextRequest) {
  try {
    const { customerId, email } = await req.json()

    // Verificar que tenemos Stripe configurado
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        success: true,
        subscription: {
          active: false,
          plan: null,
          message: "Stripe no configurado - modo demo",
        },
      })
    }

    let customer: Stripe.Customer | null = null

    // Buscar cliente por ID o email
    if (customerId) {
      try {
        customer = (await stripe.customers.retrieve(customerId)) as Stripe.Customer
      } catch (error) {
        console.log("Cliente no encontrado por ID:", customerId)
      }
    }

    if (!customer && email) {
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      })
      customer = customers.data[0] || null
    }

    if (!customer) {
      return NextResponse.json({
        success: true,
        subscription: {
          active: false,
          plan: null,
          message: "Cliente no encontrado",
        },
      })
    }

    // Obtener suscripciones del cliente
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    })

    const activeSubscription = subscriptions.data[0]

    if (!activeSubscription) {
      return NextResponse.json({
        success: true,
        subscription: {
          active: false,
          plan: null,
          message: "Sin suscripción activa",
        },
      })
    }

    // Obtener detalles del plan
    const priceId = activeSubscription.items.data[0]?.price.id
    let planName = "unknown"

    if (priceId === process.env.STRIPE_PRICE_ID_PREMIUM_MONTHLY) {
      planName = "premium"
    } else if (priceId === process.env.STRIPE_PRICE_ID_PREMIUM_PLUS_MONTHLY) {
      planName = "premium_plus"
    }

    return NextResponse.json({
      success: true,
      subscription: {
        active: true,
        plan: planName,
        customerId: customer.id,
        subscriptionId: activeSubscription.id,
        currentPeriodEnd: new Date(activeSubscription.current_period_end * 1000).toISOString(),
        status: activeSubscription.status,
        message: "Suscripción activa",
      },
    })
  } catch (error) {
    console.error("Subscription status error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error verificando suscripción",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint de estado de suscripción",
    methods: ["POST"],
    requiredFields: ["customerId o email"],
    timestamp: new Date().toISOString(),
  })
}
