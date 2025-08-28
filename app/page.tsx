import Link from "next/link"
import { Plane, MapPin, Clock, Users, Star, ArrowRight, Zap, Shield, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">TravelDeals Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Precios
            </Link>
            <Link href="/register">
              <Button variant="outline">Registrarse</Button>
            </Link>
            <Link href="/pricing">
              <Button>Empezar</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-4 bg-blue-100 text-blue-800">Detección con IA 24/7</Badge>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Encuentra los mejores
          <span className="text-blue-600"> chollos de viajes</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Nuestra IA detecta errores de tarifa y ofertas exclusivas de vuelos, hoteles y seguros de viaje. Únete a miles
          de viajeros que ahorran hasta un 70% en sus aventuras.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing">
            <Button size="lg" className="text-lg px-8 py-4">
              Ver planes <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
              Prueba gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir TravelDeals Pro?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tecnología avanzada y equipo humano trabajando 24/7 para encontrar las mejores ofertas de viaje
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Detección con IA</CardTitle>
              <CardDescription>
                Algoritmos avanzados escanean millones de combinaciones de vuelos para encontrar errores de tarifa
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <CardTitle>Ofertas verificadas</CardTitle>
              <CardDescription>
                Nuestro equipo humano valida cada oferta antes de enviarla para garantizar su autenticidad
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Bell className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Alertas personalizadas</CardTitle>
              <CardDescription>
                Recibe notificaciones instantáneas de ofertas desde tu aeropuerto y hacia tus destinos favoritos
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Deals Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ofertas recientes encontradas</h2>
          <p className="text-gray-600">Ejemplos reales de chollos detectados por nuestra IA</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <div className="text-white text-center">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <p className="font-semibold">Madrid → París</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-green-600">€29</span>
                <Badge variant="secondary">-85%</Badge>
              </div>
              <p className="text-gray-600 text-sm mb-2">Precio normal: €195</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Válido 48h</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center">
              <div className="text-white text-center">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <p className="font-semibold">Barcelona → Roma</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-green-600">€45</span>
                <Badge variant="secondary">-78%</Badge>
              </div>
              <p className="text-gray-600 text-sm mb-2">Precio normal: €205</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Válido 24h</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <p className="font-semibold">Madrid → Nueva York</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-green-600">€189</span>
                <Badge variant="secondary">-72%</Badge>
              </div>
              <p className="text-gray-600 text-sm mb-2">Precio normal: €675</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Válido 12h</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Únete a miles de viajeros</h2>
          <div className="flex items-center justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              <span className="text-2xl font-bold text-blue-600">15,000+</span>
              <span>miembros activos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              <span className="text-2xl font-bold text-blue-600">4.8/5</span>
              <span>valoración media</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">¿Listo para ahorrar en tus viajes?</h2>
            <p className="text-xl mb-8 opacity-90">
              Únete hoy y empieza a recibir las mejores ofertas de viaje directamente en tu email
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  Ver planes desde €1,99/mes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Plane className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900">TravelDeals Pro</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/terms" className="hover:text-gray-900">
              Términos
            </Link>
            <Link href="/privacy" className="hover:text-gray-900">
              Privacidad
            </Link>
            <Link href="/contact" className="hover:text-gray-900">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
