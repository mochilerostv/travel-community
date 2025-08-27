import { NextRequest, NextResponse } from "next/server"
import { RSS_SOURCES } from "@/lib/connectors/rss-sources"
import { fetchRssDeals } from "@/lib/connectors/rss"
import { dedupe } from "@/lib/dedupe"

/**
 * Endpoint pensado para Cron de Vercel (cada 5-10 min).
 * Añade un token simple si quieres protegerlo (?token=...).
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token")
    if (process.env.CRON_TOKEN && token !== process.env.CRON_TOKEN) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const sources = ["secretflying", "viajerospiratas", "traveldealz"]
    const results = []
    for (const s of sources) {
      const url = (RSS_SOURCES as any)[s]
      if (!url) continue
      const deals = await fetchRssDeals(s, url)
      results.push({ source: s, count: deals.length, deals })
    }
    const unique = dedupe(results.flatMap(r => r.deals))

    // TODO: guardar en BD y disparar alertas
    return NextResponse.json({ success: true, total: unique.length })
  } catch (e) {
    console.error("Cron ingest error", e)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
