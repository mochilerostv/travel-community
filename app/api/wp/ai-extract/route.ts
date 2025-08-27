import { type NextRequest, NextResponse } from "next/server"
import { extractDealWithAI, quickHeuristicParse } from "@/lib/ai/extract"

/**
 * Proxy de extracción IA para WordPress.
 * Recibe { title, text, url?, source? } y devuelve campos estructurados.
 */
export async function POST(req: NextRequest) {
  try {
    // Token opcional (si configuras AI_PROXY_TOKEN en Vercel)
    const requiredToken = process.env.AI_PROXY_TOKEN
    if (requiredToken) {
      const token = req.headers.get("x-ai-proxy-token") || req.nextUrl.searchParams.get("token")
      if (token !== requiredToken) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
      }
    }

    const { title = "", text = "", url = "", source = "wordpress" } = await req.json()

    // Heurística rápida como semilla
    const seed = quickHeuristicParse(`${title}\n${text}`)
    // IA opcional: si no hay OPENAI_API_KEY, extractDealWithAI devuelve seed
    const enriched = await extractDealWithAI({ title, text, url, source, seed })

    return NextResponse.json({
      success: true,
      data: {
        ...enriched,
        title,
        url,
        source,
      },
    })
  } catch (e) {
    console.error("wp/ai-extract error", e)
    return NextResponse.json({ success: false, message: "AI extract error" }, { status: 500 })
  }
}
