-- =============================================================================
-- TRAVELDEALS PRO - DATOS DE PRUEBA
-- Digital Tsunami SL
-- =============================================================================

-- Limpiar datos existentes (solo para desarrollo)
-- TRUNCATE TABLE deal_clicks, deal_views, notifications, ai_extractions, user_preferences, deals, subscriptions, users, rss_sources, deal_categories RESTART IDENTITY CASCADE;

-- =============================================================================
-- USUARIOS DE PRUEBA
-- =============================================================================

INSERT INTO users (id, email, name, created_at, preferences) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'admin@digitaltsunamis.com',
    'Administrador',
    NOW() - INTERVAL '30 days',
    '{"role": "admin", "notifications": true}'
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'usuario1@example.com',
    'María García',
    NOW() - INTERVAL '15 days',
    '{"departure_city": "Madrid", "preferred_destinations": ["París", "Roma", "Londres"]}'
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    'usuario2@example.com',
    'Carlos López',
    NOW() - INTERVAL '10 days',
    '{"departure_city": "Barcelona", "max_budget": 500}'
),
(
    '550e8400-e29b-41d4-a716-446655440004',
    'usuario3@example.com',
    'Ana Martínez',
    NOW() - INTERVAL '5 days',
    '{"departure_city": "Valencia", "categories": ["hotel", "flight"]}'
)
ON CONFLICT (email) DO NOTHING;

-- =============================================================================
-- SUSCRIPCIONES DE PRUEBA
-- =============================================================================

INSERT INTO subscriptions (
    id, user_id, stripe_customer_id, stripe_subscription_id, stripe_price_id,
    plan_type, status, current_period_start, current_period_end
) VALUES
(
    '660e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
    'cus_test_customer_1',
    'sub_test_subscription_1',
    'price_premium_test',
    'premium',
    'active',
    NOW() - INTERVAL '15 days',
    NOW() + INTERVAL '15 days'
),
(
    '660e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440003',
    'cus_test_customer_2',
    'sub_test_subscription_2',
    'price_premium_plus_test',
    'premium_plus',
    'active',
    NOW() - INTERVAL '10 days',
    NOW() + INTERVAL '20 days'
)
ON CONFLICT (stripe_subscription_id) DO NOTHING;

-- =============================================================================
-- CATEGORÍAS DE OFERTAS
-- =============================================================================

INSERT INTO deal_categories (id, name, slug, description, icon, color, sort_order) VALUES
(
    '770e8400-e29b-41d4-a716-446655440001',
    'Vuelos',
    'flights',
    'Ofertas de vuelos nacionales e internacionales con los mejores precios',
    'plane',
    '#3B82F6',
    1
),
(
    '770e8400-e29b-41d4-a716-446655440002',
    'Hoteles',
    'hotels',
    'Alojamientos y resorts con descuentos especiales',
    'hotel',
    '#10B981',
    2
),
(
    '770e8400-e29b-41d4-a716-446655440003',
    'Seguros',
    'insurance',
    'Seguros de viaje y asistencia médica internacional',
    'shield',
    '#8B5CF6',
    3
),
(
    '770e8400-e29b-41d4-a716-446655440004',
    'Paquetes',
    'packages',
    'Paquetes completos de viaje con vuelo + hotel',
    'package',
    '#F59E0B',
    4
)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- OFERTAS DE PRUEBA
-- =============================================================================

INSERT INTO deals (
    id, title, description, price, original_price, category, destination,
    departure_location, valid_until, is_active, is_featured, image_url,
    external_url, source, created_by, view_count, click_count
) VALUES
-- Vuelos
(
    '880e8400-e29b-41d4-a716-446655440001',
    'Vuelo Madrid-París desde €29',
    'Vuelo directo con Vueling. Fechas flexibles en marzo y abril. Equipaje de mano incluido. Reserva hasta 24h antes del vuelo.',
    29.00,
    199.00,
    'flight',
    'París, Francia',
    'Madrid, España',
    NOW() + INTERVAL '45 days',
    true,
    true,
    '/paris-eiffel-tower.png',
    'https://www.vueling.com',
    'Vueling',
    '550e8400-e29b-41d4-a716-446655440001',
    1250,
    89
),
(
    '880e8400-e29b-41d4-a716-446655440002',
    'Barcelona-Roma ida y vuelta €45',
    'Vuelos con Ryanair. Válido para viajes en mayo y junio. Sin equipaje facturado.',
    45.00,
    180.00,
    'flight',
    'Roma, Italia',
    'Barcelona, España',
    NOW() + INTERVAL '60 days',
    true,
    false,
    '/rome-colosseum.png',
    'https://www.ryanair.com',
    'Ryanair',
    '550e8400-e29b-41d4-a716-446655440001',
    890,
    67
),
(
    '880e8400-e29b-41d4-a716-446655440003',
    'Madrid-Londres desde €39',
    'British Airways. Vuelos directos disponibles todo el año. Incluye comida y bebida.',
    39.00,
    220.00,
    'flight',
    'Londres, Reino Unido',
    'Madrid, España',
    NOW() + INTERVAL '90 days',
    true,
    true,
    '/placeholder.svg?height=200&width=300',
    'https://www.britishairways.com',
    'British Airways',
    '550e8400-e29b-41d4-a716-446655440001',
    2100,
    156
),

