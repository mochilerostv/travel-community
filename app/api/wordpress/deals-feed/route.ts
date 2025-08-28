import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const source = searchParams.get("source") || "all"

    // Datos de ejemplo de ofertas
    const mockDeals = [
      {
        id: "deal-001",
        title: "Madrid → París desde 89€",
        description: "Vuelo directo con Vueling. Fechas flexibles en febrero y marzo.",
        price: 89,
        originalPrice: 150,
        currency: "EUR",
        discountPct: 41,
        route: { from: "MAD", to: "CDG" },
        cities: { fromCity: "Madrid", toCity: "París" },
        airline: "Vueling",
        type: "Error de Tarifa",
        dates: "Feb-Mar 2024",
        url: "https://example.com/deal-001",
        imageUrl: "/paris-eiffel-tower.png",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        source: "secretflying",
        verified: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "deal-002",
        title: "Barcelona → Roma desde 45€",
        description: "Oferta flash con Ryanair. Solo hasta agotar existencias.",
        price: 45,
        originalPrice: 80,
        currency: "EUR",
        discountPct: 44,
        route: { from: "BCN", to: "FCO" },
        cities: { fromCity: "Barcelona", toCity: "Roma" },
        airline: "Ryanair",
        type: "Oferta Flash",
        dates: "Ene-Abr 2024",
        url: "https://example.com/deal-002",
        imageUrl: "/rome-colosseum.png",
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        source: "viajerospiratas",
        verified: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "deal-003",
        title: "Sevilla → Londres desde 67€",
        description: "Promoción especial con easyJet. Incluye equipaje de mano.",
        price: 67,
        originalPrice: 120,
        currency: "EUR",
        discountPct: 44,
        route: { from: "SVQ", to: "LGW" },
        cities: { fromCity: "Sevilla", toCity: "Londres" },
        airline: "easyJet",
        type: "Promo",
        dates: "Mar-May 2024",
        url: "https://example.com/deal-003",
        imageUrl: "/london-big-ben.png",
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        source: "traveldealz",
        verified: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "deal-004",
        title: "Valencia → Milán desde 52€",
        description: "Error de tarifa confirmado. Reserva rápido antes de que lo corrijan.",
        price: 52,
        originalPrice: 95,
        currency: "EUR",
        discountPct: 45,
        route: { from: "VLC", to: "MXP" },
        cities: { fromCity: "Valencia", toCity: "Milán" },
        airline: "Vueling",
        type: "Error de Tarifa",
        dates: "Abr-Jun 2024",
        url: "https://example.com/deal-004",
        imageUrl: "/milan-cathedral.png",
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        source: "secretflying",
        verified: true,
        createdAt: new Date().toISOString(),
      },
    ]

    // Filtrar por fuente si se especifica
    let filteredDeals = mockDeals
    if (source !== "all") {
      filteredDeals = mockDeals.filter((deal) => deal.source === source)
    }

    // Limitar resultados
    const deals = filteredDeals.slice(0, limit)

    return NextResponse.json({
      success: true,
      deals,
      total: deals.length,
      filters: {
        source,
        limit,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo ofertas",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Endpoint de feed de ofertas - usa GET method",
    methods: ["GET"],
    parameters: {
      limit: "número de ofertas (default: 10)",
      source: "fuente específica (default: all)",
    },
    timestamp: new Date().toISOString(),
  })
}
