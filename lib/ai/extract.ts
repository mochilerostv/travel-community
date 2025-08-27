import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { Deal } from "../types/deals"

/**
 * Extracción IA (opcional). Si no hay OPENAI_API_KEY, devolvemos seed tal cual.
 */
export async function extractDealWithAI(input: {
  title: string
  text: string
  url: string
  source: string
  seed?: Partial<Deal>
}): Promise<Partial<Deal>> {
  if (!process.env.OPENAI_API_KEY) {
    return input.seed || {}
  }

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

Título: ${input.title}
Texto: ${input.text.slice(0, 3500)}
URL: ${input.url}
Fuente: ${input.source}

Responde solo JSON válido.
`

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
  })

  try {
    const obj = JSON.parse(text)
    return obj
  } catch {
    return input.seed || {}
  }
}

// Heurística simple por si no usamos IA o como semilla
export function quickHeuristicParse(text: string): Partial<Deal> {
  const out: Partial<Deal> = {}
  // Precio: €999 o 999€ o $999
  const m = text.match(/(?:€\s?(\d{2,5})|(\d{2,5})\s?€|\$\s?(\d{2,5}))/)
  if (m) {
    const price = Number.parseInt(m[1] || m[2] || m[3], 10)
    out.price = price
    out.currency = m[1] || m[2] ? "EUR" : "USD"
  }

  // Posible par de IATA (MAD - JFK / BCN→BKK)
  const r = text.match(/([A-Z]{3})\s?(?:-|→|–|—|to)\s?([A-Z]{3})/)
  if (r) {
    out.route = { from: r[1], to: r[2] }
  }

  // Tipo
  if (/error de tarifa|error fare|mistake fare/i.test(text)) out.type = "Error de Tarifa"
  else if (/oferta flash|flash sale/i.test(text)) out.type = "Oferta Flash"

  // Fechas simplificadas
  const d = text.match(/\b(\d{1,2}\s?-\s?\d{1,2}\s?(?:[A-Za-z]{3,}|[/.]\d{1,2}))/)
  if (d) out.dates = d[0]

  return out
}
