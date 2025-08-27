"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Users, TrendingUp, Bot, Settings, Eye, DollarSign } from 'lucide-react'

export default function AdminPage() {
  const [newDeal, setNewDeal] = useState({
    type: "flight",
    title: "",
    from: "",
    to: "",
    originalPrice: "",
    dealPrice: "",
    airline: "",
    dates: "",
    category: "",
    continent: "",
    description: ""
  })

  const [aiSettings, setAiSettings] = useState({
    enabled: true,
    scanInterval: "15",
    priceThreshold: "30",
    autoPublish: false
  })

  const deals = [
    {
      id: 1,
      type: "flight",
      title: "Madrid → Nueva York",
      originalPrice: 850,
      dealPrice: 299,
      status: "active",
      views: 1247,
      clicks: 89,
      conversions: 12
    },
    {
      id: 2,
      type: "hotel",
      title: "Hotel Luxury Palace - París",
      originalPrice: 320,
      dealPrice: 89,
      status: "active",
      views: 892,
      clicks: 67,
      conversions: 8
    }
  ]

  const users = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@email.com",
      status: "active",
      joinDate: "2024-01-15",
      subscription: "premium"
    },
    {
      id: 2,
      name: "María García",
      email: "maria@email.com",
      status: "active",
      joinDate: "2024-02-03",
      subscription: "premium"
    }
  ]

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding new deal:", newDeal)
    // Reset form
    setNewDeal({
      type: "flight",
      title: "",
      from: "",
      to: "",
      originalPrice: "",
      dealPrice: "",
      airline: "",
      dates: "",
      category: "",
      continent: "",
      description: ""
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <Badge className="bg-blue-100 text-blue-800">
              Admin Dashboard
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Usuarios Activos</p>
                  <p className="text-2xl font-bold text-blue-600">5,247</p>
                  <p className="text-xs text-green-600">+12% este mes</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ingresos Mensuales</p>
                  <p className="text-2xl font-bold text-green-600">€10,441</p>
                  <p className="text-xs text-green-600">+8% este mes</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ofertas Publicadas</p>
                  <p className="text-2xl font-bold text-orange-600">247</p>
                  <p className="text-xs text-green-600">+15 hoy</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">IA Activa</p>
                  <p className="text-2xl font-bold text-purple-600">24/7</p>
                  <p className="text-xs text-green-600">Escaneando</p>
                </div>
                <Bot className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="deals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="deals">Gestionar Ofertas</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="ai">IA y Automatización</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          </TabsList>

          {/* Deals Management */}
          <TabsContent value="deals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add New Deal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Agregar Nueva Oferta
                  </CardTitle>
                  <CardDescription>
                    Crea manualmente una nueva oferta para la comunidad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddDeal} className="space-y-4">
                    <div>
                      <Label htmlFor="type">Tipo de Oferta</Label>
                      <Select value={newDeal.type} onValueChange={(value) => setNewDeal({...newDeal, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flight">Vuelo</SelectItem>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="package">Paquete</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={newDeal.title}
                        onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
                        placeholder="Ej: Madrid → Nueva York"
                      />
                    </div>

                    {newDeal.type === "flight" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="from">Desde</Label>
                          <Input
                            id="from"
                            value={newDeal.from}
                            onChange={(e) => setNewDeal({...newDeal, from: e.target.value})}
                            placeholder="MAD"
                          />
                        </div>
                        <div>
                          <Label htmlFor="to">Hasta</Label>
                          <Input
                            id="to"
                            value={newDeal.to}
                            onChange={(e) => setNewDeal({...newDeal, to: e.target.value})}
                            placeholder="NYC"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="originalPrice">Precio Original (€)</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          value={newDeal.originalPrice}
                          onChange={(e) => setNewDeal({...newDeal, originalPrice: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dealPrice">Precio Oferta (€)</Label>
                        <Input
                          id="dealPrice"
                          type="number"
                          value={newDeal.dealPrice}
                          onChange={(e) => setNewDeal({...newDeal, dealPrice: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="continent">Continente</Label>
                      <Select value={newDeal.continent} onValueChange={(value) => setNewDeal({...newDeal, continent: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar continente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="europa">Europa</SelectItem>
                          <SelectItem value="america-norte">América del Norte</SelectItem>
                          <SelectItem value="america-sur">América del Sur</SelectItem>
                          <SelectItem value="asia">Asia</SelectItem>
                          <SelectItem value="africa">África</SelectItem>
                          <SelectItem value="oceania">Oceanía</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={newDeal.description}
                        onChange={(e) => setNewDeal({...newDeal, description: e.target.value})}
                        placeholder="Detalles adicionales sobre la oferta..."
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Publicar Oferta
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Active Deals */}
              <Card>
                <CardHeader>
                  <CardTitle>Ofertas Activas</CardTitle>
                  <CardDescription>
                    Gestiona las ofertas actualmente publicadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deals.map((deal) => (
                      <div key={deal.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{deal.title}</h4>
                          <div className="text-sm text-gray-600">
                            €{deal.originalPrice} → €{deal.dealPrice}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {deal.views}
                            </span>
                            <span>{deal.clicks} clicks</span>
                            <span>{deal.conversions} conversiones</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">
                            {deal.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>
                  Administra los miembros de la comunidad premium
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Miembro desde: {user.joinDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          {user.subscription}
                        </Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {user.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Settings */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Configuración de IA
                </CardTitle>
                <CardDescription>
                  Configura el sistema de detección automática de ofertas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-enabled">Sistema IA Activado</Label>
                    <p className="text-sm text-gray-600">Habilita el rastreo automático de precios</p>
                  </div>
                  <Switch
                    id="ai-enabled"
                    checked={aiSettings.enabled}
                    onCheckedChange={(checked) => setAiSettings({...aiSettings, enabled: checked})}
                  />
                </div>

                <div>
                  <Label htmlFor="scan-interval">Intervalo de Escaneo (minutos)</Label>
                  <Select value={aiSettings.scanInterval} onValueChange={(value) => setAiSettings({...aiSettings, scanInterval: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutos</SelectItem>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price-threshold">Umbral de Descuento (%)</Label>
                  <Input
                    id="price-threshold"
                    type="number"
                    value={aiSettings.priceThreshold}
                    onChange={(e) => setAiSettings({...aiSettings, priceThreshold: e.target.value})}
                    placeholder="30"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Solo detectar ofertas con descuentos superiores a este porcentaje
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-publish">Publicación Automática</Label>
                    <p className="text-sm text-gray-600">Publica ofertas automáticamente sin revisión manual</p>
                  </div>
                  <Switch
                    id="auto-publish"
                    checked={aiSettings.autoPublish}
                    onCheckedChange={(checked) => setAiSettings({...aiSettings, autoPublish: checked})}
                  />
                </div>

                <Button className="w-full">
                  Guardar Configuración
                </Button>
              </CardContent>
            </Card>

            {/* AI Status */}
            <Card>
              <CardHeader>
                <CardTitle>Estado del Sistema IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">247</div>
                    <div className="text-sm text-green-700">Ofertas Detectadas Hoy</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">15</div>
                    <div className="text-sm text-blue-700">Sitios Monitoreados</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">98.5%</div>
                    <div className="text-sm text-purple-700">Precisión IA</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rendimiento de Ofertas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Tasa de Conversión</span>
                      <span className="font-bold text-green-600">12.4%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>CTR Promedio</span>
                      <span className="font-bold text-blue-600">7.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tiempo Promedio en Página</span>
                      <span className="font-bold text-purple-600">3m 24s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ofertas más Populares</span>
                      <span className="font-bold text-orange-600">Vuelos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ingresos por Mes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Enero 2024</span>
                      <span className="font-bold">€8,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Febrero 2024</span>
                      <span className="font-bold">€9,156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Marzo 2024</span>
                      <span className="font-bold text-green-600">€10,441</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Crecimiento Mensual</span>
                        <span className="font-bold text-green-600">+14.1%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