-- Hoteles
(
    '880e8400-e29b-41d4-a716-446655440004',
    'Hotel 5* en Roma desde €45/noche',
    'Hotel de lujo en el centro histórico. Desayuno incluido y cancelación gratuita hasta 24h antes. WiFi gratis y spa.',
    45.00,
    180.00,
    'hotel',
    'Roma, Italia',
    NULL,
    NOW() + INTERVAL '75 days',
    true,
    true,
    '/rome-colosseum.png',
    'https://www.booking.com',
    'Booking.com',
    '550e8400-e29b-41d4-a716-446655440001',
    1680,
    234
),
(
    '880e8400-e29b-41d4-a716-446655440005',
    'Resort Todo Incluido Cancún desde €299',
    '7 noches en resort 5* frente al mar. Todo incluido con bebidas premium. Actividades acuáticas incluidas.',
    299.00,
    899.00,
    'hotel',
    'Cancún, México',
    NULL,
    NOW() + INTERVAL '120 days',
    true,
    true,
    '/cancun-beach-resort.png',
    'https://www.expedia.com',
    'Expedia',
    '550e8400-e29b-41d4-a716-446655440001',
    3200,
    445
),
(
    '880e8400-e29b-41d4-a716-446655440006',
    'Hotel Boutique París €89/noche',
    'Hotel boutique en Montmartre. Vistas a la Torre Eiffel. Desayuno continental incluido.',
    89.00,
    250.00,
    'hotel',
    'París, Francia',
    NULL,
    NOW() + INTERVAL '50 days',
    true,
    false,
    '/paris-eiffel-tower.png',
    'https://www.hotels.com',
    'Hotels.com',
    '550e8400-e29b-41d4-a716-446655440001',
    756,
    98
),

-- Seguros
(
    '880e8400-e29b-41d4-a716-446655440007',
    'Seguro de viaje anual desde €19',
    'Cobertura mundial con asistencia 24/7. Incluye COVID-19 y deportes de aventura. Cancelación de viaje incluida.',
    19.00,
    89.00,
    'insurance',
    'Mundial',
    NULL,
    NOW() + INTERVAL '365 days',
    true,
    false,
    '/placeholder.svg?height=200&width=300',
    'https://www.intermundial.es',
    'InterMundial',
    '550e8400-e29b-41d4-a716-446655440001',
    445,
    67
),
(
    '880e8400-e29b-41d4-a716-446655440008',
    'Seguro Premium Europa €35',
    'Cobertura completa para Europa. Gastos médicos hasta 300.000€. Deportes de invierno incluidos.',
    35.00,
    120.00,
    'insurance',
    'Europa',
    NULL,
    NOW() + INTERVAL '180 days',
    true,
    false,
    '/placeholder.svg?height=200&width=300',
    'https://www.axa-assistance.es',
    'AXA',
    '550e8400-e29b-41d4-a716-446655440001',
    234,
    34
),

-- Ofertas adicionales
(
    '880e8400-e29b-41d4-a716-446655440009',
    'Vuelo Madrid-Nueva York €199',
    'Vuelo directo con Iberia. Temporada baja. Equipaje facturado incluido.',
    199.00,
    650.00,
    'flight',
    'Nueva York, Estados Unidos',
    'Madrid, España',
    NOW() + INTERVAL '30 days',
    true,
    true,
    '/placeholder.svg?height=200&width=300',
    'https://www.iberia.com',
    'Iberia',
    '550e8400-e29b-41d4-a716-446655440001',
    4500,
    567
),
(
    '880e8400-e29b-41d4-a716-446655440010',
    'Hotel Bali 4* desde €65/noche',
    'Resort en primera línea de playa. Piscina infinita y spa. Desayuno buffet incluido.',
    65.00,
    180.00,
    'hotel',
    'Bali, Indonesia',
    NULL,
    NOW() + INTERVAL '100 days',
    true,
    false,
    '/placeholder.svg?height=200&width=300',
    'https://www.agoda.com',
    'Agoda',
    '550e8400-e29b-41d4-a716-446655440001',
    1890,
    234
)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- PREFERENCIAS DE USUARIOS
-- =============================================================================

