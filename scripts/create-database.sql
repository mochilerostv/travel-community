-- =============================================================================
-- TRAVELDEALS PRO - ESQUEMA DE BASE DE DATOS
-- Digital Tsunami SL
-- =============================================================================

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- TABLA: users
-- Almacena información de usuarios registrados
-- =============================================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    preferences JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}'
);

-- =============================================================================
-- TABLA: subscriptions
-- Gestiona suscripciones de Stripe
-- =============================================================================
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    stripe_customer_id VARCHAR(255) NOT NULL,
    stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
    stripe_price_id VARCHAR(255) NOT NULL,
    plan_type VARCHAR(50) NOT NULL CHECK (plan_type IN ('premium', 'premium_plus')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid')),
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT false,
    canceled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- =============================================================================
-- TABLA: deals
-- Almacena ofertas de viaje
-- =============================================================================
CREATE TABLE IF NOT EXISTS deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'EUR',
    category VARCHAR(50) NOT NULL CHECK (category IN ('flight', 'hotel', 'insurance')),
    destination VARCHAR(255),
    departure_location VARCHAR(255),
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    image_url TEXT,
    external_url TEXT,
    affiliate_url TEXT,
    source VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    view_count INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    savings DECIMAL(10,2) GENERATED ALWAYS AS (original_price - price) STORED,
    discount_percentage INTEGER GENERATED ALWAYS AS (
        CASE 
            WHEN original_price > 0 THEN ROUND(((original_price - price) / original_price * 100)::numeric)
            ELSE 0 
        END
    ) STORED,
    metadata JSONB DEFAULT '{}',
    search_vector tsvector GENERATED ALWAYS AS (
        to_tsvector('spanish', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(destination, ''))
    ) STORED
);

-- =============================================================================
-- TABLA: deal_categories
-- Categorías de ofertas
-- =============================================================================
CREATE TABLE IF NOT EXISTS deal_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7), -- Hex color
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- TABLA: user_preferences
-- Preferencias de alertas de usuarios
-- =============================================================================
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    departure_airports TEXT[], -- Array de códigos de aeropuerto
    preferred_destinations TEXT[],
    max_price DECIMAL(10,2),
    categories TEXT[], -- Array de categorías preferidas
    email_notifications BOOLEAN DEFAULT true,
    telegram_notifications BOOLEAN DEFAULT false,
    telegram_chat_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- TABLA: deal_views
-- Tracking de visualizaciones de ofertas
-- =============================================================================
CREATE TABLE IF NOT EXISTS deal_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- TABLA: deal_clicks
-- Tracking de clicks en ofertas
-- =============================================================================
CREATE TABLE IF NOT EXISTS deal_clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- TABLA: rss_sources
-- Fuentes RSS para ingesta automática
-- =============================================================================
CREATE TABLE IF NOT EXISTS rss_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL UNIQUE,
    category VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    last_fetched TIMESTAMP WITH TIME ZONE,
    last_success TIMESTAMP WITH TIME ZONE,
    fetch_interval INTEGER DEFAULT 3600, -- segundos
    error_count INTEGER DEFAULT 0,
    last_error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- =============================================================================
-- TABLA: ai_extractions
-- Log de extracciones de IA
-- =============================================================================
CREATE TABLE IF NOT EXISTS ai_extractions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_url TEXT,
    content_hash VARCHAR(64), -- SHA256 del contenido
    extracted_data JSONB,
    confidence_score DECIMAL(3,2),
    model_used VARCHAR(100),
    processing_time INTEGER, -- milisegundos
    success BOOLEAN DEFAULT false,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- =============================================================================
-- TABLA: notifications
-- Sistema de notificaciones
-- =============================================================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'deal_alert', 'subscription', 'system'
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- TABLA: webhook_events
-- Log de eventos de webhooks (Stripe, etc.)
-- =============================================================================
CREATE TABLE IF NOT EXISTS webhook_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source VARCHAR(50) NOT NULL, -- 'stripe', 'telegram', etc.
    event_type VARCHAR(100) NOT NULL,
    event_id VARCHAR(255) UNIQUE,
    data JSONB NOT NULL,
    processed BOOLEAN DEFAULT false,
    processed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =============================================================================

