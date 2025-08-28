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
          Los mejores <span className="text-blue-600">chollos de viajes</span>
          <br />
          detectados por inteligencia artificial
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Nuestra IA escanea miles de vuelos y hoteles cada minuto para encontrar errores de tarifa y ofertas
          increíbles. Únete a más de 10,000 viajeros que ahorran hasta un 70% en sus viajes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing">
            <Button size="lg" className="text-lg px-8 py-4">
              Ver Planes Premium
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
              Registrarse Gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestra tecnología de IA trabaja 24/7 para encontrar las mejores ofertas de viajes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Detección Automática</CardTitle>
              <CardDescription>
                Nuestra IA escanea miles de vuelos y hoteles cada minuto buscando errores de precio y ofertas
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>Verificación Humana</CardTitle>
              <CardDescription>
                Nuestro equipo verifica cada oferta para asegurar que sea real y reservable
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Alertas Instantáneas</CardTitle>
              <CardDescription>
                Recibe notificaciones inmediatas de ofertas desde tu aeropuerto y destinos favoritos
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Deals Preview Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ofertas Recientes</h2>
          <p className="text-gray-600">Ejemplos de chollos encontrados por nuestra IA</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">Madrid → París</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Badge className="bg-red-100 text-red-800">Error de Tarifa</Badge>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">€29</span>
                  <span className="text-sm text-gray-500 line-through ml-2">€189</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Vuelo directo • 2h 15min</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Detectado hace 2 horas</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">Barcelona → Roma</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Badge className="bg-blue-100 text-blue-800">Chollo Hotel</Badge>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">€45</span>
                  <span className="text-sm text-gray-500 line-through ml-2">€120</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Hotel 4★ • Centro histórico</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Detectado hace 5 horas</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">Madrid → Nueva York</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Badge className="bg-purple-100 text-purple-800">Oferta Flash</Badge>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">€299</span>
                  <span className="text-sm text-gray-500 line-through ml-2">€650</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Ida y vuelta • 8h 30min</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Detectado hace 1 hora</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Viajeros activos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">€2.5M</div>
              <div className="text-gray-600">Ahorrado por usuarios</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Detección automática</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">70%</div>
              <div className="text-gray-600">Ahorro promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Lo que dicen nuestros usuarios</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Increíble! Encontré un vuelo a Tokio por €350 cuando normalmente cuesta €800. La IA realmente
                funciona."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">María González</div>
                  <div className="text-sm text-gray-500">Madrid</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Las alertas son súper rápidas. Recibí una notificación de un error de tarifa y lo reservé en 5
                minutos."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold">Carlos Ruiz</div>
                  <div className="text-sm text-gray-500">Barcelona</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "He ahorrado más de €1,200 este año gracias a TravelDeals Pro. Vale cada céntimo de la suscripción."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Ana Martín</div>
                  <div className="text-sm text-gray-500">Valencia</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Listo para ahorrar en tus viajes?</h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de viajeros que ya están ahorrando hasta un 70% con nuestra IA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Ver Planes Premium
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Empezar Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Plane className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">TravelDeals Pro</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/terms" className="hover:text-gray-900">
              Términos
            </Link>
            <Link href="/privacy" className="hover:text-gray-900">
              Privacidad
            </Link>
            <Link href="/pricing" className="hover:text-gray-900">
              Precios
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          © 2024 TravelDeals Pro. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