INSERT INTO user_preferences (
    id, user_id, departure_airports, preferred_destinations, max_price,
    categories, email_notifications, telegram_notifications
) VALUES
(
    '990e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
    ARRAY['MAD', 'BCN'],
    ARRAY['París', 'Roma', 'Londres', 'Ámsterdam'],
    300.00,
    ARRAY['flight', 'hotel'],
    true,
    false
),
(
    '990e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440003',
    ARRAY['BCN', 'VLC'],
    ARRAY['Tokio', 'Bangkok', 'Singapur'],
    500.00,
    ARRAY['flight', 'hotel', 'insurance'],
    true,
    true
),
(
    '990e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440004',
    ARRAY['VLC', 'SVQ'],
    ARRAY['Nueva York', 'Los Ángeles', 'Miami'],
    800.00,
    ARRAY['flight'],
    false,
    false
)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- FUENTES RSS
-- =============================================================================

INSERT INTO rss_sources (
    id, name, url, category, is_active, fetch_interval, last_fetched
) VALUES
(
    'aa0e8400-e29b-41d4-a716-446655440001',
    'Chollos Viajes',
    'https://www.chollometro.com/rss/grupo/viajes',
    'flight',
    true,
    3600,
    NOW() - INTERVAL '2 hours'
),
(
    'aa0e8400-e29b-41d4-a716-446655440002',
    'Viajes Piratas',
    'https://www.viajespirata.com/feed/',
    'flight',
    true,
    3600,
    NOW() - INTERVAL '1 hour'
),
(
    'aa0e8400-e29b-41d4-a716-446655440003',
    'Logitravel Ofertas',
    'https://www.logitravel.com/rss/ofertas.xml',
    'hotel',
    true,
    7200,
    NOW() - INTERVAL '3 hours'
),
(
    'aa0e8400-e29b-41d4-a716-446655440004',
    'Destinia Flash',
    'https://www.destinia.com/rss/ofertas-flash.xml',
    'hotel',
    false,
    3600,
    NULL
)
ON CONFLICT (url) DO NOTHING;

-- =============================================================================
-- VISUALIZACIONES Y CLICKS DE PRUEBA
-- =============================================================================

-- Generar algunas visualizaciones
INSERT INTO deal_views (deal_id, user_id, ip_address, created_at)
SELECT 
    d.id,
    (ARRAY['550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', NULL])[floor(random() * 4 + 1)::int]::uuid,
    ('192.168.1.' || floor(random() * 255 + 1)::text)::inet,
    NOW() - (random() * INTERVAL '30 days')
FROM deals d, generate_series(1, 10) -- 10 visualizaciones por oferta
WHERE d.is_active = true;

-- Generar algunos clicks (menos que visualizaciones)
INSERT INTO deal_clicks (deal_id, user_id, ip_address, created_at)
SELECT 
    d.id,
    (ARRAY['550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', NULL])[floor(random() * 4 + 1)::int]::uuid,
    ('192.168.1.' || floor(random() * 255 + 1)::text)::inet,
    NOW() - (random() * INTERVAL '30 days')
FROM deals d, generate_series(1, 3) -- 3 clicks por oferta
WHERE d.is_active = true;

-- =============================================================================
-- NOTIFICACIONES DE PRUEBA
-- =============================================================================

INSERT INTO notifications (
    id, user_id, type, title, message, data, is_read, created_at
) VALUES
(
    'bb0e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
    'deal_alert',
    '¡Nueva oferta para París!',
    'Hemos encontrado un vuelo Madrid-París por solo €29. ¡No te lo pierdas!',
    '{"deal_id": "880e8400-e29b-41d4-a716-446655440001", "price": 29, "destination": "París"}',
    false,
    NOW() - INTERVAL '2 hours'
),
(
    'bb0e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440003',
    'subscription',
    'Bienvenido a Premium Plus',
    'Tu suscripción Premium Plus está activa. Disfruta de todas las ventajas.',
    '{"plan": "premium_plus", "benefits": ["alertas_personalizadas", "soporte_prioritario"]}',
    true,
    NOW() - INTERVAL '10 days'
),
(
    'bb0e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440004',
    'system',
    'Actualización de la plataforma',
    'Hemos añadido nuevas funcionalidades para mejorar tu experiencia.',
    '{"version": "2.1.0", "features": ["mejor_busqueda", "notificaciones_push"]}',
    false,
    NOW() - INTERVAL '5 days'
)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- EXTRACCIONES DE IA DE PRUEBA
-- =============================================================================

