import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    // Verificar token de autorización
    const authHeader = request.headers.get("authorization")
    const expectedToken = process.env.AI_PROXY_TOKEN

    if (!authHeader || !expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { url, content, type } = await request.json()

    if (!url && !content) {
      return NextResponse.json({ error: "URL o contenido requerido" }, { status: 400 })
    }

    // Verificar que OpenAI esté configurado
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI no configurado" }, { status: 500 })
    }

    const prompt = `
Analiza el siguiente contenido de viajes y extrae información sobre ofertas de vuelos, hoteles o seguros de viaje.

${content ? `Contenido: ${content}` : `URL: ${url}`}

Extrae la siguiente información si está disponible:
- Título de la oferta
- Descripción
- Precio actual
- Precio original (si hay descuento)
- Destino
- Fechas de validez
- Categoría (flight, hotel, insurance)
- Porcentaje de descuento
- Detalles adicionales relevantes

Responde en formato JSON con la estructura:
{
  "offers": [
    {
      "title": "string",
      "description": "string",
      "price": number,
      "originalPrice": number,
      "destination": "string",
      "validUntil": "string",
      "category": "flight|hotel|insurance",
      "discount": number,
      "savings": number,
      "details": "string"
    }
  ],
  "confidence": number,
  "source": "string"
}

Si no encuentras ofertas válidas, devuelve un array vacío en "offers".
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 1000,
    })

    let extractedData
    try {
      extractedData = JSON.parse(text)
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError)
      return NextResponse.json(
        {
          success: false,
          error: "Error procesando respuesta de IA",
          rawResponse: text,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: extractedData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in AI scanner:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "AI Scanner API",
    description: "Extrae ofertas de viaje usando inteligencia artificial",
    methods: ["POST"],
    requiredHeaders: ["Authorization: Bearer <AI_PROXY_TOKEN>"],
    requiredFields: ["url OR content"],
    optionalFields: ["type"],
    timestamp: new Date().toISOString(),
  })
}
