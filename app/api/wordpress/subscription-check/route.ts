import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Search for customer by email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    })

    if (customers.data.length === 0) {
      return NextResponse.json({
        success: true,
        data: { hasSubscription: false, status: 'no_customer' }
      })
    }

    const customer = customers.data[0]

    // Get active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    })

    const hasActiveSubscription = subscriptions.data.length > 0

    return NextResponse.json({
      success: true,
      data: {
        hasSubscription: hasActiveSubscription,
        status: hasActiveSubscription ? 'active' : 'inactive',
        customerId: customer.id,
        subscriptionId: hasActiveSubscription ? subscriptions.data[0].id : null
      }
    })

  } catch (error) {
    console.error('Error checking WordPress subscription:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error checking subscription status' 
      },
      { status: 500 }
    )
  }
}
