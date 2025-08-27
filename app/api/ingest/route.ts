import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { source, content } = body

    // Simular procesamiento de ingesta
    const processed = {
      id: Math.random().toString(36).substr(2, 9),
      source: source || "unknown",
      content: content || "",
      processed_at: new Date().toISOString(),
      status: "processed",
    }

    return NextResponse.json({
      success: true,
      message: "Contenido procesado correctamente",
      data: processed,
    })
  } catch (error) {
    console.error("Ingest error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error en ingesta",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint de ingesta activo",
    methods: ["POST"],
    timestamp: new Date().toISOString(),
  })
}
