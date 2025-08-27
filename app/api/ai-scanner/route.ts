import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Verificar variables de entorno
    const openaiKey = process.env.OPENAI_API_KEY
    const aiToken = process.env.AI_PROXY_TOKEN
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    return NextResponse.json({
      success: true,
      status: "ok",
      message: "API funcionando correctamente",
      timestamp: new Date().toISOString(),
      version: "1.4.0",
      environment: {
        openai: openaiKey ? "configured" : "missing",
        aiToken: aiToken ? "configured" : "missing",
        baseUrl: baseUrl || "not-set",
        nodeEnv: process.env.NODE_ENV || "unknown",
      },
      ai: openaiKey ? "available" : "unavailable",
      endpoints: {
        health: "/api/health",
        ai_extract: "/api/wp/ai-extract",
        ingest: "/api/ingest",
        subscription_check: "/api/wordpress/subscription-check",
      },
    })
  } catch (error) {
    console.error("Health check error:", error)
    return NextResponse.json(
      {
        success: false,
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

