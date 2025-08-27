import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')!

    let event: any

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        await handleSuccessfulPayment(session)
        break

      case 'customer.subscription.created':
        const subscription = event.data.object
        await handleSubscriptionCreated(subscription)
        break

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object
        await handleSubscriptionUpdated(updatedSubscription)
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object
        await handleSubscriptionCanceled(deletedSubscription)
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object
        await handlePaymentSucceeded(invoice)
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object
        await handlePaymentFailed(failedInvoice)
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleSuccessfulPayment(session: any) {
  try {
    const customerEmail = session.customer_email || session.metadata?.email
    
    // Create user account in database
    // This would typically involve:
    // 1. Creating user record
    // 2. Setting subscription status to active
    // 3. Sending welcome email
    
    console.log('Payment successful for:', customerEmail)
    
    // Example database operation (replace with your actual DB logic)
    /*
    await db.user.create({
      data: {
        email: customerEmail,
        stripeCustomerId: session.customer,
        subscriptionStatus: 'active',
        subscriptionStart: new Date(),
        subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      }
    })
    */

  } catch (error) {
    console.error('Error handling successful payment:', error)
  }
}

async function handleSubscriptionCreated(subscription: any) {
  try {
    console.log('Subscription created:', subscription.id)
    
    // Update user subscription status
    /*
    await db.user.update({
      where: { stripeCustomerId: subscription.customer },
      data: {
        subscriptionStatus: 'active',
        stripeSubscriptionId: subscription.id,
      }
    })
    */

  } catch (error) {
    console.error('Error handling subscription created:', error)
  }
}

async function handleSubscriptionUpdated(subscription: any) {
  try {
    console.log('Subscription updated:', subscription.id)
    
    // Update subscription details
    /*
    await db.user.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        subscriptionStatus: subscription.status,
      }
    })
    */

  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

async function handleSubscriptionCanceled(subscription: any) {
  try {
    console.log('Subscription canceled:', subscription.id)
    
    // Update user status to canceled
    /*
    await db.user.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        subscriptionStatus: 'canceled',
        subscriptionEnd: new Date(),
      }
    })
    */

  } catch (error) {
    console.error('Error handling subscription canceled:', error)
  }
}

async function handlePaymentSucceeded(invoice: any) {
  try {
    console.log('Payment succeeded for invoice:', invoice.id)
    
    // Record successful payment
    /*
    await db.payment.create({
      data: {
        stripeInvoiceId: invoice.id,
        amount: invoice.amount_paid / 100, // Convert from cents
        currency: invoice.currency,
        status: 'completed',
        paymentDate: new Date(invoice.created * 1000),
      }
    })
    */

  } catch (error) {
    console.error('Error handling payment succeeded:', error)
  }
}

async function handlePaymentFailed(invoice: any) {
  try {
    console.log('Payment failed for invoice:', invoice.id)
    
    // Handle failed payment (send notification, update status, etc.)
    /*
    await db.user.update({
      where: { stripeCustomerId: invoice.customer },
      data: {
        subscriptionStatus: 'past_due',
      }
    })
    */

  } catch (error) {
    console.error('Error handling payment failed:', error)
  }
}
