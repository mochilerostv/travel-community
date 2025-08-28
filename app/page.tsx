import Link from "next/link"
import { Plane, Clock, Star, ArrowRight, Zap, Shield, Bell } from "lucide-react"
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
              <Button>Únete ahora</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-4 bg-blue-100 text-blue-800">🚀 Detección con IA</Badge>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Los mejores <span className="text-blue-600">chollos de viajes</span>
          <br />
          detectados por inteligencia artificial
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Nuestra IA escanea 24/7 miles de fuentes para encontrar errores de tarifa, ofertas flash y chollos exclusivos
          de vuelos, hoteles y seguros de viaje.
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué TravelDeals Pro?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestra tecnología de IA encuentra ofertas que otros no ven, ahorrándote tiempo y dinero en cada viaje.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-600">
                <Zap className="h-6 w-6" />
                <CardTitle>Detección con IA</CardTitle>
              </div>
              <CardDescription>
                Algoritmos avanzados que escanean miles de fuentes 24/7 para encontrar errores de tarifa y ofertas flash
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
                Cada oferta es verificada por nuestro equipo humano antes de ser publicada en la comunidad
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-orange-600">
                <Bell className="h-6 w-6" />
                <CardTitle>Alertas personalizadas</CardTitle>
              </div>
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
          <p className="text-gray-600">Ejemplos de chollos detectados por nuestra IA en las últimas 24 horas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white">Error de tarifa</Badge>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Madrid → Tokio</h3>
                <p className="text-blue-100">Ida y vuelta</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-green-600">€299</span>
                <span className="text-sm text-gray-500 line-through">€899</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Válido hasta mañana</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-emerald-500 to-teal-600 relative">
              <div className="absolute top-4 left-4">
                <Badge className="bg-emerald-500 text-white">Hotel chollo</Badge>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">París 5★</h3>
                <p className="text-emerald-100">3 noches</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-green-600">€89</span>
                <span className="text-sm text-gray-500 line-through">€299</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>Hotel de lujo</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-orange-500 to-red-600 relative">
              <div className="absolute top-4 left-4">
                <Badge className="bg-orange-500 text-white">Seguro viaje</Badge>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Cobertura mundial</h3>
                <p className="text-orange-100">Anual</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-green-600">€49</span>
                <span className="text-sm text-gray-500 line-through">€149</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Cobertura completa</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Stats */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">15,000+</div>
                <div className="text-blue-100">Miembros activos</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">€2.3M</div>
                <div className="text-blue-100">Ahorrado en total</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Ofertas por semana</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Detección automática</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Listo para ahorrar en tus viajes?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Únete a miles de viajeros que ya ahorran cientos de euros en cada viaje gracias a nuestra IA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing">
            <Button size="lg" className="text-lg px-8 py-4">
              Ver planes desde €1,99/mes
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
              Probar gratis
            </Button>
          </Link>
        </div>
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
              <p className="text-gray-400">
                La plataforma líder en detección de ofertas de viaje con inteligencia artificial.
              </p>
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
                    Registro
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacidad
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
