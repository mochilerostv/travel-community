import { type NextRequest, NextResponse } from "next/server"

// Mock data - en producción esto vendría de una base de datos
const mockDeals = [
  {
    id: "1",
    title: "Vuelo Madrid-París desde €29",
    description: "Vuelo directo con Vueling. Fechas flexibles en marzo y abril. Equipaje de mano incluido.",
    price: 29,
    originalPrice: 199,
    category: "flight",
    destination: "París, Francia",
    validUntil: "2024-04-30",
    isActive: true,
    createdAt: "2024-02-15",
    image: "/paris-eiffel-tower.png",
    savings: 170,
    discount: 85,
  },
  {
    id: "2",
    title: "Hotel 5* en Roma desde €45/noche",
    description: "Hotel de lujo en el centro histórico. Desayuno incluido y cancelación gratuita.",
    price: 45,
    originalPrice: 180,
    category: "hotel",
    destination: "Roma, Italia",
    validUntil: "2024-05-15",
    isActive: true,
    createdAt: "2024-02-14",
    image: "/rome-colosseum.png",
    savings: 135,
    discount: 75,
  },
  {
    id: "3",
    title: "Seguro de viaje anual desde €19",
    description: "Cobertura mundial con asistencia 24/7. Incluye COVID-19 y deportes de aventura.",
    price: 19,
    originalPrice: 89,
    category: "insurance",
    destination: "Mundial",
    validUntil: "2024-12-31",
    isActive: true,
    createdAt: "2024-02-13",
    image: "/travel-insurance-concept.png",
    savings: 70,
    discount: 79,
  },
  {
    id: "4",
    title: "Resort Todo Incluido Cancún desde €299",
    description: "7 noches en resort 5* frente al mar. Todo incluido con bebidas premium.",
    price: 299,
    originalPrice: 899,
    category: "hotel",
    destination: "Cancún, México",
    validUntil: "2024-06-30",
    isActive: true,
    createdAt: "2024-02-12",
    image: "/cancun-beach-resort.png",
    savings: 600,
    discount: 67,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = searchParams.get("limit")

    let filteredDeals = mockDeals

    // Filtrar por categoría si se especifica
    if (category && category !== "all") {
      filteredDeals = mockDeals.filter((deal) => deal.category === category)
    }

    // Limitar resultados si se especifica
    if (limit) {
      const limitNum = Number.parseInt(limit)
      filteredDeals = filteredDeals.slice(0, limitNum)
    }

    return NextResponse.json({
      success: true,
      deals: filteredDeals,
      total: filteredDeals.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching deals:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, price, originalPrice, category, destination, validUntil } = body

    // Validar campos requeridos
    if (!title || !description || !price || !originalPrice || !category || !destination || !validUntil) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Validar categoría
    if (!["flight", "hotel", "insurance"].includes(category)) {
      return NextResponse.json({ error: "Categoría no válida" }, { status: 400 })
    }

    // Crear nueva oferta (en producción se guardaría en base de datos)
    const newDeal = {
      id: Date.now().toString(),
      title,
      description,
      price: Number.parseFloat(price),
      originalPrice: Number.parseFloat(originalPrice),
      category,
      destination,
      validUntil,
      isActive: true,
      createdAt: new Date().toISOString(),
      image: `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(title)}`,
      savings: Number.parseFloat(originalPrice) - Number.parseFloat(price),
      discount: Math.round(
        ((Number.parseFloat(originalPrice) - Number.parseFloat(price)) / Number.parseFloat(originalPrice)) * 100,
      ),
    }

    // En producción, aquí se guardaría en la base de datos
    mockDeals.unshift(newDeal)

    return NextResponse.json({
      success: true,
      deal: newDeal,
      message: "Oferta creada exitosamente",
    })
  } catch (error) {
    console.error("Error creating deal:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dealId = searchParams.get("id")

    if (!dealId) {
      return NextResponse.json({ error: "ID de oferta requerido" }, { status: 400 })
    }

    // En producción, aquí se eliminaría de la base de datos
    const dealIndex = mockDeals.findIndex((deal) => deal.id === dealId)

    if (dealIndex === -1) {
      return NextResponse.json({ error: "Oferta no encontrada" }, { status: 404 })
    }

    mockDeals.splice(dealIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Oferta eliminada exitosamente",
    })
  } catch (error) {
    console.error("Error deleting deal:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
