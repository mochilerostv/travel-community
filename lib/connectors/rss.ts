import { XMLParser } from "fast-xml-parser"
import { fingerprintDeal } from "../dedupe"
import type { Deal } from "../types/deals"
import { extractDealWithAI, quickHeuristicParse } from "../ai/extract"

type RssItem = {
  title?: string
  link?: string
  description?: string
  "content:encoded"?: string
  pubDate?: string
}

export async function fetchRssDeals(source: string, feedUrl: string) {
  const res = await fetch(feedUrl, { headers: { "user-agent": "TravelDealsBot/1.0" } })
  const xml = await res.text()

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    removeNSPrefix: true,
  })
  const data = parser.parse(xml)

  const items: RssItem[] =
    data?.rss?.channel?.item ??
    data?.feed?.entry?.map((e: any) => ({
      title: e.title,
      link: e.link?.["@_href"] || e.link,
      description: e.summary || e.content,
      pubDate: e.updated || e.published,
    })) ??
    []

  const deals: Deal[] = []

  for (const item of items.slice(0, 25)) {
    const title = item.title || ""
    const url = (item.link as any) || ""
    const html = item["content:encoded"] || item.description || ""
    const text = stripHtml(html)
    // 1) Heurística rápida
    const parsed = quickHeuristicParse(title + "\n" + text)
    // 2) IA opcional para mejorar extracción si hay API key
    const enriched = await extractDealWithAI({ title, text, url, source, seed: parsed })

    const now = new Date().toISOString()
    const fingerprint = fingerprintDeal({
      source,
      route: enriched.route || parsed.route,
      price: enriched.price ?? parsed.price,
      currency: enriched.currency ?? parsed.currency,
      dates: enriched.dates ?? parsed.dates,
      url,
    })

    deals.push({
      id: fingerprint,
      source: source as any,
      url,
      title,
      description: text.slice(0, 2000),
      route: enriched.route || parsed.route,
      cities: enriched.cities || parsed.cities,
      airline: enriched.airline || parsed.airline,
      price: enriched.price ?? parsed.price,
      currency: enriched.currency ?? parsed.currency,
      originalPrice: enriched.originalPrice ?? parsed.originalPrice,
      discountPct: enriched.discountPct ?? parsed.discountPct,
      dates: enriched.dates ?? parsed.dates,
      continent: enriched.continent ?? parsed.continent,
      type: enriched.type ?? parsed.type,
      verified: true,
      expiresAt: enriched.expiresAt ?? parsed.expiresAt,
      fingerprint,
      createdAt: now,
      raw: { item },
    })
  }

  return deals
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
}
