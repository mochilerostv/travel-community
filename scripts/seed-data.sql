-- Seed data for TravelDeals Pro

-- Insert sample users
INSERT INTO users (email, password_hash, first_name, last_name, preferred_airports, interested_continents) VALUES
('juan.perez@email.com', '$2b$10$example_hash_1', 'Juan', 'Pérez', ARRAY['MAD', 'BCN'], ARRAY['Europa', 'América del Norte']),
('maria.garcia@email.com', '$2b$10$example_hash_2', 'María', 'García', ARRAY['MAD', 'LHR'], ARRAY['Asia', 'Oceanía']),
('carlos.lopez@email.com', '$2b$10$example_hash_3', 'Carlos', 'López', ARRAY['BCN', 'CDG'], ARRAY['Europa', 'África']),
('ana.martinez@email.com', '$2b$10$example_hash_4', 'Ana', 'Martínez', ARRAY['MAD'], ARRAY['América del Sur', 'Asia']);

-- Insert sample flight deals
INSERT INTO deals (
    type, title, description, from_location, to_location, from_city, to_city,
    original_price, deal_price, airline, travel_dates, deal_type, continent,
    country, verified, active, expires_at, ai_detected, ai_confidence
) VALUES
('flight', 'Madrid → Nueva York', 'Vuelo directo con Iberia, incluye equipaje', 'MAD', 'JFK', 'Madrid', 'Nueva York', 
 850.00, 299.00, 'Iberia', '15-22 Mar 2024', 'Error de Tarifa', 'América del Norte', 'Estados Unidos', 
 TRUE, TRUE, NOW() + INTERVAL '2 hours', TRUE, 0.95),

('flight', 'Barcelona → Bangkok', 'Vuelo con escala en Doha, Qatar Airways', 'BCN', 'BKK', 'Barcelona', 'Bangkok',
 720.00, 385.00, 'Qatar Airways', '10-24 Abr 2024', 'Oferta Flash', 'Asia', 'Tailandia',
 TRUE, TRUE, NOW() + INTERVAL '5 hours', TRUE, 0.88),

('flight', 'Madrid → Sídney', 'Vuelo con Emirates, dos escalas', 'MAD', 'SYD', 'Madrid', 'Sídney',
 1200.00, 699.00, 'Emirates', '5-19 May 2024', 'Precio Especial', 'Oceanía', 'Australia',
 TRUE, TRUE, NOW() + INTERVAL '1 hour', FALSE, NULL),

('flight', 'Barcelona → Tokio', 'Vuelo directo con ANA', 'BCN', 'NRT', 'Barcelona', 'Tokio',
 950.00, 420.00, 'ANA', '1-15 Jun 2024', 'Error de Tarifa', 'Asia', 'Japón',
 TRUE, TRUE, NOW() + INTERVAL '3 hours', TRUE, 0.92);

-- Insert sample hotel deals
INSERT INTO deals (
    type, title, description, to_city, original_price, deal_price,
    hotel_name, travel_dates, deal_type, continent, country,
    verified, active, expires_at, ai_detected, ai_confidence
) VALUES
('hotel', 'Hotel Luxury Palace - París', 'Hotel 5 estrellas en el centro de París, desayuno incluido', 'París',
 320.00, 89.00, 'Hotel Luxury Palace', '20-25 Mar 2024', 'Última Hora', 'Europa', 'Francia',
 TRUE, TRUE, NOW() + INTERVAL '6 hours', TRUE, 0.91),

('hotel', 'Beachfront Resort - Cancún', 'Resort todo incluido frente al mar', 'Cancún',
 450.00, 159.00, 'Beachfront Resort', '12-18 Abr 2024', 'Todo Incluido', 'América del Norte', 'México',
 TRUE, TRUE, NOW() + INTERVAL '4 hours', TRUE, 0.87),

('hotel', 'Mountain Lodge - Suiza', 'Lodge de montaña con spa incluido', 'Zermatt',
 280.00, 125.00, 'Alpine Mountain Lodge', '8-15 May 2024', 'Oferta Especial', 'Europa', 'Suiza',
 TRUE, TRUE, NOW() + INTERVAL '8 hours', FALSE, NULL);

-- Insert sample payments
INSERT INTO payments (user_id, amount, currency, payment_method, transaction_id, status, payment_date) VALUES
(1, 1.99, 'EUR', 'card', 'txn_1234567890', 'completed', NOW() - INTERVAL '30 days'),
(2, 1.99, 'EUR', 'paypal', 'txn_1234567891', 'completed', NOW() - INTERVAL '25 days'),
(3, 1.99, 'EUR', 'card', 'txn_1234567892', 'completed', NOW() - INTERVAL '20 days'),
(4, 1.99, 'EUR', 'card', 'txn_1234567893', 'completed', NOW() - INTERVAL '15 days');

-- Insert sample deal interactions
INSERT INTO deal_interactions (user_id, deal_id, interaction_type) VALUES
(1, 1, 'view'), (1, 1, 'click'), (1, 1, 'conversion'),
(1, 2, 'view'), (1, 3, 'view'),
(2, 1, 'view'), (2, 1, 'click'),
(2, 2, 'view'), (2, 2, 'click'), (2, 2, 'conversion'),
(3, 1, 'view'), (3, 2, 'view'), (3, 3, 'view'), (3, 3, 'click'),
(4, 1, 'view'), (4, 4, 'view'), (4, 4, 'click'), (4, 4, 'conversion');

-- Insert sample AI scan logs
INSERT INTO ai_scan_logs (scan_type, source_website, deals_found, scan_duration_seconds, status) VALUES
('flight_scan', 'skyscanner.com', 15, 45, 'completed'),
('hotel_scan', 'booking.com', 23, 67, 'completed'),
('flight_scan', 'kayak.com', 8, 32, 'completed'),
('hotel_scan', 'expedia.com', 12, 41, 'completed'),
('flight_scan', 'momondo.com', 19, 58, 'completed');

-- Insert sample user alerts
INSERT INTO user_alerts (user_id, alert_type, title, message, deal_id) VALUES
(1, 'new_deal', 'Nueva oferta desde Madrid', 'Hemos encontrado una nueva oferta de vuelo desde tu aeropuerto preferido', 1),
(1, 'price_drop', 'Bajada de precio', 'El precio del vuelo Madrid-NYC ha bajado €50 más', 1),
(2, 'new_deal', 'Oferta en Asia', 'Nueva oferta de vuelo a Bangkok desde Barcelona', 2),
(3, 'expiring_soon', 'Oferta expira pronto', 'La oferta Madrid-Sídney expira en 1 hora', 3),
(4, 'new_deal', 'Oferta de hotel', 'Nuevo hotel con descuento en París', 5);

-- Update deal statistics based on interactions
UPDATE deals SET 
    views_count = (SELECT COUNT(*) FROM deal_interactions WHERE deal_id = deals.id AND interaction_type = 'view'),
    clicks_count = (SELECT COUNT(*) FROM deal_interactions WHERE deal_id = deals.id AND interaction_type = 'click'),
    conversions_count = (SELECT COUNT(*) FROM deal_interactions WHERE deal_id = deals.id AND interaction_type = 'conversion');
