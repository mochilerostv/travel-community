import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, MapPin, Users, Star, ArrowRight, Shield, Zap, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Travel Community</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-blue-600 font-medium">
              Inicio
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
              Precios
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
          </nav>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/pricing">Ver Planes</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Comenzar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            🚀 Más de 10,000 chollos encontrados este mes
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Descubre los mejores
            <span className="text-blue-600"> chollos de viaje</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Únete a nuestra comunidad exclusiva y accede a ofertas de viajes verificadas, alertas de errores de tarifa y
            chollos de hoteles que no encontrarás en ningún otro lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/pricing">
                Comenzar ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Ver características</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir Travel Community?</h2>
            <p className="text-lg text-gray-600">Características exclusivas para viajeros inteligentes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Alertas Instantáneas</CardTitle>
                <CardDescription>
                  Recibe notificaciones inmediatas sobre errores de tarifa y ofertas flash antes que nadie
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Ofertas Verificadas</CardTitle>
                <CardDescription>
                  Todos nuestros chollos son verificados manualmente por nuestro equipo de expertos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Comunidad Exclusiva</CardTitle>
                <CardDescription>
                  Accede a nuestra comunidad privada de viajeros y comparte experiencias
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <CardTitle>Cobertura Mundial</CardTitle>
                <CardDescription>Ofertas de vuelos y hoteles desde y hacia cualquier destino del mundo</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Filtros Avanzados</CardTitle>
                <CardDescription>
                  Filtra por continente, precio, fechas y tipo de viaje para encontrar tu chollo perfecto
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Soporte Premium</CardTitle>
                <CardDescription>
                  Soporte prioritario 24/7 para resolver cualquier duda sobre tus viajes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Deals Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Chollos Destacados</h2>
            <p className="text-xl text-gray-600">
              Ejemplos de las increíbles ofertas que encontrarás en nuestra plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <Plane className="h-16 w-16 mx-auto mb-2" />
                  <p className="text-lg font-semibold">París</p>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">París, Francia</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      Hotel 4* + Vuelos
                    </CardDescription>
                  </div>
                  <Badge variant="destructive">-65%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-green-600">€299</span>
                    <span className="text-sm text-gray-500 line-through ml-2">€850</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <Globe className="h-16 w-16 mx-auto mb-2" />
                  <p className="text-lg font-semibold">Cancún</p>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Cancún, México</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      Resort Todo Incluido
                    </CardDescription>
                  </div>
                  <Badge variant="destructive">-70%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-green-600">€599</span>
                    <span className="text-sm text-gray-500 line-through ml-2">€1,999</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.9</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <div className="text-white text-center">
                  <MapPin className="h-16 w-16 mx-auto mb-2" />
                  <p className="text-lg font-semibold">Roma</p>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Roma, Italia</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      Hotel Boutique + Tours
                    </CardDescription>
                  </div>
                  <Badge variant="destructive">-55%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-green-600">€449</span>
                    <span className="text-sm text-gray-500 line-through ml-2">€999</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Números que hablan por sí solos</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Miembros activos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">€2M+</div>
              <div className="text-gray-600">Ahorrado por usuarios</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfacción del cliente</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Soporte disponible</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-white mb-4">¿Listo para ahorrar en tus viajes?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a más de 50,000 viajeros que ya están ahorrando miles de euros en sus vacaciones
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/pricing">
              Ver planes de suscripción
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Plane className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Travel Community</span>
              </div>
              <p className="text-gray-400">
                La comunidad de viajeros más exclusiva para encontrar los mejores chollos de viaje.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-white">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white">
                    Comunidad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Centro de ayuda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Términos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Travel Community. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