-- Índices para users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

-- Índices para subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_type ON subscriptions(plan_type);

-- Índices para deals
CREATE INDEX IF NOT EXISTS idx_deals_category ON deals(category);
CREATE INDEX IF NOT EXISTS idx_deals_is_active ON deals(is_active);
CREATE INDEX IF NOT EXISTS idx_deals_valid_until ON deals(valid_until);
CREATE INDEX IF NOT EXISTS idx_deals_created_at ON deals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_deals_price ON deals(price);
CREATE INDEX IF NOT EXISTS idx_deals_destination ON deals(destination);
CREATE INDEX IF NOT EXISTS idx_deals_search_vector ON deals USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_deals_featured ON deals(is_featured, created_at DESC) WHERE is_featured = true;

-- Índices para user_preferences
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- Índices para deal_views
CREATE INDEX IF NOT EXISTS idx_deal_views_deal_id ON deal_views(deal_id);
CREATE INDEX IF NOT EXISTS idx_deal_views_user_id ON deal_views(user_id);
CREATE INDEX IF NOT EXISTS idx_deal_views_created_at ON deal_views(created_at);

-- Índices para deal_clicks
CREATE INDEX IF NOT EXISTS idx_deal_clicks_deal_id ON deal_clicks(deal_id);
CREATE INDEX IF NOT EXISTS idx_deal_clicks_user_id ON deal_clicks(user_id);
CREATE INDEX IF NOT EXISTS idx_deal_clicks_created_at ON deal_clicks(created_at);

-- Índices para rss_sources
CREATE INDEX IF NOT EXISTS idx_rss_sources_is_active ON rss_sources(is_active);
CREATE INDEX IF NOT EXISTS idx_rss_sources_last_fetched ON rss_sources(last_fetched);

