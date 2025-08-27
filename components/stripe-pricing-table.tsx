"use client"

import { useEffect } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': any
    }
  }
}

interface StripePricingTableProps {
  pricingTableId: string
  publishableKey: string
  customerEmail?: string
}

export function StripePricingTable({ 
  pricingTableId, 
  publishableKey, 
  customerEmail 
}: StripePricingTableProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/pricing-table.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <stripe-pricing-table
      pricing-table-id={pricingTableId}
      publishable-key={publishableKey}
      customer-email={customerEmail}
    />
  )
}
