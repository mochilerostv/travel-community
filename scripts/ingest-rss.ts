// Node script de ejemplo para probar una fuente RSS desde consola
// Ejecuta en v0 con "Run" o localmente con ts-node
import { XMLParser } from "fast-xml-parser"

async function main() {
  const feed = "https://www.secretflying.com/feed/"
  const res = await fetch(feed, { headers: { "user-agent": "TravelDealsBot/1.0" } })
  const xml = await res.text()
  const parser = new XMLParser({ ignoreAttributes: false, removeNSPrefix: true })
  const data = parser.parse(xml)
  const items = data?.rss?.channel?.item ?? []
  console.log("Items:", items.length)
  for (const it of items.slice(0, 3)) {
    console.log("- ", it.title)
    console.log("  ", it.link)
  }
}

main().catch(console.error)
