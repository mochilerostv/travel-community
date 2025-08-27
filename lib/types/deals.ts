export type DealSource =
  | "secretflying"
  | "viajerospiratas"
  | "traveldealz"
  | "dollarflightclub"
  | "amadeus"
  | "tequila"
  | "skyscanner"

export type Currency = "EUR" | "USD" | "GBP" | "OTHER"

export interface DealRoute {
  from?: string // IATA (MAD)
  to?: string // IATA (JFK)
}

export interface Deal {
  id: string
  source: DealSource
  url: string
  title: string
  description?: string
  route?: DealRoute
  cities?: { fromCity?: string; toCity?: string }
  airline?: string
  price?: number
  currency?: Currency | string
  originalPrice?: number
  discountPct?: number
  dates?: string // libre-formato "15-22 Mar"
  continent?: string
  type?: "Error de Tarifa" | "Oferta Flash" | "Promo" | "Otro"
  verified?: boolean
  expiresAt?: string
  fingerprint: string
  createdAt: string
  raw?: any // payload bruto por si hace falta
}
