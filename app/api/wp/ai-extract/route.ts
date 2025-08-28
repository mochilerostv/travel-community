import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    // Token opcional (si configuras AI_PROXY_TOKEN en Vercel)
    const requiredToken = process.env.AI_PROXY_TOKEN
    if (requiredToken) {
      const token = req.headers.get("x-ai-proxy-token") || req.nextUrl.searchParams.get("token")
      if (token !== requiredToken) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
      }
    }

    const { title = "", text = "", url = "", source = "wordpress" } = await req.json()

    // Si no hay OpenAI API key, devolver datos básicos
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: true,
        data: {
          title,
          url,
          source,
          message: "IA no disponible - configura OPENAI_API_KEY",
          extracted: false,
        },
      })
    }

    // Extracción con IA
    const prompt = `
Eres un extractor de datos para ofertas de viaje. A partir del título y el texto, devuelve un JSON con:
- route: { from (IATA o vacío), to (IATA o vacío) }
- cities: { fromCity, toCity }
- airline
- price (número), currency (EUR|USD|GBP|OTHER)
- originalPrice (si aparece)
- discountPct (si aparece)
- dates (texto corto)
- continent (si se infiere)
- type ("Error de Tarifa" | "Oferta Flash" | "Promo" | "Otro")
- expiresAt (ISO, si hay deadline)

Título: ${title}
Texto: ${text.slice(0, 3500)}
URL: ${url}
Fuente: ${source}

Responde solo JSON válido.
`

    const { text: aiResponse } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    let extractedData = {}
    try {
      extractedData = JSON.parse(aiResponse)
    } catch {
      // Si falla el parsing, devolver datos básicos
      extractedData = { message: "Error parsing AI response" }
    }

    return NextResponse.json({
      success: true,
      data: {
        ...extractedData,
        title,
        url,
        source,
        extracted: true,
      },
    })
  } catch (e) {
    console.error("wp/ai-extract error", e)
    return NextResponse.json({ success: false, message: "AI extract error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    message: "AI Extract endpoint activo",
    methods: ["POST"],
    requiredFields: ["title", "text"],
    optionalFields: ["url", "source"],
    timestamp: new Date().toISOString(),
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-ai-proxy-token",
    },
  })
}
