import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const continent = searchParams.get('continent')
    const type = searchParams.get('type')

    // Mock deals data - replace with your actual database query
    const allDeals = [
      {
        id: 1,
        title: 'Madrid → Nueva York',
        type: 'flight',
        originalPrice: 850,
        dealPrice: 299,
        savings: 551,
        continent: 'América del Norte',
        image: '/api/placeholder/400/200',
        url: 'https://example.com/deal-1',
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: 2,
        title: 'Hotel Luxury Palace - París',
        type: 'hotel',
        originalPrice: 320,
        dealPrice: 89,
        savings: 231,
        continent: 'Europa',
        image: '/api/placeholder/400/200',
        url: 'https://example.com/deal-2',
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        verified: true
      }
    ]

    let filteredDeals = allDeals

    if (continent && continent !== 'all') {
      filteredDeals = filteredDeals.filter(deal => deal.continent === continent)
    }

    if (type && type !== 'all') {
      filteredDeals = filteredDeals.filter(deal => deal.type === type)
    }

    const deals = filteredDeals.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: deals,
      total: filteredDeals.length,
      generated_at: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching deals feed:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching deals' 
      },
      { status: 500 }
    )
  }
}
