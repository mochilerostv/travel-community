import crypto from "crypto"
import type { Deal } from "./types/deals"

export function fingerprintDeal(d: Partial<Deal>) {
  const key = [
    d.source || "",
    (d.route?.from || "").toUpperCase(),
    (d.route?.to || "").toUpperCase(),
    d.dates || "",
    Math.round((d.price || 0) / 5) * 5, // normaliza al múltiplo de 5
    d.currency || "",
    d.url || "",
  ].join("|")
  return crypto.createHash("sha1").update(key).digest("hex")
}

export function dedupe(deals: Deal[]): Deal[] {
  const seen = new Set<string>()
  const out: Deal[] = []
  for (const d of deals) {
    if (seen.has(d.fingerprint)) continue
    seen.add(d.fingerprint)
    out.push(d)
  }
  return out
}
