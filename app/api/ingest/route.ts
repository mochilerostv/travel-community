import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const sources: string[] = body?.sources?.length ? body.sources : ["secretflying", "viajerospiratas", "traveldealz"]

    // Simulación de ingesta (en producción conectarías con RSS reales)
    const mockResults = sources.map((source) => ({
      source,
      count: Math.floor(Math.random() * 20) + 5,
      deals: generateMockDeals(source),
      status: "success",
      processedAt: new Date().toISOString(),
    }))

    const total = mockResults.reduce((sum, r) => sum + r.count, 0)

    return NextResponse.json({
      success: true,
      total,
      groups: mockResults,
      message: `Procesadas ${total} ofertas de ${sources.length} fuentes`,
      timestamp: new Date().toISOString(),
    })
  } catch (e) {
    console.error("Ingest error", e)
    return NextResponse.json({ success: false, message: "Error en ingesta" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint de ingesta RSS activo",
    methods: ["GET", "POST"],
    description: "Procesa fuentes RSS de ofertas de viaje",
    defaultSources: ["secretflying", "viajerospiratas", "traveldealz"],
    usage: {
      POST: {
        body: {
          sources: ["array de fuentes opcionales"],
        },
      },
    },
    timestamp: new Date().toISOString(),
  })
}

function generateMockDeals(source: string) {
  const deals = [
    {
      id: `${source}-001`,
      title: "Madrid → París desde 89€",
      price: 89,
      currency: "EUR",
      route: { from: "MAD", to: "CDG" },
      cities: { fromCity: "Madrid", toCity: "París" },
      airline: "Vueling",
      type: "Error de Tarifa",
      dates: "Febrero-Marzo 2024",
      url: `https://${source}.com/deal-001`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      source,
    },
    {
      id: `${source}-002`,
      title: "Barcelona → Roma desde 45€",
      price: 45,
      currency: "EUR",
      route: { from: "BCN", to: "FCO" },
      cities: { fromCity: "Barcelona", toCity: "Roma" },
      airline: "Ryanair",
      type: "Oferta Flash",
      dates: "Enero-Abril 2024",
      url: `https://${source}.com/deal-002`,
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      source,
    },
    {
      id: `${source}-003`,
      title: "Sevilla → Londres desde 67€",
      price: 67,
      currency: "EUR",
      route: { from: "SVQ", to: "LGW" },
      cities: { fromCity: "Sevilla", toCity: "Londres" },
      airline: "easyJet",
      type: "Promo",
      dates: "Marzo-Mayo 2024",
      url: `https://${source}.com/deal-003`,
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      source,
    },
  ]

  return deals.slice(0, Math.floor(Math.random() * 3) + 1)
}