INSERT INTO ai_extractions (
    id, source_url, content_hash, extracted_data, confidence_score,
    model_used, processing_time, success, created_at
) VALUES
(
    'cc0e8400-e29b-41d4-a716-446655440001',
    'https://www.example-travel-site.com/deal/123',
    'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
    '{
        "offers": [
            {
                "title": "Vuelo Madrid-París €29",
                "price": 29,
                "originalPrice": 199,
                "destination": "París",
                "category": "flight",
                "validUntil": "2024-04-30"
            }
        ],
        "confidence": 0.95
    }',
    0.95,
    'gpt-4o',
    1250,
    true,
    NOW() - INTERVAL '1 day'
),
(
    'cc0e8400-e29b-41d4-a716-446655440002',
    'https://www.another-travel-site.com/hotel/456',
    'z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4',
    '{
        "offers": [
            {
                "title": "Hotel Roma 5* €45/noche",
                "price": 45,
                "originalPrice": 180,
                "destination": "Roma",
                "category": "hotel",
                "validUntil": "2024-05-15"
            }
        ],
        "confidence": 0.88
    }',
    0.88,
    'gpt-4o',
    980,
    true,
    NOW() - INTERVAL '6 hours'
)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- EVENTOS DE WEBHOOK DE PRUEBA
-- =============================================================================

INSERT INTO webhook_events (
    id, source, event_type, event_id, data, processed, processed_at
) VALUES
(
    'dd0e8400-e29b-41d4-a716-446655440001',
    'stripe',
    'customer.subscription.created',
    'evt_test_webhook_001',
    '{
        "id": "sub_test_subscription_1",
        "customer": "cus_test_customer_1",
        "status": "active",
        "items": {
            "data": [
                {
                    "price": {
                        "id": "price_premium_test",
                        "unit_amount": 199
                    }
                }
            ]
        }
    }',
    true,
    NOW() - INTERVAL '15 days'
),
(
    'dd0e8400-e29b-41d4-a716-446655440002',
    'stripe',
    'customer.subscription.updated',
    'evt_test_webhook_002',
    '{
        "id": "sub_test_subscription_2",
        "customer": "cus_test_customer_2",
        "status": "active",
        "cancel_at_period_end": false
    }',
    true,
    NOW() - INTERVAL '5 days'
)
ON CONFLICT (event_id) DO NOTHING;

-- =============================================================================
-- VERIFICACIÓN DE DATOS INSERTADOS
-- =============================================================================

-- Mostrar resumen de datos insertados
SELECT 
    'users' as tabla, COUNT(*) as registros FROM users
UNION ALL
SELECT 
    'subscriptions' as tabla, COUNT(*) as registros FROM subscriptions
UNION ALL
SELECT 
    'deals' as tabla, COUNT(*) as registros FROM deals
UNION ALL
SELECT 
    'deal_categories' as tabla, COUNT(*) as registros FROM deal_categories
UNION ALL
SELECT 
    'user_preferences' as tabla, COUNT(*) as registros FROM user_preferences
UNION ALL
SELECT 
    'deal_views' as tabla, COUNT(*) as registros FROM deal_views
UNION ALL
SELECT 
    'deal_clicks' as tabla, COUNT(*) as registros FROM deal_clicks
UNION ALL
SELECT 
    'rss_sources' as tabla, COUNT(*) as registros FROM rss_sources
UNION ALL
SELECT 
    'notifications' as tabla, COUNT(*) as registros FROM notifications
UNION ALL
SELECT 
    'ai_extractions' as tabla, COUNT(*) as registros FROM ai_extractions
UNION ALL
SELECT 
    'webhook_events' as tabla, COUNT(*) as registros FROM webhook_events
ORDER BY tabla;

-- Mostrar estadísticas de ofertas
SELECT 
    category,
    COUNT(*) as total_ofertas,
    AVG(price) as precio_promedio,
    AVG(discount_percentage) as descuento_promedio,
    SUM(view_count) as visualizaciones_totales,
    SUM(click_count) as clicks_totales
FROM deals 
WHERE is_active = true
GROUP BY category
ORDER BY total_ofertas DESC;

-- =============================================================================
-- FIN DEL SCRIPT DE DATOS DE PRUEBA
-- =============================================================================