-- Índices para ai_extractions
CREATE INDEX IF NOT EXISTS idx_ai_extractions_content_hash ON ai_extractions(content_hash);
CREATE INDEX IF NOT EXISTS idx_ai_extractions_created_at ON ai_extractions(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_extractions_success ON ai_extractions(success);

-- Índices para notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Índices para webhook_events
CREATE INDEX IF NOT EXISTS idx_webhook_events_source ON webhook_events(source);
CREATE INDEX IF NOT EXISTS idx_webhook_events_event_type ON webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_webhook_events_processed ON webhook_events(processed);
CREATE INDEX IF NOT EXISTS idx_webhook_events_created_at ON webhook_events(created_at);

-- =============================================================================
-- FUNCIONES Y TRIGGERS
-- =============================================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rss_sources_updated_at BEFORE UPDATE ON rss_sources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para incrementar view_count
CREATE OR REPLACE FUNCTION increment_deal_view_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE deals SET view_count = view_count + 1 WHERE id = NEW.deal_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Función para incrementar click_count
CREATE OR REPLACE FUNCTION increment_deal_click_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE deals SET click_count = click_count + 1 WHERE id = NEW.deal_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para contadores
CREATE TRIGGER increment_view_count AFTER INSERT ON deal_views FOR EACH ROW EXECUTE FUNCTION increment_deal_view_count();
CREATE TRIGGER increment_click_count AFTER INSERT ON deal_clicks FOR EACH ROW EXECUTE FUNCTION increment_deal_click_count();

-- =============================================================================
-- VISTAS ÚTILES
-- =============================================================================

-- Vista de ofertas activas con estadísticas
CREATE OR REPLACE VIEW active_deals_with_stats AS
SELECT 
    d.*,
    COALESCE(d.view_count, 0) as views,
    COALESCE(d.click_count, 0) as clicks,
    CASE 
        WHEN d.view_count > 0 THEN ROUND((d.click_count::decimal / d.view_count::decimal) * 100, 2)
        ELSE 0 
    END as ctr_percentage,
    EXTRACT(DAYS FROM (d.valid_until - NOW())) as days_remaining
FROM deals d
WHERE d.is_active = true 
    AND (d.valid_until IS NULL OR d.valid_until > NOW())
ORDER BY d.created_at DESC;

-- Vista de usuarios con suscripciones
CREATE OR REPLACE VIEW users_with_subscriptions AS
SELECT 
    u.*,
    s.plan_type,
    s.status as subscription_status,
    s.current_period_end,
    s.cancel_at_period_end,
    s.stripe_customer_id
FROM users u
LEFT JOIN subscriptions s ON u.id = s.user_id
WHERE u.is_active = true;

-- Vista de estadísticas de ofertas por categoría
CREATE OR REPLACE VIEW deals_stats_by_category AS
SELECT 
    category,
    COUNT(*) as total_deals,
    COUNT(*) FILTER (WHERE is_active = true) as active_deals,
    AVG(price) as avg_price,
    AVG(original_price) as avg_original_price,
    AVG(discount_percentage) as avg_discount,
    SUM(view_count) as total_views,
    SUM(click_count) as total_clicks
FROM deals
GROUP BY category;

-- =============================================================================
-- DATOS INICIALES
-- =============================================================================

-- Insertar categorías por defecto
INSERT INTO deal_categories (name, slug, description, icon, color) VALUES
('Vuelos', 'flights', 'Ofertas de vuelos nacionales e internacionales', 'plane', '#3B82F6'),
('Hoteles', 'hotels', 'Alojamientos y resorts con descuentos especiales', 'hotel', '#10B981'),
('Seguros', 'insurance', 'Seguros de viaje y asistencia médica', 'shield', '#8B5CF6')
ON CONFLICT (slug) DO NOTHING;

-- Insertar fuentes RSS por defecto
INSERT INTO rss_sources (name, url, category, is_active) VALUES
('Chollos Viajes', 'https://www.chollometro.com/rss/grupo/viajes', 'flight', true),
('Viajes Piratas', 'https://www.viajespirata.com/feed/', 'flight', true),
('Logitravel Ofertas', 'https://www.logitravel.com/rss/ofertas.xml', 'hotel', true)
ON CONFLICT (url) DO NOTHING;

-- =============================================================================
-- COMENTARIOS Y DOCUMENTACIÓN
-- =============================================================================

COMMENT ON TABLE users IS 'Usuarios registrados en la plataforma';
COMMENT ON TABLE subscriptions IS 'Suscripciones de Stripe vinculadas a usuarios';
COMMENT ON TABLE deals IS 'Ofertas de viaje (vuelos, hoteles, seguros)';
COMMENT ON TABLE deal_categories IS 'Categorías de ofertas';
COMMENT ON TABLE user_preferences IS 'Preferencias de alertas de usuarios';
COMMENT ON TABLE deal_views IS 'Registro de visualizaciones de ofertas';
COMMENT ON TABLE deal_clicks IS 'Registro de clicks en ofertas';
COMMENT ON TABLE rss_sources IS 'Fuentes RSS para ingesta automática';
COMMENT ON TABLE ai_extractions IS 'Log de extracciones realizadas por IA';
COMMENT ON TABLE notifications IS 'Sistema de notificaciones para usuarios';
COMMENT ON TABLE webhook_events IS 'Log de eventos de webhooks externos';

-- =============================================================================
-- PERMISOS Y SEGURIDAD
-- =============================================================================

-- Crear rol para la aplicación (opcional)
-- CREATE ROLE traveldeals_app WITH LOGIN PASSWORD 'secure_password';
-- GRANT CONNECT ON DATABASE traveldeals TO traveldeals_app;
-- GRANT USAGE ON SCHEMA public TO traveldeals_app;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO traveldeals_app;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO traveldeals_app;

-- =============================================================================
-- FIN DEL SCRIPT
-- =============================================================================

-- Verificar que todas las tablas se crearon correctamente
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN (
        'users', 'subscriptions', 'deals', 'deal_categories', 
        'user_preferences', 'deal_views', 'deal_clicks', 
        'rss_sources', 'ai_extractions', 'notifications', 'webhook_events'
    )
ORDER BY tablename;
