import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, MapPin, Shield, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Plane className="h-12 w-12 text-blue-600" />
            <h1 className="text-5xl font-bold text-gray-900">TravelDeals Pro</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Descubre las mejores ofertas de viajes, hoteles y seguros con nuestra plataforma premium
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Ver Planes
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Plane className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle>Ofertas de Vuelos</CardTitle>
              <CardDescription>Encuentra los mejores precios en vuelos a destinos increíbles</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle>Hoteles y Hostales</CardTitle>
              <CardDescription>Descuentos exclusivos en alojamientos de calidad</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-purple-600" />
              </div>
              <CardTitle>Seguros de Viaje</CardTitle>
              <CardDescription>Viaja con tranquilidad con nuestros seguros incluidos</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <Star className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
          <p className="text-gray-600 mb-6">
            Únete a miles de viajeros que ya disfrutan de nuestras ofertas exclusivas
          </p>
          <Link href="/pricing">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Comenzar Ahora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
