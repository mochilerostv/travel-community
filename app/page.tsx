import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, MapPin, Clock, Users, Star, TrendingDown, Bell, Shield } from "lucide-react"

export default function HomePage() {
  const featuredDeals = [
    {
      id: 1,
      title: "París - Hotel de Lujo",
      description: "5 días en el corazón de París",
      originalPrice: "€899",
      salePrice: "€449",
      discount: "50%",
      image: "/luxury-hotel-paris.png",
      location: "París, Francia",
      rating: 4.8,
      reviews: 1247,
    },
    {
      id: 2,
      title: "Cancún - Resort Todo Incluido",
      description: "7 días de playa y relajación",
      originalPrice: "€1299",
      salePrice: "€699",
      discount: "46%",
      image: "/cancun-beach-resort.png",
      location: "Cancún, México",
      rating: 4.9,
      reviews: 892,
    },
    {
      id: 3,
      title: "Roma - Experiencia Cultural",
      description: "4 días explorando la ciudad eterna",
      originalPrice: "€649",
      salePrice: "€349",
      discount: "46%",
      image: "/rome-colosseum.png",
      location: "Roma, Italia",
      rating: 4.7,
      reviews: 1563,
    },
  ]

  const stats = [
    { label: "Ofertas Activas", value: "2,847", icon: TrendingDown },
    { label: "Miembros Activos", value: "45,231", icon: Users },
    { label: "Países Cubiertos", value: "127", icon: MapPin },
    { label: "Ahorro Promedio", value: "€1,247", icon: Star },
  ]

  const features = [
    {
      icon: Bell,
      title: "Alertas Instantáneas",
      description: "Recibe notificaciones al momento cuando aparezcan ofertas que coincidan con tus preferencias.",
    },
    {
      icon: Shield,
      title: "Ofertas Verificadas",
      description: "Todas nuestras ofertas son verificadas manualmente para garantizar su autenticidad.",
    },
    {
      icon: Clock,
      title: "Acceso 24/7",
      description: "Las mejores ofertas aparecen a cualquier hora. Mantente conectado siempre.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
          <Button asChild>
            <Link href="/pricing">Comenzar Ahora</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            🔥 Más de 2,800 ofertas activas
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Las Mejores Ofertas de Viaje
            <span className="text-blue-600"> al Instante</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Únete a más de 45,000 viajeros inteligentes que ahorran miles de euros en sus vacaciones. Ofertas
            exclusivas, alertas personalizadas y acceso VIP a chollos que no encontrarás en ningún otro lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/pricing">Ver Planes Premium</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">Explorar Ofertas Gratis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Chollos Destacados</h2>
            <p className="text-xl text-gray-600">Ofertas limitadas que desaparecen rápido</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDeals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={deal.image || "/placeholder.svg"} alt={deal.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 right-4 bg-red-500">-{deal.discount}</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{deal.title}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{deal.rating}</span>
                      <span className="text-sm text-gray-500">({deal.reviews})</span>
                    </div>
                  </div>
                  <CardDescription>{deal.description}</CardDescription>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {deal.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-green-600">{deal.salePrice}</span>
                      <span className="text-lg text-gray-500 line-through ml-2">{deal.originalPrice}</span>
                    </div>
                    <Button size="sm">Ver Oferta</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir Travel Community?</h2>
            <p className="text-xl text-gray-600">Herramientas profesionales para viajeros inteligentes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para ahorrar en tu próximo viaje?</h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de viajeros que ya están ahorrando con nuestras ofertas exclusivas
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/pricing">Comenzar Ahora - Desde €1.99/mes</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold">Travel Community</span>
          </div>
          <p className="text-gray-400 mb-4">Tu compañero de confianza para encontrar las mejores ofertas de viaje.</p>
          <p className="text-gray-500 text-sm">&copy; 2024 Travel Community. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
