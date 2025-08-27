import type { DealSource } from "../types/deals"

// RSS públicos conocidos (pueden cambiar; respeta robots.txt y TOS)
export const RSS_SOURCES: Partial<Record<DealSource, string>> = {
  secretflying: "https://www.secretflying.com/feed/",
  // Spanish HolidayPirates (Viajeros Piratas)
  viajerospiratas: "https://www.viajerospiratas.es/feed",
  // Travel Dealz (global), si hay edición ES cámbialo a su feed específico
  traveldealz: "https://travel-dealz.com/feed/",
  // Dollar Flight Club: sin RSS público → integrar por acuerdos o newsletter parsing
  dollarflightclub: "", // marcador
}
