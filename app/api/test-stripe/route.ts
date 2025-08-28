import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function GET() {
  try {
    // Verificar configuración básica
    const config = {
      stripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
      stripeSecretKeyPreview: process.env.STRIPE_SECRET_KEY
        ? `${process.env.STRIPE_SECRET_KEY.substring(0, 12)}...`
        : "NOT_SET",
      premiumPriceId: process.env.STRIPE_PREMIUM_PRICE_ID || "NOT_SET",
      premiumPlusPriceId: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID || "NOT_SET",
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "NOT_SET",
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        ? `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 12)}...`
        : "NOT_SET",
    }

    // Si no hay clave de Stripe, retornar error
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        success: false,
        error: "STRIPE_SECRET_KEY no configurado",
        config,
        instructions: "Necesitas configurar STRIPE_SECRET_KEY en tu archivo .env.local",
      })
    }

    // Inicializar Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    })

    // Probar conexión con Stripe
    const account = await stripe.accounts.retrieve()

    // Verificar si los Price IDs son válidos
    const priceValidation = {
      premium: {
        id: process.env.STRIPE_PREMIUM_PRICE_ID,
        isPlaceholder: process.env.STRIPE_PREMIUM_PRICE_ID?.includes("tu_price_id") || false,
        isValid: process.env.STRIPE_PREMIUM_PRICE_ID?.startsWith("price_") || false,
      },
      premium_plus: {
        id: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID,
        isPlaceholder: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID?.includes("tu_price_id") || false,
        isValid: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID?.startsWith("price_") || false,
      },
    }

    return NextResponse.json({
      success: true,
      message: "Stripe configurado correctamente",
      config,
      priceValidation,
      stripeAccount: {
        id: account.id,
        country: account.country,
        email: account.email,
        type: account.type,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
      },
      nextSteps:
        priceValidation.premium.isPlaceholder || priceValidation.premium_plus.isPlaceholder
          ? "❌ Necesitas crear productos en Stripe Dashboard y actualizar los Price IDs"
          : "✅ Configuración completa - los botones de checkout deberían funcionar",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        config: {
          stripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
          stripeSecretKeyPreview: process.env.STRIPE_SECRET_KEY
            ? `${process.env.STRIPE_SECRET_KEY.substring(0, 12)}...`
            : "NOT_SET",
          premiumPriceId: process.env.STRIPE_PREMIUM_PRICE_ID || "NOT_SET",
          premiumPlusPriceId: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID || "NOT_SET",
          baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "NOT_SET",
        },
        instructions: "Revisa tu configuración de Stripe y las variables de entorno",
      },
      { status: 500 },
    )
  }
}
