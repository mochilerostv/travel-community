-- Create database schema for TravelDeals Pro

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    subscription_status VARCHAR(20) DEFAULT 'active',
    subscription_start DATE DEFAULT CURRENT_DATE,
    subscription_end DATE,
    preferred_airports TEXT[], -- Array of airport codes
    interested_continents TEXT[], -- Array of continent names
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Deals table
CREATE TABLE IF NOT EXISTS deals (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL, -- 'flight', 'hotel', 'package'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    from_location VARCHAR(10), -- Airport code for flights
    to_location VARCHAR(10), -- Airport code for flights
    from_city VARCHAR(100),
    to_city VARCHAR(100),
    original_price DECIMAL(10,2) NOT NULL,
    deal_price DECIMAL(10,2) NOT NULL,
    savings DECIMAL(10,2) GENERATED ALWAYS AS (original_price - deal_price) STORED,
    discount_percentage DECIMAL(5,2) GENERATED ALWAYS AS (((original_price - deal_price) / original_price) * 100) STORED,
    airline VARCHAR(100),
    hotel_name VARCHAR(255),
    travel_dates VARCHAR(100),
    deal_type VARCHAR(50), -- 'Error de Tarifa', 'Oferta Flash', etc.
    continent VARCHAR(50) NOT NULL,
    country VARCHAR(100),
    verified BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP,
    source_url TEXT,
    ai_detected BOOLEAN DEFAULT FALSE,
    ai_confidence DECIMAL(3,2),
    views_count INTEGER DEFAULT 0,
    clicks_count INTEGER DEFAULT 0,
    conversions_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255) UNIQUE,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User interactions with deals
CREATE TABLE IF NOT EXISTS deal_interactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    deal_id INTEGER REFERENCES deals(id),
    interaction_type VARCHAR(20) NOT NULL, -- 'view', 'click', 'conversion'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI scanning logs
CREATE TABLE IF NOT EXISTS ai_scan_logs (
    id SERIAL PRIMARY KEY,
    scan_type VARCHAR(50) NOT NULL,
    source_website VARCHAR(255),
    deals_found INTEGER DEFAULT 0,
    scan_duration_seconds INTEGER,
    status VARCHAR(20) DEFAULT 'completed', -- 'running', 'completed', 'failed'
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User alerts/notifications
CREATE TABLE IF NOT EXISTS user_alerts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    alert_type VARCHAR(50) NOT NULL, -- 'price_drop', 'new_deal', 'expiring_soon'
    title VARCHAR(255) NOT NULL,
    message TEXT,
    deal_id INTEGER REFERENCES deals(id),
    read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_deals_continent ON deals(continent);
CREATE INDEX IF NOT EXISTS idx_deals_from_location ON deals(from_location);
CREATE INDEX IF NOT EXISTS idx_deals_active ON deals(active);
CREATE INDEX IF NOT EXISTS idx_deals_created_at ON deals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON users(subscription_status);
CREATE INDEX IF NOT EXISTS idx_deal_interactions_user_deal ON deal_interactions(user_id, deal_id);
