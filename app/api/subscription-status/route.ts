import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId, customerId, subscriptionId } = await request.json()

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        success: false,
        message: "Stripe no configurado",
        subscription: null,
      })
    }

    let subscription = null

    if (sessionId) {
      // Obtener suscripción desde session ID
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.subscription) {
        subscription = await stripe.subscriptions.retrieve(session.subscription as string)
      }
    } else if (subscriptionId) {
      // Obtener suscripción directamente
      subscription = await stripe.subscriptions.retrieve(subscriptionId)
    } else if (customerId) {
      // Obtener suscripciones del cliente
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
      })
      subscription = subscriptions.data[0] || null
    }

    if (!subscription) {
      return NextResponse.json({
        success: false,
        message: "Suscripción no encontrada",
        subscription: null,
      })
    }

    // Formatear datos de la suscripción
    const subscriptionData = {
      id: subscription.id,
      status: subscription.status,
      customerId: subscription.customer,
      currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
      plan: {
        id: subscription.items.data[0]?.price.id,
        amount: subscription.items.data[0]?.price.unit_amount,
        currency: subscription.items.data[0]?.price.currency,
        interval: subscription.items.data[0]?.price.recurring?.interval,
      },
      metadata: subscription.metadata,
    }

    return NextResponse.json({
      success: true,
      subscription: subscriptionData,
    })
  } catch (error) {
    console.error("Subscription status error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Error obteniendo estado de suscripción",
        subscription: null,
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
    requiredFields: ["sessionId OR customerId OR subscriptionId"],
    timestamp: new Date().toISOString(),
  })
}
