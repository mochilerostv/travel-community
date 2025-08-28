"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const subscribe = async (plan: string) => {
    setLoading(plan)

    try {
      console.log("Iniciando checkout para:", plan)

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Error: " + (data.error || "No se pudo crear la sesión"))
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error iniciando checkout")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Planes de Suscripción</h1>
          <p className="text-gray-600">Elige el plan que mejor se adapte a tus necesidades</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Plan Premium */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription>Plan básico con todas las funciones esenciales</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">€1,99</span>
                <span className="text-gray-600">/mes</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Alertas de errores de tarifa
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Chollos de hoteles verificados
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Filtros por continente
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Acceso a comunidad
                </li>
              </ul>
              <Button onClick={() => subscribe("premium")} disabled={loading !== null} className="w-full">
                {loading === "premium" ? "Procesando..." : "Suscribirse"}
              </Button>
            </CardContent>
          </Card>

          {/* Plan Premium Plus */}
          <Card className="shadow-lg border-2 border-blue-500">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Premium Plus</CardTitle>
              <CardDescription>Plan completo con funciones avanzadas</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">€2,49</span>
                <span className="text-gray-600">/mes</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Todo lo de Premium
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Alertas prioritarias
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Más destinos y horarios
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Soporte prioritario 24/7
                </li>
              </ul>
              <Button
                onClick={() => subscribe("premium_plus")}
                disabled={loading !== null}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading === "premium_plus" ? "Procesando..." : "Suscribirse"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
