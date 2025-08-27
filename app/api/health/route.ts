import { NextResponse } from "next/server"

/**
 * Health check endpoint para verificar que la API está funcionando
 * Usado por el plugin WordPress para verificar conectividad
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "API funcionando correctamente",
      timestamp: new Date().toISOString(),
      version: "1.4.0",
      endpoints: {
        health: "/api/health",
        ai_extract: "/api/wp/ai-extract",
        ingest: "/api/ingest",
        subscription_check: "/api/wordpress/subscription-check",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error en health check",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
