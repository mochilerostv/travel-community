"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Plane, CheckCircle, ArrowLeft, Calendar, MapPin, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [paymentStatus, setPaymentStatus] = useState<"loading" | "success" | "error" | null>(null)

  useEffect(() => {
    if (sessionId) {
      setPaymentStatus("loading")
      // Simular verificación de pago
      setTimeout(() => {
        setPaymentStatus("success")
      }, 2000)
    }
  }, [sessionId])

  const mockDeals = [
    {
      id: 1,
      title: "Madrid → París",
      price: "€89",
      originalPrice: "€245",
      savings: "64%",
      dates: "15-22 Mar",
      type: "Error de tarifa",
      airline: "Air France",
      verified: true,
    },
    {
      id: 2,
      title: "Barcelona → Roma",
      price: "€45",
      originalPrice: "€180",
      savings: "75%",
      dates: "8-15 Abr",
      type: "Chollo verificado",
      airline: "Ryanair",
      verified: true,
    },
    {
      id: 3,
      title: "Valencia → Londres",
      price: "€67",
      originalPrice: "€220",
      savings: "70%",
      dates: "22-29 Mar",
      type: "Error de tarifa",
      airline: "British Airways",
      verified: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">TravelDeals Pro</h1>
          </div>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>

        {/* Payment Success Message */}
        {sessionId && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                {paymentStatus === "loading" && (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                    <div>
                      <h3 className="font-semibold text-green-800">Verificando pago...</h3>
                      <p className="text-green-700">Confirmando tu suscripción</p>
                    </div>
                  </>
                )}
                {paymentStatus === "success" && (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-800">¡Pago completado!</h3>
                      <p className="text-green-700">Tu suscripción está activa. Bienvenido a TravelDeals Pro.</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Welcome Section */}
        <div className="bg-white rounded-lg p-8 shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">¡Bienvenido!</h2>
          <p className="text-gray-600">
            Tu suscripción está activa. Aquí podrás ver todas tus ofertas y configuraciones.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ofertas Activas</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">+12 desde ayer</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ahorro Promedio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">vs precio regular</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas Enviadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">esta semana</p>
            </CardContent>
          </Card>
        </div>

        {/* Latest Deals */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Últimas Ofertas Detectadas</CardTitle>
            <CardDescription>Errores de tarifa y chollos verificados por nuestro equipo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-lg">{deal.title}</h3>
                      <p className="text-sm text-gray-600">
                        {deal.airline} • {deal.dates}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={deal.type === "Error de tarifa" ? "destructive" : "default"}>{deal.type}</Badge>
                      {deal.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Verificado
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">{deal.price}</span>
                      <div className="text-sm text-gray-500">
                        <div className="line-through">{deal.originalPrice}</div>
                        <div className="text-green-600 font-medium">-{deal.savings}</div>
                      </div>
                    </div>
                    <Button size="sm" className="mt-2">
                      Ver Oferta
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurar Alertas</CardTitle>
              <CardDescription>Personaliza tus notificaciones por aeropuerto y destino</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Configurar Alertas</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Comunidad Premium</CardTitle>
              <CardDescription>Únete a nuestra comunidad privada de viajeros</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                Acceder a Comunidad
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
