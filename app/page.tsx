import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, MapPin, Star, Users, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">TravelDeals Pro</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-blue-600">
              Características
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-blue-600">
              Precios
            </Link>
            <Link href="/api/health" className="text-gray-600 hover:text-blue-600">
              API Status
            </Link>
            <Button asChild>
              <Link href="/api/health">Ver API</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">🚀 API de Ofertas con IA</Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Extrae Ofertas de Viajes
            <span className="text-blue-600"> con Inteligencia Artificial</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            API completa para extraer y procesar ofertas de viajes usando OpenAI. Perfecta para integrar con WordPress y
            automatizar la detección de chollos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <Link href="/api/health">Probar API</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
              Ver Documentación
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">OpenAI</div>
              <div className="text-gray-600">Extracción con IA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">WordPress</div>
              <div className="text-gray-600">Plugin Incluido</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">RSS</div>
              <div className="text-gray-600">Fuentes Automáticas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Características de la API</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas para automatizar la detección de ofertas de viajes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Extracción con IA</CardTitle>
                <CardDescription>
                  OpenAI GPT-4 extrae automáticamente precios, rutas, fechas y más datos estructurados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Múltiples Fuentes</CardTitle>
                <CardDescription>Conecta con RSS de SecretFlying, Viajeros Piratas, Travel Dealz y más</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Plugin WordPress</CardTitle>
                <CardDescription>
                  Plugin completo incluido para integrar fácilmente con tu sitio WordPress
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Deduplicación</CardTitle>
                <CardDescription>
                  Sistema inteligente que evita ofertas duplicadas usando fingerprints únicos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Star className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Fácil Despliegue</CardTitle>
                <CardDescription>Despliega en Vercel en minutos. Solo necesitas tu API key de OpenAI</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Plane className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Endpoints REST</CardTitle>
                <CardDescription>
                  API REST completa con health check, extracción IA y sincronización automática
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Endpoints Disponibles</h3>
            <p className="text-xl text-gray-600">API REST completa para integrar con cualquier aplicación</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-100 text-green-800">GET</Badge>
                  <code className="text-lg">/api/health</code>
                </div>
                <CardDescription>Verifica que la API está funcionando correctamente</CardDescription>
              </CardHeader>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-100 text-blue-800">POST</Badge>
                  <code className="text-lg">/api/wp/ai-extract</code>
                </div>
                <CardDescription>Extrae datos estructurados de ofertas usando IA (OpenAI GPT-4)</CardDescription>
              </CardHeader>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Badge className="bg-purple-100 text-purple-800">POST</Badge>
                  <code className="text-lg">/api/ingest</code>
                </div>
                <CardDescription>Ingesta automática desde fuentes RSS (SecretFlying, etc.)</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-4">¿Listo para Automatizar tus Ofertas?</h3>
          <p className="text-xl mb-8 opacity-90">Descarga el proyecto completo y despliégalo en Vercel en minutos</p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
            <Link href="/api/health">Probar API Ahora</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-6 w-6" />
                <span className="text-xl font-bold">TravelDeals API</span>
              </div>
              <p className="text-gray-400">API de extracción de ofertas de viajes con inteligencia artificial.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">API</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/api/health" className="hover:text-white">
                    Health Check
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Documentación
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Ejemplos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Plugin WordPress
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Guía de Despliegue
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Soporte
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tecnología</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Next.js 14</li>
                <li>OpenAI GPT-4</li>
                <li>TypeScript</li>
                <li>Vercel</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TravelDeals API. Proyecto open source.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
