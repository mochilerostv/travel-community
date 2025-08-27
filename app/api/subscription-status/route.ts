import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')
    const customerId = searchParams.get('customer_id')

    if (sessionId) {
      // Get session details
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      
      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        
        return NextResponse.json({
          success: true,
          data: {
            subscriptionId: subscription.id,
            customerId: subscription.customer,
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          }
        })
      }
    }

    if (customerId) {
      // Get customer subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
        limit: 1,
      })

      if (subscriptions.data.length > 0) {
        const subscription = subscriptions.data[0]
        
        return NextResponse.json({
          success: true,
          data: {
            subscriptionId: subscription.id,
            customerId: subscription.customer,
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          }
        })
      }
    }

    return NextResponse.json(
      { success: false, message: 'No subscription found' },
      { status: 404 }
    )

  } catch (error) {
    console.error('Error getting subscription status:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error obteniendo estado de suscripción' 
      },
      { status: 500 }
    )
  }
}
