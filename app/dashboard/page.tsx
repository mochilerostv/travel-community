import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, CreditCard } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Bienvenido a tu panel de control de TravelDeals Pro</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suscripción</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Premium Plus</div>
              <p className="text-xs text-muted-foreground">Activa hasta 28/09/2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ofertas Encontradas</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ahorro Total</CardTitle>
              <CreditCard className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€1,247</div>
              <p className="text-xs text-muted-foreground">En los últimos 6 meses</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ofertas Recientes</CardTitle>
              <CardDescription>Las mejores ofertas encontradas para ti</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Madrid → París</p>
                    <p className="text-sm text-gray-600">Vuelo directo • 2h 15m</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">€89</p>
                    <Badge variant="secondary">-45%</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Hotel Roma Centro</p>
                    <p className="text-sm text-gray-600">3 noches • Desayuno incluido</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">€156</p>
                    <Badge variant="secondary">-30%</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium">Seguro de Viaje Europa</p>
                    <p className="text-sm text-gray-600">Cobertura completa • 15 días</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">€23</p>
                    <Badge variant="secondary">-20%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Alertas</CardTitle>
              <CardDescription>Personaliza tus notificaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ofertas de Vuelos</p>
                    <p className="text-sm text-gray-600">Notificaciones instantáneas</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Activo
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Descuentos en Hoteles</p>
                    <p className="text-sm text-gray-600">Alertas diarias</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Activo
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ofertas de Seguros</p>
                    <p className="text-sm text-gray-600">Alertas semanales</p>
                  </div>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700">
                    Pausado
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
