import { NextRequest, NextResponse } from 'next/server'

// Mock database of deals
const mockDeals = [
  {
    id: 1,
    type: 'flight',
    from: 'MAD',
    to: 'NYC',
    fromCity: 'Madrid',
    toCity: 'Nueva York',
    originalPrice: 850,
    dealPrice: 299,
    savings: 551,
    airline: 'Iberia',
    dates: '15-22 Mar',
    dealType: 'Error de Tarifa',
    continent: 'América del Norte',
    verified: true,
    timeLeft: '2h 15m',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    type: 'flight',
    from: 'BCN',
    to: 'BKK',
    fromCity: 'Barcelona',
    toCity: 'Bangkok',
    originalPrice: 720,
    dealPrice: 385,
    savings: 335,
    airline: 'Qatar Airways',
    dates: '10-24 Abr',
    dealType: 'Oferta Flash',
    continent: 'Asia',
    verified: true,
    timeLeft: '5h 42m',
    createdAt: new Date().toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const continent = searchParams.get('continent')
    const airport = searchParams.get('airport')
    const type = searchParams.get('type')

    let filteredDeals = mockDeals

    if (continent && continent !== 'all') {
      filteredDeals = filteredDeals.filter(deal => deal.continent === continent)
    }

    if (airport && airport !== 'all') {
      filteredDeals = filteredDeals.filter(deal => deal.from === airport)
    }

    if (type && type !== 'all') {
      filteredDeals = filteredDeals.filter(deal => deal.type === type)
    }

    return NextResponse.json({
      success: true,
      data: filteredDeals,
      total: filteredDeals.length
    })

  } catch (error) {
    console.error('Error fetching deals:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error obteniendo ofertas' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['type', 'title', 'originalPrice', 'dealPrice', 'continent']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { 
            success: false, 
            message: `Campo requerido: ${field}` 
          },
          { status: 400 }
        )
      }
    }

    // Create new deal
    const newDeal = {
      id: Date.now(),
      ...body,
      savings: body.originalPrice - body.dealPrice,
      verified: false,
      createdAt: new Date().toISOString()
    }

    // In a real implementation, save to database
    mockDeals.push(newDeal)

    return NextResponse.json({
      success: true,
      message: 'Oferta creada exitosamente',
      data: newDeal
    })

  } catch (error) {
    console.error('Error creating deal:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error creando oferta' 
      },
      { status: 500 }
    )
  }
}
