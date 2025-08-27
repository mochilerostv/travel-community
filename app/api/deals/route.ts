import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Datos de ejemplo de ofertas
    const mockDeals = [
      {
        id: "deal_001",
        title: "Madrid → París desde 89€",
        description: "Vuelos directos con Iberia. Fechas flexibles en marzo.",
        origin: "Madrid",
        destination: "París",
        price: 89,
        currency: "EUR",
        deal_type: "flight",
        airline: "Iberia",
        dates: "Marzo 2024",
        url: "https://example.com/deal1",
        image: "/paris-eiffel-tower.png",
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "deal_002",
        title: "Hotel 5★ en Cancún desde 120€/noche",
        description: "Resort todo incluido frente al mar. Cancelación gratuita.",
        origin: null,
        destination: "Cancún",
        price: 120,
        currency: "EUR",
        deal_type: "hotel",
        hotel: "Grand Oasis",
        dates: "Abril-Mayo 2024",
        url: "https://example.com/deal2",
        image: "/cancun-beach-resort.png",
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "deal_003",
        title: "Barcelona → Roma desde 45€",
        description: "Error de tarifa confirmado. ¡Solo hoy!",
        origin: "Barcelona",
        destination: "Roma",
        price: 45,
        currency: "EUR",
        deal_type: "flight",
        airline: "Ryanair",
        dates: "Junio 2024",
        url: "https://example.com/deal3",
        image: "/rome-colosseum.png",
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        is_error_fare: true,
      },
    ]

    return NextResponse.json({
      success: true,
      deals: mockDeals,
      total: mockDeals.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Deals feed error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error obteniendo ofertas",
      },
      { status: 500 },
    )
  }
}
