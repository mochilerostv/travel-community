"use client"

import { useState } from "react"
import Link from "next/link"
import { Plane, Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type PlanKey = "premium" | "premium_plus"

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<PlanKey | null>(null)

  const plans = {
    premium: {
      name: "Premium",
      price: "€1,99",
      description: "Cobro mensual: €1,99",
      features: [
        "Alertas de errores de tarifa",
        "Chollos de hoteles verificados",
        "Filtros por continente y aeropuerto",
        "Acceso a comunidad",
      ],
      badge: "Mejor relación calidad/precio",
    },
    premium_plus: {
      name: "Premium Plus",
      price: "€2,49",
      description: "Cobro mensual: €2,49",
      features: ["Todo lo de Premium", "Alertas prioritarias", "Más destinos y horarios", "Soporte prioritario 24/7"],
      badge: "Recomendado",
    },
  }

  const subscribe = async (plan: PlanKey) => {
    try {
      setLoadingPlan(plan)
      console.log("🔄 Iniciando suscripción para plan:", plan)

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
          billing: "monthly",
          successUrl: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      })

      console.log("📡 Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Response not OK:", errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log("📦 Response data:", data)

      if (data?.url) {
        console.log("✅ Redirigiendo a Stripe:", data.url)
        window.location.href = data.url
      } else {
        console.error("❌ No checkout URL returned", data)
        const errorMessage = data.error || data.details || "Error desconocido"
        alert(`No se pudo iniciar el checkout. ${errorMessage}`)
      }
    } catch (error) {
      console.error("❌ Error en suscripción:", error)
      alert(`Error iniciando el checkout: ${error instanceof Error ? error.message : "Error desconocido"}`)
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">TravelDeals Pro</h1>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Escoge tu plan</h2>
          <p className="text-gray-600">Precios mostrados por mes. Facturación mensual.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {(Object.keys(plans) as PlanKey[]).map((key) => {
            const plan = plans[key]
            return (
              <Card key={key} className="shadow-xl border-2 hover:border-blue-200 transition-colors">
                <CardHeader className="text-center">
                  {plan.badge && <Badge className="w-fit mx-auto mb-2 bg-blue-100 text-blue-800">{plan.badge}</Badge>}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-center mb-6">
                    <div className="text-6xl font-extrabold leading-none">{plan.price}</div>
                    <div className="opacity-90 mt-1">/mes</div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-700">
                        <Check className="h-5 w-5 text-emerald-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full py-6 text-lg"
                    onClick={() => subscribe(key)}
                    disabled={loadingPlan !== null}
                    variant={key === "premium_plus" ? "default" : "secondary"}
                  >
                    {loadingPlan === key ? "Redirigiendo…" : "Suscríbete aquí"}
                  </Button>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Pasarás a Stripe para completar el pago de forma segura.
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center text-sm text-gray-500">
          Procesado de forma segura por Stripe • Impuestos pueden variar por país • Puedes cancelar cuando quieras
        </div>
      </div>
    </div>
  )
}
