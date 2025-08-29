import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, ArrowLeft, Bell, Settings, CreditCard, User } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Travel Community</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Inicio
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
              Precios
            </Link>
            <Link href="/dashboard" className="text-blue-600 font-medium">
              Dashboard
            </Link>
          </nav>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Link>
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Gestiona tu cuenta y configuraciones</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Subscription Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Estado de Suscripción
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Plan Gratuito</Badge>
              <p className="text-sm text-gray-600 mt-2">Actualiza a Premium para acceder a ofertas exclusivas</p>
              <Button className="w-full mt-4" asChild>
                <Link href="/pricing">Actualizar Plan</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Configura tus preferencias de viaje y destinos favoritos</p>
              <Button variant="outline" className="w-full bg-transparent">
                Editar Perfil
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Configura cómo y cuándo recibir alertas de ofertas</p>
              <Button variant="outline" className="w-full bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Tus últimas interacciones con ofertas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500">No hay actividad reciente</p>
              <p className="text-sm text-gray-400 mt-2">
                Suscríbete a un plan premium para comenzar a recibir ofertas personalizadas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
