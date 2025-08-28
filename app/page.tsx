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
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-4 bg-blue-100 text-blue-800">Detección con IA 24/7</Badge>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Los mejores <span className="text-blue-600">chollos de viajes</span> detectados por IA
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Únete a nuestra comunidad premium y recibe alertas instantáneas de errores de tarifa, ofertas de hoteles y
          chollos verificados por nuestro equipo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing">
            <Button size="lg" className="px-8 py-4 text-lg">
              Ver planes <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg bg-transparent">
              Probar gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué TravelDeals Pro?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestra IA analiza millones de ofertas 24/7 para encontrar los mejores chollos antes que nadie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-600">
                <Zap className="h-6 w-6" />
                <CardTitle>Detección instantánea</CardTitle>
              </div>
              <CardDescription>
                IA que detecta errores de tarifa y chollos en tiempo real, 24 horas al día.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-emerald-600">
                <Shield className="h-6 w-6" />
                <CardTitle>Ofertas verificadas</CardTitle>
              </div>
              <CardDescription>
                Cada oferta es verificada por nuestro equipo humano antes de enviártela.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-orange-600">
                <Bell className="h-6 w-6" />
                <CardTitle>Alertas personalizadas</CardTitle>
              </div>
              <CardDescription>Configura alertas por aeropuerto de salida, destinos y tipo de viaje.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Deals Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ofertas recientes encontradas</h2>
          <p className="text-gray-600">Ejemplos de chollos detectados por nuestra IA</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">Madrid → París</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="destructive">Error de tarifa</Badge>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">4.8</span>
                </div>
              </div>
              <h3 className="font-semibold mb-1">Vuelos a París desde €29</h3>
              <p className="text-sm text-gray-600 mb-2">Ida y vuelta • 3 días</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Detectado hace 2h</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
              <div className="text-white text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">Barcelona → Roma</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Badge className="bg-emerald-100 text-emerald-800">Chollo hotel</Badge>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">4.9</span>
                </div>
              </div>
              <h3 className="font-semibold mb-1">Hotel 4* en Roma €45/noche</h3>
              <p className="text-sm text-gray-600 mb-2">Centro histórico • Desayuno incluido</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Detectado hace 5h</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
              <div className="text-white text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">Madrid → Nueva York</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="destructive">Error de tarifa</Badge>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">4.7</span>
                </div>
              </div>
              <h3 className="font-semibold mb-1">Vuelos a NYC desde €199</h3>
              <p className="text-sm text-gray-600 mb-2">Ida y vuelta • 7 días</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Detectado hace 1h</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Únete a nuestra comunidad</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Más de 10,000 viajeros ya ahorran cientos de euros cada año con nuestras alertas premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <p className="text-gray-600">Miembros activos</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">€500</div>
              <p className="text-gray-600">Ahorro promedio/año</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <p className="text-gray-600">Detección automática</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Listo para ahorrar en tus viajes?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Únete hoy y empieza a recibir las mejores ofertas de viajes detectadas por IA.
        </p>
        <Link href="/pricing">
          <Button size="lg" className="px-8 py-4 text-lg">
            Ver planes desde €1,99/mes <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-6 w-6" />
                <span className="text-xl font-bold">TravelDeals Pro</span>
              </div>
              <p className="text-gray-400">Los mejores chollos de viajes detectados por IA, verificados por humanos.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white">
                    Registrarse
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Términos de uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Política de privacidad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <p className="text-gray-400">hola@traveldeals.pro</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TravelDeals Pro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
