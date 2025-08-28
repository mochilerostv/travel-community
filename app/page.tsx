import Link from "next/link"
import { Plane, Clock, Users, Shield, Zap } from "lucide-react"
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
            <h1 className="text-2xl font-bold text-gray-900">TravelDeals Pro</h1>
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
        <Badge className="mb-4 bg-blue-100 text-blue-800">🚀 Detección con IA 24/7</Badge>
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Los mejores <span className="text-blue-600">chollos de viajes</span>
          <br />
          detectados por inteligencia artificial
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Nuestra IA escanea miles de ofertas cada minuto para encontrar errores de tarifa y chollos exclusivos. Únete a
          más de 10,000 viajeros que ya ahorran cientos de euros en sus viajes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing">
            <Button size="lg" className="text-lg px-8 py-4">
              Ver planes desde €1,99/mes
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
              Prueba gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Miembros activos</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">€500</div>
            <div className="text-gray-600">Ahorro promedio</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Detección automática</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Satisfacción</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestra tecnología de IA analiza millones de combinaciones de vuelos y hoteles para encontrar las mejores
            ofertas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-600">
                <Zap className="h-6 w-6" />
                <CardTitle>Detección automática</CardTitle>
              </div>
              <CardDescription>
                Nuestra IA escanea 24/7 buscando errores de tarifa y ofertas flash que duran solo minutos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-emerald-600">
                <Shield className="h-6 w-6" />
                <CardTitle>Verificación humana</CardTitle>
              </div>
              <CardDescription>
                Cada oferta es verificada por nuestro equipo antes de ser enviada a la comunidad
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-orange-600">
                <Users className="h-6 w-6" />
                <CardTitle>Comunidad exclusiva</CardTitle>
              </div>
              <CardDescription>
                Accede a nuestra comunidad privada donde compartimos las mejores ofertas y consejos de viaje
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Deals Preview Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ofertas recientes encontradas</h3>
          <p className="text-gray-600">Estos son algunos ejemplos de chollos que hemos detectado esta semana</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-2xl font-bold">Madrid → París</div>
                <div className="text-sm opacity-90">Vuelo + 3 noches</div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">€89</div>
                  <div className="text-sm text-gray-500 line-through">€340</div>
                </div>
                <Badge className="bg-red-100 text-red-800">-74%</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Detectado hace 2 horas</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-emerald-500 to-teal-600 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-2xl font-bold">Barcelona → Roma</div>
                <div className="text-sm opacity-90">Vuelo directo</div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">€29</div>
                  <div className="text-sm text-gray-500 line-through">€180</div>
                </div>
                <Badge className="bg-red-100 text-red-800">-84%</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Detectado hace 5 horas</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-orange-500 to-red-600 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-2xl font-bold">Madrid → Cancún</div>
                <div className="text-sm opacity-90">Resort 5★ todo incluido</div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">€399</div>
                  <div className="text-sm text-gray-500 line-through">€1,200</div>
                </div>
                <Badge className="bg-red-100 text-red-800">-67%</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Detectado hace 1 día</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Planes que se adaptan a ti</h3>
          <p className="text-gray-600">Elige el plan perfecto para tus necesidades de viaje</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-2 border-blue-200">
            <CardHeader className="text-center">
              <Badge className="w-fit mx-auto mb-2 bg-blue-100 text-blue-800">Más popular</Badge>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription>Perfecto para viajeros frecuentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-blue-600">€1,99</div>
                <div className="text-gray-600">/mes</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Alertas de errores de tarifa</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Chollos de hoteles verificados</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Filtros por continente</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Acceso a comunidad</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button className="w-full">Empezar ahora</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Badge className="w-fit mx-auto mb-2 bg-emerald-100 text-emerald-800">Premium</Badge>
              <CardTitle className="text-2xl">Premium Plus</CardTitle>
              <CardDescription>Para los viajeros más exigentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-emerald-600">€2,49</div>
                <div className="text-gray-600">/mes</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>Todo lo de Premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>Alertas prioritarias</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>Más destinos y horarios</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>Soporte prioritario 24/7</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button className="w-full bg-transparent" variant="outline">
                  Empezar ahora
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">¿Listo para ahorrar en tus próximos viajes?</h3>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de viajeros que ya están ahorrando cientos de euros con nuestras ofertas exclusivas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Ver todos los planes
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Empezar gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Plane className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900">TravelDeals Pro</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/terms" className="hover:text-gray-900">
              Términos
            </Link>
            <Link href="/privacy" className="hover:text-gray-900">
              Privacidad
            </Link>
            <span>© 2024 TravelDeals Pro</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
