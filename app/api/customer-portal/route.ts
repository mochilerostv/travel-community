import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerId } = body

    if (!customerId) {
      return NextResponse.json(
        { success: false, message: 'Customer ID is required' },
        { status: 400 }
      )
    }

    // Create customer portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    })

    return NextResponse.json({
      success: true,
      url: portalSession.url,
    })

  } catch (error) {
    console.error('Error creating customer portal session:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error creando sesión del portal de cliente' 
      },
      { status: 500 }
    )
  }
}
