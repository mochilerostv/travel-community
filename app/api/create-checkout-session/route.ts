import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, priceId, successUrl, cancelUrl, plan, billing } = body

    // Helper: pick price from env by plan and billing
    function resolvePriceId(): string | undefined {
      if (priceId) return priceId
      const bill = (billing === 'monthly' ? 'MONTHLY' : 'ANNUAL') as 'ANNUAL' | 'MONTHLY'
      const p = (plan || 'premium') as 'premium' | 'premium_plus'
      if (p === 'premium_plus') {
        return (
          (bill === 'ANNUAL' ? process.env.STRIPE_PRICE_ID_PREMIUM_PLUS_ANNUAL : process.env.STRIPE_PRICE_ID_PREMIUM_PLUS_MONTHLY) ||
          process.env.STRIPE_PRICE_ID_PREMIUM_PLUS ||
          process.env.STRIPE_PRICE_ID
        )
      }
      // premium (default)
      return (
        (bill === 'ANNUAL' ? process.env.STRIPE_PRICE_ID_PREMIUM_ANNUAL : process.env.STRIPE_PRICE_ID_PREMIUM_MONTHLY) ||
        process.env.STRIPE_PRICE_ID_PREMIUM ||
        process.env.STRIPE_PRICE_ID
      )
    }

    const chosenPrice = resolvePriceId()
    if (!chosenPrice) {
      return NextResponse.json(
        { success: false, message: 'Price ID no configurado. Revisa variables STRIPE_PRICE_ID_*.' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: chosenPrice, quantity: 1 }],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      metadata: { email: email || '', plan: plan || 'premium', billing: billing || 'annual' },
      subscription_data: {
        metadata: { email: email || '', plan: plan || 'premium', billing: billing || 'annual' },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    })

    return NextResponse.json({ success: true, sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { success: false, message: 'Error creando sesión de pago', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
