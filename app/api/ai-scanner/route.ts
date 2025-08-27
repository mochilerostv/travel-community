import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    // Verificar token de seguridad (opcional)
    const token = request.headers.get("x-ai-proxy-token")
    const expectedToken = process.env.AI_PROXY_TOKEN

    if (expectedToken && token !== expectedToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Token de autorización inválido",
        },
        { status: 401 },
      )
    }

    // Verificar clave OpenAI
    const openaiKey = process.env.OPENAI_API_KEY
    if (!openaiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Clave OpenAI no configurada",
        },
        { status: 500 },
      )
    }

    // Obtener contenido del request
    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error: "Contenido requerido",
        },
        { status: 400 },
      )
    }

    // Extraer información con IA
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `
        Analiza este contenido de viaje y extrae la información estructurada:
        
        Contenido: "${content}"
        
        Extrae SOLO si está claramente mencionado:
        - Origen (ciudad/aeropuerto)
        - Destino (ciudad/aeropuerto)  
        - Precio (número)
        - Moneda (EUR, USD, etc.)
        - Tipo de oferta (flight, hotel, package)
        - Fechas si están disponibles
        
        Responde en formato JSON válido:
        {
          "origin": "ciudad o null",
          "destination": "ciudad o null", 
          "price": número o null,
          "currency": "moneda o null",
          "deal_type": "flight/hotel/package o null",
          "dates": "fechas o null",
          "is_deal": true/false
        }
      `,
    })

    // Parsear respuesta JSON
    let extracted
    try {
      extracted = JSON.parse(text)
    } catch (parseError) {
      // Si no es JSON válido, crear estructura básica
      extracted = {
        origin: null,
        destination: null,
        price: null,
        currency: null,
        deal_type: null,
        dates: null,
        is_deal: false,
        raw_analysis: text,
      }
    }

    return NextResponse.json({
      success: true,
      extracted,
      original_content: content,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI Extract error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

// Permitir OPTIONS para CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-ai-proxy-token",
    },
  })
}
