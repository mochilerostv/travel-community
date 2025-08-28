"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  CreditCard,
  Plane,
  Hotel,
  Shield,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  DollarSign,
  Activity,
} from "lucide-react"

interface Deal {
  id: string
  title: string
  description: string
  price: number
  originalPrice: number
  category: "flight" | "hotel" | "insurance"
  destination: string
  validUntil: string
  isActive: boolean
  createdAt: string
}

interface User {
  id: string
  email: string
  plan: "premium" | "premium_plus"
  status: "active" | "cancelled" | "past_due"
  createdAt: string
  lastPayment: string
}

interface Stats {
  totalUsers: number
  activeSubscriptions: number
  monthlyRevenue: number
  totalDeals: number
  conversionRate: number
}

export default function AdminPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    totalDeals: 0,
    conversionRate: 0,
  })
  const [loading, setLoading] = useState(true)
  const [newDeal, setNewDeal] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "flight" as const,
    destination: "",
    validUntil: "",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch deals
      const dealsResponse = await fetch("/api/deals")
      const dealsData = await dealsResponse.json()
      setDeals(dealsData.deals || [])

      // Fetch users (mock data for now)
      const mockUsers: User[] = [
        {
          id: "1",
          email: "usuario1@example.com",
          plan: "premium",
          status: "active",
          createdAt: "2024-01-15",
          lastPayment: "2024-02-15",
        },
        {
          id: "2",
          email: "usuario2@example.com",
          plan: "premium_plus",
          status: "active",
          createdAt: "2024-01-20",
          lastPayment: "2024-02-20",
        },
      ]
      setUsers(mockUsers)

      // Calculate stats
      const mockStats: Stats = {
        totalUsers: mockUsers.length,
        activeSubscriptions: mockUsers.filter((u) => u.status === "active").length,
        monthlyRevenue: mockUsers.reduce((acc, user) => {
          return acc + (user.plan === "premium" ? 1.99 : 2.49)
        }, 0),
        totalDeals: dealsData.deals?.length || 0,
        conversionRate: 12.5,
      }
      setStats(mockStats)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/deals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newDeal,
          price: Number.parseFloat(newDeal.price),
          originalPrice: Number.parseFloat(newDeal.originalPrice),
        }),
      })

      if (response.ok) {
        setNewDeal({
          title: "",
          description: "",
          price: "",
          originalPrice: "",
          category: "flight",
          destination: "",
          validUntil: "",
        })
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error("Error creating deal:", error)
    }
  }

  const handleDeleteDeal = async (dealId: string) => {
    try {
      const response = await fetch(`/api/deals/${dealId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error("Error deleting deal:", error)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "flight":
        return <Plane className="h-4 w-4" />
      case "hotel":
        return <Hotel className="h-4 w-4" />
      case "insurance":
        return <Shield className="h-4 w-4" />
      default:
        return <Plane className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "flight":
        return "bg-blue-100 text-blue-800"
      case "hotel":
        return "bg-green-100 text-green-800"
      case "insurance":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona ofertas, usuarios y suscripciones</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Usuarios Totales</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Suscripciones Activas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ingresos Mensuales</p>
                  <p className="text-2xl font-bold text-gray-900">€{stats.monthlyRevenue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ofertas Activas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDeals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Conversión</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="deals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deals">Ofertas</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          </TabsList>

          {/* Deals Tab */}
          <TabsContent value="deals" className="space-y-6">
            {/* Create Deal Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Crear Nueva Oferta
                </CardTitle>
                <CardDescription>Añade una nueva oferta de viaje para los miembros premium</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateDeal} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                      <Input
                        value={newDeal.title}
                        onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
                        placeholder="Ej: Vuelo Madrid-París desde €29"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                      <Input
                        value={newDeal.destination}
                        onChange={(e) => setNewDeal({ ...newDeal, destination: e.target.value })}
                        placeholder="Ej: París, Francia"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <Textarea
                      value={newDeal.description}
                      onChange={(e) => setNewDeal({ ...newDeal, description: e.target.value })}
                      placeholder="Describe los detalles de la oferta..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Precio Oferta (€)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={newDeal.price}
                        onChange={(e) => setNewDeal({ ...newDeal, price: e.target.value })}
                        placeholder="29.00"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Precio Original (€)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={newDeal.originalPrice}
                        onChange={(e) => setNewDeal({ ...newDeal, originalPrice: e.target.value })}
                        placeholder="199.00"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                      <select
                        value={newDeal.category}
                        onChange={(e) => setNewDeal({ ...newDeal, category: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="flight">Vuelo</option>
                        <option value="hotel">Hotel</option>
                        <option value="insurance">Seguro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Válido Hasta</label>
                      <Input
                        type="date"
                        value={newDeal.validUntil}
                        onChange={(e) => setNewDeal({ ...newDeal, validUntil: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Oferta
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Deals List */}
            <Card>
              <CardHeader>
                <CardTitle>Ofertas Activas</CardTitle>
                <CardDescription>Gestiona todas las ofertas disponibles para los usuarios premium</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deals.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No hay ofertas disponibles</p>
                      <p className="text-sm text-gray-400">Crea tu primera oferta usando el formulario de arriba</p>
                    </div>
                  ) : (
                    deals.map((deal) => (
                      <div key={deal.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getCategoryColor(deal.category)}>
                                <span className="flex items-center gap-1">
                                  {getCategoryIcon(deal.category)}
                                  {deal.category === "flight"
                                    ? "Vuelo"
                                    : deal.category === "hotel"
                                      ? "Hotel"
                                      : "Seguro"}
                                </span>
                              </Badge>
                              <Badge variant={deal.isActive ? "default" : "secondary"}>
                                {deal.isActive ? "Activa" : "Inactiva"}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-lg">{deal.title}</h3>
                            <p className="text-gray-600 mb-2">{deal.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>📍 {deal.destination}</span>
                              <span>
                                💰 €{deal.price} (antes €{deal.originalPrice})
                              </span>
                              <span>⏰ Válido hasta {new Date(deal.validUntil).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteDeal(deal.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuarios y Suscripciones</CardTitle>
                <CardDescription>Gestiona los usuarios registrados y sus suscripciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{user.email}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={user.plan === "premium_plus" ? "default" : "secondary"}>
                              {user.plan === "premium" ? "Premium" : "Premium Plus"}
                            </Badge>
                            <Badge variant={user.status === "active" ? "default" : "destructive"}>
                              {user.status === "active"
                                ? "Activo"
                                : user.status === "cancelled"
                                  ? "Cancelado"
                                  : "Pago Pendiente"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Registrado: {new Date(user.createdAt).toLocaleDateString()} | Último pago:{" "}
                            {new Date(user.lastPayment).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                          <Button variant="outline" size="sm">
                            Enviar Email
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos por Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Premium (€1.99/mes)</span>
                      <span className="font-semibold">
                        €{(users.filter((u) => u.plan === "premium").length * 1.99).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Premium Plus (€2.49/mes)</span>
                      <span className="font-semibold">
                        €{(users.filter((u) => u.plan === "premium_plus").length * 2.49).toFixed(2)}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Mensual</span>
                      <span>€{stats.monthlyRevenue.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Ofertas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Plane className="h-4 w-4" />
                        Vuelos
                      </span>
                      <span className="font-semibold">{deals.filter((d) => d.category === "flight").length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Hotel className="h-4 w-4" />
                        Hoteles
                      </span>
                      <span className="font-semibold">{deals.filter((d) => d.category === "hotel").length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Seguros
                      </span>
                      <span className="font-semibold">{deals.filter((d) => d.category === "insurance").length}</span>
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
