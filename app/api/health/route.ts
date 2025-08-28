import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "TravelDeals Pro API funcionando correctamente",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      aiExtract: "/api/wp/ai-extract",
      ingest: "/api/ingest",
    },
  })
}
