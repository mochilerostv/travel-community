import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, Star, TrendingUp, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Plane className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">TravelDeals Pro</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Precios
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Descubre las Mejores Ofertas de Viaje</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Accede a ofertas exclusivas de vuelos, hoteles y seguros de viaje. Nuestra IA encuentra los mejores precios
            para que puedas viajar más por menos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Ver Planes
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
                Registrarse Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir TravelDeals Pro?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestra plataforma utiliza tecnología avanzada para encontrar las mejores ofertas de viaje
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Ofertas Exclusivas</CardTitle>
                <CardDescription>Accede a descuentos que no encontrarás en ningún otro lugar</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Alertas en Tiempo Real</CardTitle>
                <CardDescription>Recibe notificaciones instantáneas cuando aparezcan nuevas ofertas</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Comunidad de Viajeros</CardTitle>
                <CardDescription>Conecta con otros viajeros y comparte experiencias</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Planes Simples y Transparentes</h2>
            <p className="text-gray-600">Elige el plan que mejor se adapte a tus necesidades de viaje</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <CardDescription>Perfecto para viajeros ocasionales</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€1,99</span>
                  <span className="text-gray-600">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Ofertas de vuelos exclusivas
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Descuentos en hoteles
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Alertas personalizadas
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full">Comenzar</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative border-2 border-blue-500">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">Más Popular</Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium Plus</CardTitle>
                <CardDescription>Para viajeros frecuentes</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€2,49</span>
                  <span className="text-gray-600">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Todo lo de Premium
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Seguros de viaje incluidos
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Soporte prioritario 24/7
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Comenzar</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">TravelDeals Pro</span>
          </div>
          <p className="text-gray-400 mb-4">Encuentra las mejores ofertas de viaje con nuestra tecnología avanzada</p>
          <div className="flex justify-center space-x-6">
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Términos
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacidad
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
