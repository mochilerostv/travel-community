/**
 * Mochileros Travel Deals - JavaScript
 * Funcionalidades del lado cliente para el plugin
 */

;(($) => {
  // Variables globales
  const dealsCache = {}
  const currentFilters = {
    source: "all",
    type: "all",
    limit: 10,
  }
  const mochileros_ajax = window.mochileros_ajax // Declare mochileros_ajax variable
  const gtag = window.gtag // Declare gtag variable

  // Inicialización cuando el DOM está listo
  $(document).ready(() => {
    initializeDashboard()
    initializeFeedShortcodes()
    initializeAdminFunctions()
    setupEventListeners()
  })

  /**
   * Inicializar dashboard de ofertas
   */
  function initializeDashboard() {
    const dashboard = $(".mochileros-dashboard")
    if (dashboard.length === 0) return

    // Obtener configuración del dashboard
    currentFilters.limit = dashboard.data("limit") || 10
    currentFilters.source = dashboard.data("source") || "all"

    // Cargar ofertas iniciales
    loadDeals()

    // Auto-refresh cada 5 minutos
    setInterval(
      () => {
        if ($("#auto-refresh").is(":checked")) {
          loadDeals(false) // Sin mostrar loading
        }
      },
      5 * 60 * 1000,
    )
  }

  /**
   * Inicializar feeds de shortcodes
   */
  function initializeFeedShortcodes() {
    $(".mochileros-deals-feed").each(function () {
      const feed = $(this)
      const limit = feed.data("limit") || 3
      const source = feed.data("source") || "all"
      const layout = feed.data("layout") || "grid"

      loadFeedDeals(feed, { limit, source, layout })
    })
  }

  /**
   * Funciones del panel de administración
   */
  function initializeAdminFunctions() {
    if (!$(".mochileros-admin-dashboard").length) return

    // Test de conexión API
    $("#test-api").on("click", () => {
      testApiConnection()
    })

    // Sincronizar ofertas
    $("#sync-deals").on("click", () => {
      syncDeals()
    })

    // Test de IA
    $("#test-ai").on("click", () => {
      testAIExtraction()
    })

    // Auto-test al cargar la página admin
    setTimeout(testApiConnection, 1000)
  }

  /**
   * Configurar event listeners
   */
  function setupEventListeners() {
    // Filtros del dashboard
    $("#source-filter, #type-filter").on("change", () => {
      currentFilters.source = $("#source-filter").val() || "all"
      currentFilters.type = $("#type-filter").val() || "all"
      loadDeals()
    })

    // Botón de refresh
    $("#refresh-deals").on("click", () => {
      loadDeals()
    })

    // Botones de paginación
    $(document).on("click", ".pagination-btn", function () {
      const page = $(this).data("page")
      loadDeals(true, page)
    })

    // Modal de detalles de oferta
    $(document).on("click", ".deal-details-btn", function () {
      const dealId = $(this).data("deal-id")
      showDealModal(dealId)
    })

    // Favoritos
    $(document).on("click", ".favorite-btn", function () {
      const dealId = $(this).data("deal-id")
      toggleFavorite(dealId)
    })
  }

  /**
   * Cargar ofertas del dashboard
   */
  function loadDeals(showLoading = true, page = 1) {
    const container = $("#deals-container")

    if (showLoading) {
      container.html('<div class="loading">🔄 Cargando ofertas...</div>')
    }

    // Construir URL con parámetros
    const params = new URLSearchParams({
      limit: currentFilters.limit,
      source: currentFilters.source,
      type: currentFilters.type,
      page: page,
    })

    const apiUrl = mochileros_ajax.api_url + "/api/wordpress/deals-feed?" + params.toString()

    $.get(apiUrl)
      .done((data) => {
        if (data.success && data.deals && data.deals.length > 0) {
          renderDeals(data.deals, container)
          updateStats(data)

          // Cache para uso offline
          dealsCache[currentFilters.source] = data.deals
        } else {
          container.html(`
                        <div class="no-deals">
                            <h3>😔 No se encontraron ofertas</h3>
                            <p>Intenta cambiar los filtros o vuelve más tarde.</p>
                            <button id="retry-load" class="button">Reintentar</button>
                        </div>
                    `)
        }
      })
      .fail((xhr, status, error) => {
        console.error("Error loading deals:", error)

        // Intentar cargar desde cache
        const cachedDeals = dealsCache[currentFilters.source]
        if (cachedDeals && cachedDeals.length > 0) {
          renderDeals(cachedDeals, container)
          showNotification("Mostrando ofertas guardadas (sin conexión)", "warning")
        } else {
          container.html(`
                        <div class="error">
                            <h3>❌ Error de conexión</h3>
                            <p>No se pudieron cargar las ofertas. Verifica tu conexión.</p>
                            <button id="retry-load" class="button">Reintentar</button>
                        </div>
                    `)
        }
      })

    // Event listener para reintentar
    $(document)
      .off("click", "#retry-load")
      .on("click", "#retry-load", () => {
        loadDeals()
      })
  }

  /**
   * Renderizar ofertas en el contenedor
   */
  function renderDeals(deals, container) {
    let html = ""

    deals.forEach((deal, index) => {
      const savings = deal.originalPrice ? deal.originalPrice - deal.price : 0
      const discountPct = deal.discountPct || (savings > 0 ? Math.round((savings / deal.originalPrice) * 100) : 0)
      const expiresAt = new Date(deal.expiresAt)
      const now = new Date()
      const hoursLeft = Math.max(0, Math.floor((expiresAt - now) / (1000 * 60 * 60)))
      const isUrgent = hoursLeft <= 6
      const isFavorite = getFavorites().includes(deal.id)

      html += `
                <div class="deal-card ${isUrgent ? "urgent" : ""} ${deal.verified ? "verified" : ""}" data-deal-id="${deal.id}">
                    <div class="deal-header">
                        <span class="deal-type ${deal.type.toLowerCase().replace(/\s+/g, "-")}">${deal.type}</span>
                        <div class="deal-actions">
                            <button class="favorite-btn ${isFavorite ? "active" : ""}" data-deal-id="${deal.id}" title="Añadir a favoritos">
                                ${isFavorite ? "❤️" : "🤍"}
                            </button>
                            <span class="deal-source">${deal.source}</span>
                        </div>
                    </div>
                    
                    <div class="deal-route">
                        <div class="route-info">
                            <span class="city">${deal.cities.fromCity}</span>
                            <span class="iata">${deal.route.from}</span>
                        </div>
                        <span class="arrow">✈️</span>
                        <div class="route-info">
                            <span class="city">${deal.cities.toCity}</span>
                            <span class="iata">${deal.route.to}</span>
                        </div>
                    </div>
                    
                    <div class="deal-price">
                        <span class="current-price">${deal.price}€</span>
                        ${deal.originalPrice ? `<span class="original-price">${deal.originalPrice}€</span>` : ""}
                        ${discountPct > 0 ? `<span class="discount-badge">-${discountPct}%</span>` : ""}
                        ${savings > 0 ? `<span class="savings">Ahorra ${savings}€</span>` : ""}
                    </div>
                    
                    <div class="deal-details">
                        <div class="detail-row">
                            <span class="label">✈️ Aerolínea:</span>
                            <span class="value">${deal.airline}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">📅 Fechas:</span>
                            <span class="value">${deal.dates}</span>
                        </div>
                        ${
                          hoursLeft > 0
                            ? `
                            <div class="detail-row expires ${isUrgent ? "urgent" : ""}">
                                <span class="label">⏰ Expira en:</span>
                                <span class="value">${formatTimeLeft(hoursLeft)}</span>
                            </div>
                        `
                            : ""
                        }
                        ${
                          deal.continent
                            ? `
                            <div class="detail-row">
                                <span class="label">🌍 Continente:</span>
                                <span class="value">${deal.continent}</span>
                            </div>
                        `
                            : ""
                        }
                    </div>
                    
                    <div class="deal-buttons">
                        <a href="${deal.url}" target="_blank" class="deal-button primary" onclick="trackDealClick('${deal.id}', '${deal.source}')">
                            Ver Oferta
                        </a>
                        <button class="deal-button secondary deal-details-btn" data-deal-id="${deal.id}">
                            Detalles
                        </button>
                    </div>
                    
                    ${deal.verified ? '<div class="verified-badge" title="Oferta verificada">✓</div>' : ""}
                </div>
            `
    })

    container.html(html)

    // Animar entrada de las tarjetas
    $(".deal-card").each(function (index) {
      $(this).css("animation-delay", index * 0.1 + "s")
    })
  }

  /**
   * Cargar ofertas para feeds de shortcode
   */
  function loadFeedDeals(feedElement, options) {
    const { limit, source, layout } = options

    feedElement.html('<div class="deals-loading">🔄 Cargando ofertas...</div>')

    const params = new URLSearchParams({ limit, source })
    const apiUrl = mochileros_ajax.api_url + "/api/wordpress/deals-feed?" + params.toString()

    $.get(apiUrl)
      .done((data) => {
        if (data.success && data.deals && data.deals.length > 0) {
          renderFeedDeals(data.deals, feedElement, layout)
        } else {
          feedElement.html('<div class="no-deals">No hay ofertas disponibles</div>')
        }
      })
      .fail(() => {
        feedElement.html('<div class="error">Error al cargar ofertas</div>')
      })
  }

  /**
   * Renderizar ofertas para feeds
   */
  function renderFeedDeals(deals, container, layout) {
    let html = `<div class="deals-${layout}">`

    deals.forEach((deal) => {
      const savings = deal.originalPrice ? deal.originalPrice - deal.price : 0

      if (layout === "list") {
        html += `
                    <div class="deal-item">
                        <div class="deal-info">
                            <h4>${deal.title}</h4>
                            <p class="deal-price">${deal.price}€ ${savings > 0 ? `<span class="savings-small">(-${savings}€)</span>` : ""}</p>
                            <p class="deal-route">${deal.cities.fromCity} → ${deal.cities.toCity}</p>
                            <p class="deal-airline">${deal.airline} • ${deal.dates}</p>
                        </div>
                        <div class="deal-actions">
                            <a href="${deal.url}" target="_blank" class="deal-link" onclick="trackDealClick('${deal.id}', '${deal.source}')">Ver Oferta</a>
                        </div>
                    </div>
                `
      } else {
        html += `
                    <div class="deal-item">
                        <div class="deal-info">
                            <h4>${deal.title}</h4>
                            <p class="deal-price">${deal.price}€</p>
                            <p class="deal-route">${deal.cities.fromCity} → ${deal.cities.toCity}</p>
                            <p class="deal-meta">${deal.airline}</p>
                        </div>
                        <a href="${deal.url}" target="_blank" class="deal-link" onclick="trackDealClick('${deal.id}', '${deal.source}')">Ver Oferta</a>
                    </div>
                `
      }
    })

    html += "</div>"
    container.html(html)
  }

  /**
   * Funciones del panel de administración
   */
  function testApiConnection() {
    $("#api-status").html('<span style="color: orange;">🔄 Probando...</span>')

    $.get(mochileros_ajax.api_url + "/api/health")
      .done((data) => {
        $("#api-status").html('<span style="color: green;">✅ Conectado</span>')
        $("#ai-status").text(data.ai === "available" ? "✅ Activa" : "❌ Inactiva")

        if (data.endpoints) {
          console.log("Endpoints disponibles:", data.endpoints)
        }

        showNotification("Conexión API exitosa", "success")
      })
      .fail((xhr) => {
        $("#api-status").html('<span style="color: red;">❌ Error de conexión</span>')
        $("#ai-status").text("❌ No disponible")

        const errorMsg = xhr.status === 404 ? "API no encontrada" : "Error de conexión"
        showNotification("Error: " + errorMsg, "error")
      })
  }

  function syncDeals() {
    const button = $("#sync-deals")
    const originalText = button.text()

    button.text("🔄 Sincronizando...").prop("disabled", true)

    $.post(mochileros_ajax.api_url + "/api/ingest", {
      sources: ["secretflying", "viajerospiratas", "traveldealz"],
    })
      .done((data) => {
        $("#deals-count").text(data.total || 0)
        showNotification(`Ofertas sincronizadas: ${data.total || 0}`, "success")

        // Recargar ofertas si estamos en el dashboard
        if ($("#deals-container").length) {
          loadDeals()
        }
      })
      .fail(() => {
        showNotification("Error al sincronizar ofertas", "error")
      })
      .always(() => {
        button.text(originalText).prop("disabled", false)
      })
  }

  function testAIExtraction() {
    const testData = {
      title: "Madrid París 89€",
      text: "Vuelo directo Madrid-París por solo 89€ con Vueling. Fechas disponibles en febrero y marzo.",
      url: "https://example.com/test",
      source: "test",
    }

    $.ajax({
      url: mochileros_ajax.api_url + "/api/wp/ai-extract",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ai-proxy-token": mochileros_ajax.api_token || "",
      },
      data: JSON.stringify(testData),
    })
      .done((data) => {
        if (data.success) {
          console.log("Test IA exitoso:", data.data)
          showNotification("Test de IA exitoso", "success")
        } else {
          showNotification("Test de IA falló: " + data.message, "warning")
        }
      })
      .fail(() => {
        showNotification("Error en test de IA", "error")
      })
  }

  /**
   * Utilidades
   */
  function formatTimeLeft(hours) {
    if (hours < 1) return "Menos de 1h"
    if (hours < 24) return hours + "h"
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    return days + "d " + (remainingHours > 0 ? remainingHours + "h" : "")
  }

  function updateStats(data) {
    if (data.total) {
      $("#total-deals").text(data.total)
    }
    if (data.timestamp) {
      $("#last-update").text("Actualizado: " + new Date(data.timestamp).toLocaleTimeString())
    }
  }

  function showNotification(message, type = "info") {
    const notification = $(`
            <div class="mochileros-notification ${type}">
                <span>${message}</span>
                <button class="close-notification">×</button>
            </div>
        `)

    $("body").append(notification)

    // Auto-hide después de 5 segundos
    setTimeout(() => {
      notification.fadeOut(function () {
        $(this).remove()
      })
    }, 5000)

    // Cerrar manualmente
    notification.find(".close-notification").on("click", () => {
      notification.fadeOut(function () {
        $(this).remove()
      })
    })
  }

  function trackDealClick(dealId, source) {
    // Analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", "deal_click", {
        deal_id: dealId,
        source: source,
        event_category: "deals",
        event_label: source,
      })
    }

    // Enviar a la API para estadísticas
    $.post(mochileros_ajax.ajax_url, {
      action: "mochileros_track_click",
      deal_id: dealId,
      source: source,
      nonce: mochileros_ajax.nonce,
    })
  }

  function getFavorites() {
    const favorites = localStorage.getItem("mochileros_favorites")
    return favorites ? JSON.parse(favorites) : []
  }

  function toggleFavorite(dealId) {
    const favorites = getFavorites()
    const index = favorites.indexOf(dealId)

    if (index > -1) {
      favorites.splice(index, 1)
      $(`.favorite-btn[data-deal-id="${dealId}"]`).removeClass("active").text("🤍")
    } else {
      favorites.push(dealId)
      $(`.favorite-btn[data-deal-id="${dealId}"]`).addClass("active").text("❤️")
    }

    localStorage.setItem("mochileros_favorites", JSON.stringify(favorites))
  }

  function showDealModal(dealId) {
    // Implementar modal con detalles de la oferta
    const modal = $(`
            <div class="mochileros-modal-overlay">
                <div class="mochileros-modal">
                    <div class="modal-header">
                        <h3>Detalles de la Oferta</h3>
                        <button class="modal-close">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="loading">Cargando detalles...</div>
                    </div>
                </div>
            </div>
        `)

    $("body").append(modal)

    // Cerrar modal
    modal.find(".modal-close, .mochileros-modal-overlay").on("click", function (e) {
      if (e.target === this) {
        modal.fadeOut(function () {
          $(this).remove()
        })
      }
    })

    // Cargar detalles (simulado)
    setTimeout(() => {
      modal.find(".modal-body").html(`
                <p>Detalles completos de la oferta ${dealId}</p>
                <p>Esta funcionalidad se puede expandir para mostrar más información.</p>
            `)
    }, 1000)
  }

  // Exponer funciones globalmente si es necesario
  window.MochilerosDeals = {
    loadDeals: loadDeals,
    testApiConnection: testApiConnection,
    syncDeals: syncDeals,
    trackDealClick: trackDealClick,
  }
})(window.jQuery) // Use window.jQuery to ensure jQuery is declared

// CSS adicional para notificaciones
const notificationCSS = `
<style>
.mochileros-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideInRight 0.3s ease-out;
}

.mochileros-notification.success { background: #10b981; }
.mochileros-notification.error { background: #ef4444; }
.mochileros-notification.warning { background: #f59e0b; }
.mochileros-notification.info { background: #3b82f6; }

.close-notification {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
}

.mochileros-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mochileros-modal {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
}

.modal-body {
    padding: 1.5rem;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
`

// Inyectar CSS
if (!document.getElementById("mochileros-notification-css")) {
  const style = document.createElement("div")
  style.id = "mochileros-notification-css"
  style.innerHTML = notificationCSS
  document.head.appendChild(style)
}
