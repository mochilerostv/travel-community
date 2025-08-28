"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Plane, Check, ArrowLeft, Zap, ShieldCheck, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type PlanKey = "premium" | "premium_plus"
type Billing = "annual" | "monthly"

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("annual")
  const [loadingPlan, setLoadingPlan] = useState<PlanKey | null>(null)

  const plans = useMemo(() => {
    return {
      premium: {
        name: "Premium",
        monthly: "€1,99",
        annual: "€1,99",
        annualLabel: "Cobro anual: €23,88",
        monthlyLabel: "Cobro mensual: €1,99",
        gradient: "from-blue-500 to-cyan-500",
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
        monthly: "€2,49",
        annual: "€2,49",
        annualLabel: "Cobro anual: €29,88",
        monthlyLabel: "Cobro mensual: €2,49",
        gradient: "from-emerald-500 to-teal-500",
        features: ["Todo lo de Premium", "Alertas prioritarias", "Más destinos y horarios", "Soporte prioritario 24/7"],
        badge: "Recomendado",
      },
    } as const
  }, [])

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
          billing,
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
      <div className="container mx-auto max-w-5xl">
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
          <p className="text-gray-600">Precios mostrados por mes. Puedes elegir facturación mensual o anual.</p>

          <div className="mt-5 inline-flex items-center gap-1 rounded-full bg-white p-1 shadow">
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                billing === "monthly" ? "bg-blue-600 text-white" : "text-gray-700",
              )}
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
            >
              Mensual
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                billing === "annual" ? "bg-blue-600 text-white" : "text-gray-700",
              )}
              onClick={() => setBilling("annual")}
              aria-pressed={billing === "annual"}
            >
              Anual
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Con anual evitas cargos mensuales. Impuestos pueden aplicar según país.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {(Object.keys(plans) as PlanKey[]).map((key) => {
            const p = plans[key]
            return (
              <Card key={key} className={cn("shadow-xl border-2", key === "premium_plus" && "border-emerald-200")}>
                <CardHeader className="text-center">
                  {p.badge && (
                    <Badge
                      className={cn(
                        "w-fit mx-auto mb-2",
                        key === "premium_plus" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800",
                      )}
                    >
                      {p.badge}
                    </Badge>
                  )}
                  <CardTitle className="text-2xl">{p.name}</CardTitle>
                  <CardDescription>{billing === "annual" ? p.annualLabel : p.monthlyLabel}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={cn("rounded-xl p-6 bg-gradient-to-br text-white text-center mb-6", p.gradient)}>
                    <div className="text-6xl font-extrabold leading-none">
                      {billing === "annual" ? p.annual : p.monthly}
                    </div>
                    <div className="opacity-90 mt-1">/mes</div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-gray-700">
                        <Check className="h-5 w-5 text-emerald-600" />
                        <span>{f}</span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2 text-blue-600">
                <Zap className="h-5 w-5" />
                <CardTitle className="text-base">Detección con IA</CardTitle>
              </div>
              <CardDescription>Encontramos errores de tarifa y chollos 24/7</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
                <CardTitle className="text-base">Ofertas verificadas</CardTitle>
              </div>
              <CardDescription>Equipo humano valida cada oferta</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2 text-orange-600">
                <Bell className="h-5 w-5" />
                <CardTitle className="text-base">Alertas personalizadas</CardTitle>
              </div>
              <CardDescription>Por aeropuerto de salida y destinos</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">¿Qué incluye tu membresía?</CardTitle>
            <CardDescription>Acceso completo a las mejores ofertas detectadas por IA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  Errores de tarifa y chollos verificados
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  Alertas por aeropuerto y continente
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  Comunidad privada de viajeros
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  IA de detección 24/7
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  Soporte y cancelación en cualquier momento
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  Garantía de devolución 30 días
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          Procesado de forma segura por Stripe • Impuestos pueden variar por país • Puedes cancelar cuando quieras
        </div>
      </div>
    </div>
  )
}
