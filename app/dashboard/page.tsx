"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plane, Hotel, MapPin, Clock, TrendingDown, Bell, Filter, ExternalLink, Star, Users, Calendar, Euro } from 'lucide-react'

export default function DashboardPage() {
  const [selectedContinent, setSelectedContinent] = useState("all")
  const [selectedAirport, setSelectedAirport] = useState("all")

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const sessionId = urlParams.get('session_id')
      
      if (sessionId) {
        try {
          const response = await fetch(`/api/subscription-status?session_id=${sessionId}`)
          const data = await response.json()
          
          if (data.success) {
            // Show success message
            console.log('Subscription activated:', data.data)
            // You could show a toast notification here
          }
        } catch (error) {
          console.error('Error checking subscription:', error)
        }
      }
    }
    
    checkSubscriptionStatus()
  }, [])

  const flightDeals = [
    {
      id: 1,
      from: "MAD",
      to: "NYC",
      fromCity: "Madrid",
      toCity: "Nueva York",
      originalPrice: 850,
      dealPrice: 299,
      savings: 551,
      airline: "Iberia",
      dates: "15-22 Mar",
      type: "Error de Tarifa",
      continent: "América del Norte",
      verified: true,
      timeLeft: "2h 15m"
    },
    {
      id: 2,
      from: "BCN",
      to: "BKK",
      fromCity: "Barcelona",
      toCity: "Bangkok",
      originalPrice: 720,
      dealPrice: 385,
      savings: 335,
      airline: "Qatar Airways",
      dates: "10-24 Abr",
      type: "Oferta Flash",
      continent: "Asia",
      verified: true,
      timeLeft: "5h 42m"
    },
    {
      id: 3,
      from: "MAD",
      to: "SYD",
      fromCity: "Madrid",
      toCity: "Sídney",
      originalPrice: 1200,
      dealPrice: 699,
      savings: 501,
      airline: "Emirates",
      dates: "5-19 May",
      type: "Precio Especial",
      continent: "Oceanía",
      verified: true,
      timeLeft: "1h 28m"
    }
  ]

  const hotelDeals = [
    {
      id: 1,
      name: "Hotel Luxury Palace",
      city: "París",
      country: "Francia",
      originalPrice: 320,
      dealPrice: 89,
      savings: 231,
      rating: 4.8,
      dates: "20-25 Mar",
      type: "Última Hora",
      continent: "Europa",
      image: "/luxury-hotel-paris.png"
    },
    {
      id: 2,
      name: "Beachfront Resort",
      city: "Cancún",
      country: "México",
      originalPrice: 450,
      dealPrice: 159,
      savings: 291,
      rating: 4.6,
      dates: "12-18 Abr",
      type: "Todo Incluido",
      continent: "América del Norte",
      image: "/cancun-beach-resort.png"
    }
  ]

  const continents = ["Europa", "América del Norte", "América del Sur", "Asia", "África", "Oceanía"]
  const airports = ["MAD", "BCN", "LHR", "CDG", "FCO", "AMS"]

  const filteredFlightDeals = flightDeals.filter(deal => {
    const continentMatch = selectedContinent === "all" || deal.continent === selectedContinent
    const airportMatch = selectedAirport === "all" || deal.from === selectedAirport
    return continentMatch && airportMatch
  })

  const filteredHotelDeals = hotelDeals.filter(deal => {
    return selectedContinent === "all" || deal.continent === selectedContinent
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Plane className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">TravelDeals Pro</h1>
              </div>
              <Badge className="bg-green-100 text-green-800">
                Miembro Premium
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('/api/customer-portal', '_blank')}
              >
                Gestionar Suscripción
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
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
                  <p className="text-sm text-gray-600">Ofertas Activas</p>
                  <p className="text-2xl font-bold text-blue-600">247</p>
                </div>
                <TrendingDown className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ahorro Total</p>
                  <p className="text-2xl font-bold text-green-600">€2,847</p>
                </div>
                <Euro className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Alertas Configuradas</p>
                  <p className="text-2xl font-bold text-orange-600">12</p>
                </div>
                <Bell className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Miembros Online</p>
                  <p className="text-2xl font-bold text-purple-600">1,247</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Continente</label>
                <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los continentes</SelectItem>
                    {continents.map(continent => (
                      <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Aeropuerto de Salida</label>
                <Select value={selectedAirport} onValueChange={setSelectedAirport}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los aeropuertos</SelectItem>
                    {airports.map(airport => (
                      <SelectItem key={airport} value={airport}>{airport}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Buscar Destino</label>
                <Input placeholder="Ej: París, Tokio, Nueva York..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="flights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="flights" className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              Ofertas de Vuelos
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center gap-2">
              <Hotel className="h-4 w-4" />
              Ofertas de Hoteles
            </TabsTrigger>
          </TabsList>

          {/* Flight Deals */}
          <TabsContent value="flights" className="space-y-6">
            <div className="grid gap-6">
              {filteredFlightDeals.map((deal) => (
                <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <Badge 
                            variant={deal.type === "Error de Tarifa" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {deal.type}
                          </Badge>
                          {deal.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              ✓ Verificado
                            </Badge>
                          )}
                          <div className="flex items-center gap-1 text-sm text-red-600">
                            <Clock className="h-4 w-4" />
                            {deal.timeLeft} restante
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 mb-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{deal.from}</div>
                            <div className="text-sm text-gray-600">{deal.fromCity}</div>
                          </div>
                          <div className="flex-1 relative">
                            <div className="border-t-2 border-dashed border-gray-300"></div>
                            <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-blue-600 bg-white" />
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{deal.to}</div>
                            <div className="text-sm text-gray-600">{deal.toCity}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{deal.airline}</span>
                          <span>•</span>
                          <span>{deal.dates}</span>
                          <span>•</span>
                          <span>{deal.continent}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="mb-2">
                          <span className="text-sm text-gray-500 line-through">€{deal.originalPrice}</span>
                          <div className="text-3xl font-bold text-green-600">€{deal.dealPrice}</div>
                        </div>
                        <div className="text-sm text-green-600 font-medium mb-3">
                          Ahorras €{deal.savings}
                        </div>
                        <Button className="w-full">
                          Ver Oferta
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hotel Deals */}
          <TabsContent value="hotels" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredHotelDeals.map((deal) => (
                <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img 
                      src={deal.image || "/placeholder.svg"} 
                      alt={deal.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className="absolute top-3 left-3 bg-red-600 text-white"
                    >
                      {deal.type}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold mb-1">{deal.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{deal.city}, {deal.country}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{deal.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{deal.dates}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500 line-through">€{deal.originalPrice}/noche</span>
                        <div className="text-2xl font-bold text-green-600">€{deal.dealPrice}/noche</div>
                        <div className="text-sm text-green-600">Ahorras €{deal.savings}</div>
                      </div>
                      <Button>
                        Ver Hotel
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Community Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Comunidad Premium
            </CardTitle>
            <CardDescription>
              Conecta con otros viajeros y comparte experiencias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Únete a nuestro grupo privado de Telegram para recibir ofertas exclusivas y consejos de viaje
              </p>
              <Button size="lg">
                Unirse al Grupo Premium
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
