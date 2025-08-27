import { NextRequest, NextResponse } from "next/server"
import { RSS_SOURCES } from "@/lib/connectors/rss-sources"
import { fetchRssDeals } from "@/lib/connectors/rss"
import { dedupe } from "@/lib/dedupe"

/**
 * Ingesta de fuentes (RSS) y normalización. Ejecutable por POST.
 * Esto usa Route Handlers del App Router [^5].
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const sources: string[] = body?.sources?.length
      ? body.sources
      : ["secretflying", "viajerospiratas", "traveldealz"]

    const all: any[] = []

    for (const s of sources) {
      const url = (RSS_SOURCES as any)[s]
      if (!url) {
        all.push({ source: s, deals: [], note: "Fuente no soportada o sin RSS" })
        continue
      }
      try {
        const deals = await fetchRssDeals(s, url)
        all.push({ source: s, count: deals.length, deals })
      } catch (e) {
        console.error("RSS error", s, e)
        all.push({ source: s, error: (e as Error).message })
      }
    }

    // Aplana y deduplica por fingerprint
    const flat = all.flatMap((g: any) => g.deals || [])
    const unique = dedupe(flat)

    // TODO: persistir en BD (Neon/Postgres) y publicar en dashboard
    return NextResponse.json({
      success: true,
      total: unique.length,
      groups: all,
    })
  } catch (e) {
    console.error("Ingest error", e)
    return NextResponse.json({ success: false, message: "Error en ingesta" }, { status: 500 })
  }
}
