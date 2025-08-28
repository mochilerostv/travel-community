import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type") || "all"
    const source = searchParams.get("source") || "all"

    // Generar deals de ejemplo
    const mockDeals = generateDealsForFeed(limit, type, source)

    return NextResponse.json({
      success: true,
      deals: mockDeals,
      total: mockDeals.length,
      filters: {
        limit,
        type,
        source,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Deals feed error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error obteniendo feed de ofertas",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { filters } = await request.json()
    const deals = generateDealsForFeed(filters?.limit || 10, filters?.type || "all", filters?.source || "all")

    return NextResponse.json({
      success: true,
      deals,
      total: deals.length,
      filters,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Deals feed POST error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error procesando filtros de ofertas",
      },
      { status: 500 },
    )
  }
}

function generateDealsForFeed(limit: number, type: string, source: string) {
  const allDeals = [
    {
      id: "deal-001",
      title: "Madrid → París desde 89€",
      price: 89,
      originalPrice: 150,
      currency: "EUR",
      discountPct: 41,
      route: { from: "MAD", to: "CDG" },
      cities: { fromCity: "Madrid", toCity: "París" },
      airline: "Vueling",
      type: "Error de Tarifa",
      dates: "Feb-Mar 2024",
      url: "https://secretflying.com/deal-001",
      source: "secretflying",
      continent: "Europe",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: "deal-002",
      title: "Barcelona → Roma desde 45€",
      price: 45,
      originalPrice: 89,
      currency: "EUR",
      discountPct: 49,
      route: { from: "BCN", to: "FCO" },
      cities: { fromCity: "Barcelona", toCity: "Roma" },
      airline: "Ryanair",
      type: "Oferta Flash",
      dates: "Ene-Abr 2024",
      url: "https://viajerospiratas.com/deal-002",
      source: "viajerospiratas",
      continent: "Europe",
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: "deal-003",
      title: "Sevilla → Londres desde 67€",
      price: 67,
      originalPrice: 120,
      currency: "EUR",
      discountPct: 44,
      route: { from: "SVQ", to: "LGW" },
      cities: { fromCity: "Sevilla", toCity: "Londres" },
      airline: "easyJet",
      type: "Promo",
      dates: "Mar-May 2024",
      url: "https://traveldealz.com/deal-003",
      source: "traveldealz",
      continent: "Europe",
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: "deal-004",
      title: "Valencia → Milán desde 52€",
      price: 52,
      originalPrice: 95,
      currency: "EUR",
      discountPct: 45,
      route: { from: "VLC", to: "MXP" },
      cities: { fromCity: "Valencia", toCity: "Milán" },
      airline: "Vueling",
      type: "Error de Tarifa",
      dates: "Abr-Jun 2024",
      url: "https://secretflying.com/deal-004",
      source: "secretflying",
      continent: "Europe",
      expiresAt: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: "deal-005",
      title: "Bilbao → Ámsterdam desde 78€",
      price: 78,
      originalPrice: 140,
      currency: "EUR",
      discountPct: 44,
      route: { from: "BIO", to: "AMS" },
      cities: { fromCity: "Bilbao", toCity: "Ámsterdam" },
      airline: "KLM",
      type: "Oferta Flash",
      dates: "Feb-Abr 2024",
      url: "https://viajerospiratas.com/deal-005",
      source: "viajerospiratas",
      continent: "Europe",
      expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
  ]

  let filteredDeals = allDeals

  // Filtrar por tipo
  if (type !== "all") {
    filteredDeals = filteredDeals.filter((deal) => deal.type.toLowerCase().includes(type.toLowerCase()))
  }

  // Filtrar por fuente
  if (source !== "all") {
    filteredDeals = filteredDeals.filter((deal) => deal.source === source)
  }

  // Limitar resultados
  return filteredDeals.slice(0, limit)
}
