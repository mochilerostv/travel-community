"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Plane, ArrowLeft, Star, Crown } from "lucide-react"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (priceId: string) => {
    setLoading(priceId)
    try {
      console.log("Iniciando checkout para Price ID:", priceId)

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await response.json()
      console.log("Respuesta del servidor:", data)

      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Error: " + (data.error || "No se pudo crear la sesión"))
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error al procesar el pago")
    } finally {
      setLoading(null)
    }
  }

  const plans = {
    premium: {
      name: "Premium",
      description: "Plan básico con todas las funciones esenciales",
      monthly: { price: "€1,99", priceId: "price_1S0wwGG5QzPmCFzEnfW842x5" },
      yearly: { price: "€19,99", priceId: "price_1S0x0NG5QzPmCFzEQJvQvQvQ", savings: "17%" },
      features: [
        "Alertas de errores de tarifa",
        "Chollos de hoteles verificados",
        "Filtros por continente",
        "Acceso a comunidad",
        "Soporte por email",
      ],
      icon: Star,
    },
    premium_plus: {
      name: "Premium Plus",
      description: "Plan completo con funciones avanzadas",
      monthly: { price: "€2,49", priceId: "price_1S0wwzG5QzPmCFzEvMFd07Hg" },
      yearly: { price: "€24,99", priceId: "price_1S0x0hG5QzPmCFzEabcdEFGH", savings: "17%" },
      features: [
        "Todo lo de Premium",
        "Alertas prioritarias",
        "Más destinos y horarios",
        "Análisis de tendencias",
        "Soporte prioritario 24/7",
        "Acceso beta a nuevas funciones",
      ],
      popular: true,
      icon: Crown,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Travel Community</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Inicio
            </Link>
            <Link href="/pricing" className="text-blue-600 font-medium">
              Precios
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
          </nav>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Link>
          </Button>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              💎 Planes Premium
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Elige tu plan perfecto</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Accede a ofertas exclusivas de viaje que no encontrarás en ningún otro lugar. Ahorra miles de euros en tus
              próximas vacaciones.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm ${billingCycle === "monthly" ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                Mensual
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm ${billingCycle === "yearly" ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                Anual
              </span>
              {billingCycle === "yearly" && (
                <Badge variant="destructive" className="ml-2">
                  Ahorra 17%
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Object.entries(plans).map(([key, plan]) => {
              const Icon = plan.icon
              const price = billingCycle === "monthly" ? plan.monthly.price : plan.yearly.price
              const priceId = billingCycle === "monthly" ? plan.monthly.priceId : plan.yearly.priceId

              return (
                <Card key={key} className={`relative ${plan.popular ? "border-blue-500 border-2" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white">Más Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div
                      className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                        plan.popular ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <Icon className={`h-8 w-8 ${plan.popular ? "text-blue-600" : "text-gray-600"}`} />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">{price}</span>
                      <span className="text-gray-500">/{billingCycle === "monthly" ? "mes" : "año"}</span>
                      {billingCycle === "yearly" && plan.yearly.savings && (
                        <div className="text-sm text-green-600 font-medium mt-1">Ahorras {plan.yearly.savings}</div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                      size="lg"
                      onClick={() => handleSubscribe(priceId)}
                      disabled={loading !== null}
                    >
                      {loading === priceId ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Procesando...
                        </div>
                      ) : (
                        `Comenzar con ${plan.name}`
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Cancela en cualquier momento. Sin compromisos.
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Preguntas Frecuentes</h2>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">¿Puedo cancelar mi suscripción en cualquier momento?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de control. No hay
                    penalizaciones ni compromisos a largo plazo.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">¿Qué tipo de ofertas puedo esperar?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nuestras ofertas incluyen vuelos, hoteles, paquetes vacacionales, cruceros y experiencias únicas.
                    Los miembros Premium Plus tienen acceso a ofertas VIP exclusivas con descuentos de hasta el 80%.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">¿Hay algún descuento por pago anual?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sí, al elegir el plan anual ahorras un 17% comparado con el pago mensual. Es la mejor opción para
                    viajeros frecuentes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">¿Cómo funcionan las alertas personalizadas?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Puedes configurar alertas basadas en destinos, fechas, presupuesto y tipo de viaje. Te notificaremos
                    instantáneamente cuando aparezcan ofertas que coincidan con tus criterios.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold">Travel Community</span>
          </div>
          <p className="text-gray-400 mb-4">Tu compañero de confianza para encontrar las mejores ofertas de viaje.</p>
          <p className="text-gray-500 text-sm">&copy; 2024 Travel Community. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
