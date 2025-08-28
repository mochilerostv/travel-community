import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Verificar variables de entorno críticas
    const openaiKey = process.env.OPENAI_API_KEY
    const aiToken = process.env.AI_PROXY_TOKEN
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    // Estado de la IA
    let aiStatus = "unavailable"
    if (openaiKey) {
      aiStatus = openaiKey.startsWith("sk-") ? "available" : "invalid_key"
    }

    // Información del sistema
    const healthData = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: {
        openai: openaiKey ? "configured" : "missing",
        aiToken: aiToken ? "configured" : "missing",
        baseUrl: baseUrl || "auto-detected",
      },
      ai: aiStatus,
      endpoints: {
        health: "/api/health",
        aiExtract: "/api/wp/ai-extract",
        ingest: "/api/ingest",
        wordpress: {
          subscriptionCheck: "/api/wordpress/subscription-check",
          dealsFeed: "/api/wordpress/deals-feed",
        },
      },
      version: "1.0.0",
    }

    return NextResponse.json(healthData)
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  return NextResponse.json({
    status: "ok",
    message: "Health check endpoint - use GET method",
    timestamp: new Date().toISOString(),
  })
}
