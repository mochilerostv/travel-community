<?php
/**
 * Plugin Name: Mochileros Travel Deals
 * Plugin URI: https://v0-travel-community-creation.vercel.app
 * Description: Plugin para mostrar ofertas de viaje premium con integración IA
 * Version: 1.4.0
 * Author: Mochileros TV
 * License: GPL v2 or later
 */

// Prevenir acceso directo
if (!defined('ABSPATH')) {
    exit;
}

// Definir constantes
define('MTD_PLUGIN_URL', plugin_dir_url(__FILE__));
define('MTD_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('MTD_VERSION', '1.4.0');

class MochilerosTravelDeals {
    
    private $api_url = 'https://v0-travel-community-creation.vercel.app';
    private $api_token = '';
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('admin_init', array($this, 'admin_init'));
        
        // Shortcodes
        add_shortcode('mochileros_deals_signup', array($this, 'deals_signup_shortcode'));
        add_shortcode('mochileros_deals_dashboard', array($this, 'deals_dashboard_shortcode'));
        add_shortcode('mochileros_deals_premium', array($this, 'deals_premium_shortcode'));
        
        // AJAX handlers
        add_action('wp_ajax_mtd_test_api', array($this, 'test_api_connection'));
        add_action('wp_ajax_mtd_extract_deal', array($this, 'extract_deal_data'));
    }
    
    public function init() {
        // Cargar configuración
        $this->api_url = get_option('mtd_api_url', 'https://v0-travel-community-creation.vercel.app');
        $this->api_token = get_option('mtd_api_token', '');
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style('mtd-styles', MTD_PLUGIN_URL . 'assets/mochileros-deals.css', array(), MTD_VERSION);
        wp_enqueue_script('mtd-scripts', MTD_PLUGIN_URL . 'assets/mochileros-deals.js', array('jquery'), MTD_VERSION, true);
        
        // Localizar script para AJAX
        wp_localize_script('mtd-scripts', 'mtd_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('mtd_nonce'),
            'api_url' => $this->api_url
        ));
    }
    
    public function admin_menu() {
        add_menu_page(
            'Mochileros Deals',
            'Mochileros Deals',
            'manage_options',
            'mochileros-deals',
            array($this, 'admin_page'),
            'dashicons-airplane',
            30
        );
        
        add_submenu_page(
            'mochileros-deals',
            'Configuración',
            'Configuración',
            'manage_options',
            'mochileros-deals-settings',
            array($this, 'settings_page')
        );
    }
    
    public function admin_init() {
        register_setting('mtd_settings', 'mtd_api_url');
        register_setting('mtd_settings', 'mtd_api_token');
        register_setting('mtd_settings', 'mtd_premium_page');
        register_setting('mtd_settings', 'mtd_signup_page');
    }
    
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>Mochileros Travel Deals</h1>
            
            <div class="mtd-admin-dashboard">
                <div class="mtd-stats-grid">
                    <div class="mtd-stat-card">
                        <h3>Estado API</h3>
                        <div id="mtd-api-status">
                            <button type="button" class="button" onclick="mtdTestAPI()">Probar Conexión</button>
                        </div>
                    </div>
                    
                    <div class="mtd-stat-card">
                        <h3>Ofertas Activas</h3>
                        <div class="mtd-stat-number" id="mtd-active-deals">-</div>
                    </div>
                    
                    <div class="mtd-stat-card">
                        <h3>Última Actualización</h3>
                        <div class="mtd-stat-text" id="mtd-last-update">-</div>
                    </div>
                </div>
                
                <div class="mtd-actions">
                    <h3>Acciones Rápidas</h3>
                    <button type="button" class="button button-primary" onclick="mtdIngestDeals()">
                        Actualizar Ofertas
                    </button>
                    <button type="button" class="button" onclick="mtdTestExtraction()">
                        Probar Extracción IA
                    </button>
                </div>
                
                <div class="mtd-shortcodes">
                    <h3>Shortcodes Disponibles</h3>
                    <div class="mtd-shortcode-list">
                        <div class="mtd-shortcode-item">
                            <code>[mochileros_deals_signup]</code>
                            <span>Hero de registro premium</span>
                        </div>
                        <div class="mtd-shortcode-item">
                            <code>[mochileros_deals_dashboard]</code>
                            <span>Dashboard con ofertas</span>
                        </div>
                        <div class="mtd-shortcode-item">
                            <code>[mochileros_deals_premium]contenido[/mochileros_deals_premium]</code>
                            <span>Contenido protegido para premium</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
        .mtd-admin-dashboard {
            max-width: 1200px;
        }
        .mtd-stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .mtd-stat-card {
            background: white;
            border: 1px solid #ccd0d4;
            border-radius: 4px;
            padding: 20px;
            box-shadow: 0 1px 1px rgba(0,0,0,.04);
        }
        .mtd-stat-card h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #646970;
        }
        .mtd-stat-number {
            font-size: 32px;
            font-weight: 600;
            color: #1d2327;
        }
        .mtd-stat-text {
            font-size: 16px;
            color: #1d2327;
        }
        .mtd-actions, .mtd-shortcodes {
            background: white;
            border: 1px solid #ccd0d4;
            border-radius: 4px;
            padding: 20px;
            margin: 20px 0;
        }
        .mtd-shortcode-list {
            display: grid;
            gap: 10px;
        }
        .mtd-shortcode-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background: #f6f7f7;
            border-radius: 4px;
        }
        .mtd-shortcode-item code {
            background: #2271b1;
            color: white;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 12px;
        }
        </style>
        
        <script>
        function mtdTestAPI() {
            const statusDiv = document.getElementById('mtd-api-status');
            statusDiv.innerHTML = '<span class="spinner is-active"></span> Probando...';
            
            jQuery.post(ajaxurl, {
                action: 'mtd_test_api',
                nonce: '<?php echo wp_create_nonce('mtd_nonce'); ?>'
            }, function(response) {
                if (response.success) {
                    statusDiv.innerHTML = '<span style="color: green;">✅ Conectado</span>';
                    document.getElementById('mtd-active-deals').textContent = response.data.deals || '0';
                    document.getElementById('mtd-last-update').textContent = new Date().toLocaleString();
                } else {
                    statusDiv.innerHTML = '<span style="color: red;">❌ Error: ' + response.data + '</span>';
                }
            });
        }
        
        function mtdIngestDeals() {
            alert('Función de ingesta ejecutada (demo)');
        }
        
        function mtdTestExtraction() {
            const testContent = 'Madrid París 89€ - Vuelo directo con Vueling';
            alert('Probando extracción IA con: ' + testContent);
        }
        </script>
        <?php
    }
    
    public function settings_page() {
        ?>
        <div class="wrap">
            <h1>Configuración - Mochileros Deals</h1>
            
            <form method="post" action="options.php">
                <?php settings_fields('mtd_settings'); ?>
                <?php do_settings_sections('mtd_settings'); ?>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">URL de la API</th>
                        <td>
                            <input type="url" name="mtd_api_url" value="<?php echo esc_attr(get_option('mtd_api_url', 'https://v0-travel-community-creation.vercel.app')); ?>" class="regular-text" />
                            <p class="description">URL base de tu API Next.js desplegada en Vercel</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Token de API</th>
                        <td>
                            <input type="text" name="mtd_api_token" value="<?php echo esc_attr(get_option('mtd_api_token')); ?>" class="regular-text" />
                            <p class="description">Token de seguridad para la API (opcional pero recomendado)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Página Premium</th>
                        <td>
                            <?php wp_dropdown_pages(array(
                                'name' => 'mtd_premium_page',
                                'selected' => get_option('mtd_premium_page'),
                                'show_option_none' => 'Seleccionar página...'
                            )); ?>
                            <p class="description">Página donde redirigir a usuarios premium</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Página de Registro</th>
                        <td>
                            <?php wp_dropdown_pages(array(
                                'name' => 'mtd_signup_page',
                                'selected' => get_option('mtd_signup_page'),
                                'show_option_none' => 'Seleccionar página...'
                            )); ?>
                            <p class="description">Página de registro/pricing</p>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button(); ?>
            </form>
            
            <div class="mtd-help-section">
                <h2>Ayuda de Configuración</h2>
                <div class="mtd-help-grid">
                    <div class="mtd-help-card">
                        <h3>🔗 URL de API</h3>
                        <p>Debe ser la URL completa de tu proyecto Vercel:</p>
                        <code>https://tu-proyecto.vercel.app</code>
                    </div>
                    <div class="mtd-help-card">
                        <h3>🔑 Token de API</h3>
                        <p>Token de seguridad configurado en las variables de entorno de Vercel:</p>
                        <code>AI_PROXY_TOKEN</code>
                    </div>
                    <div class="mtd-help-card">
                        <h3>📄 Páginas</h3>
                        <p>Crea páginas en WordPress y asígnalas aquí para el flujo de usuario.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
        .mtd-help-section {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ccd0d4;
        }
        .mtd-help-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .mtd-help-card {
            background: #f8f9fa;
            border: 1px solid #e1e5e9;
            border-radius: 6px;
            padding: 20px;
        }
        .mtd-help-card h3 {
            margin: 0 0 10px 0;
            color: #1d2327;
        }
        .mtd-help-card code {
            background: #2271b1;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 12px;
        }
        </style>
        <?php
    }
    
    public function test_api_connection() {
        check_ajax_referer('mtd_nonce', 'nonce');
        
        $response = wp_remote_get($this->api_url . '/api/health');
        
        if (is_wp_error($response)) {
            wp_send_json_error('Error de conexión: ' . $response->get_error_message());
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if ($data && isset($data['status']) && $data['status'] === 'ok') {
            wp_send_json_success(array(
                'message' => 'API conectada correctamente',
                'deals' => rand(15, 45), // Simulado
                'ai_status' => $data['ai'] ?? 'unknown'
            ));
        } else {
            wp_send_json_error('API no responde correctamente');
        }
    }
    
    public function extract_deal_data() {
        check_ajax_referer('mtd_nonce', 'nonce');
        
        $title = sanitize_text_field($_POST['title'] ?? '');
        $content = sanitize_textarea_field($_POST['content'] ?? '');
        
        if (empty($title) || empty($content)) {
            wp_send_json_error('Título y contenido son requeridos');
        }
        
        $api_data = array(
            'title' => $title,
            'text' => $content,
            'source' => 'wordpress',
            'url' => get_permalink()
        );
        
        $headers = array(
            'Content-Type' => 'application/json'
        );
        
        if (!empty($this->api_token)) {
            $headers['x-ai-proxy-token'] = $this->api_token;
        }
        
        $response = wp_remote_post($this->api_url . '/api/wp/ai-extract', array(
            'headers' => $headers,
            'body' => json_encode($api_data),
            'timeout' => 30
        ));
        
        if (is_wp_error($response)) {
            wp_send_json_error('Error de API: ' . $response->get_error_message());
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if ($data && isset($data['success']) && $data['success']) {
            wp_send_json_success($data['data']);
        } else {
            wp_send_json_error('Error en extracción IA: ' . ($data['message'] ?? 'Unknown error'));
        }
    }
    
    // Shortcode: Hero de registro
    public function deals_signup_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Ofertas Premium de Viaje',
            'subtitle' => 'Accede a errores de tarifa y ofertas exclusivas',
            'button_text' => 'Ver Ofertas Premium',
            'price' => '€1.99/mes'
        ), $atts);
        
        $signup_page = get_option('mtd_signup_page');
        $signup_url = $signup_page ? get_permalink($signup_page) : $this->api_url . '/pricing';
        
        ob_start();
        ?>
        <div class="mtd-signup-hero">
            <div class="mtd-hero-content">
                <h1 class="mtd-hero-title"><?php echo esc_html($atts['title']); ?></h1>
                <p class="mtd-hero-subtitle"><?php echo esc_html($atts['subtitle']); ?></p>
                <div class="mtd-hero-features">
                    <div class="mtd-feature">
                        <span class="mtd-feature-icon">✈️</span>
                        <span>Errores de tarifa verificados</span>
                    </div>
                    <div class="mtd-feature">
                        <span class="mtd-feature-icon">⚡</span>
                        <span>Alertas en tiempo real</span>
                    </div>
                    <div class="mtd-feature">
                        <span class="mtd-feature-icon">🎯</span>
                        <span>Ofertas personalizadas</span>
                    </div>
                </div>
                <div class="mtd-hero-cta">
                    <a href="<?php echo esc_url($signup_url); ?>" class="mtd-cta-button">
                        <?php echo esc_html($atts['button_text']); ?>
                    </a>
                    <span class="mtd-price">Desde <?php echo esc_html($atts['price']); ?></span>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    // Shortcode: Dashboard de ofertas
    public function deals_dashboard_shortcode($atts) {
        $atts = shortcode_atts(array(
            'limit' => '6',
            'source' => 'all'
        ), $atts);
        
        ob_start();
        ?>
        <div class="mtd-deals-dashboard">
            <div class="mtd-dashboard-header">
                <h2>Ofertas Premium Activas</h2>
                <div class="mtd-dashboard-filters">
                    <select id="mtd-source-filter">
                        <option value="all">Todas las fuentes</option>
                        <option value="secretflying">Secret Flying</option>
                        <option value="viajerospiratas">Viajeros Piratas</option>
                        <option value="traveldealz">Travel Dealz</option>
                    </select>
                </div>
            </div>
            
            <div id="mtd-deals-grid" class="mtd-deals-grid">
                <div class="mtd-loading">
                    <span class="mtd-spinner"></span>
                    <p>Cargando ofertas premium...</p>
                </div>
            </div>
        </div>
        
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            mtdLoadDeals();
        });
        
        function mtdLoadDeals() {
            const grid = document.getElementById('mtd-deals-grid');
            const apiUrl = '<?php echo esc_js($this->api_url); ?>';
            
            fetch(apiUrl + '/api/wordpress/deals-feed?limit=<?php echo esc_js($atts['limit']); ?>&source=<?php echo esc_js($atts['source']); ?>')
                .then(response => response.json())
                .then(data => {
                    if (data.success && data.deals) {
                        grid.innerHTML = data.deals.map(deal => `
                            <div class="mtd-deal-card">
                                <div class="mtd-deal-header">
                                    <span class="mtd-deal-type ${deal.type.toLowerCase().replace(' ', '-')}">${deal.type}</span>
                                    <span class="mtd-deal-source">${deal.source}</span>
                                </div>
                                <h3 class="mtd-deal-title">${deal.title}</h3>
                                <div class="mtd-deal-route">
                                    <span class="mtd-route-from">${deal.cities.fromCity}</span>
                                    <span class="mtd-route-arrow">→</span>
                                    <span class="mtd-route-to">${deal.cities.toCity}</span>
                                </div>
                                <div class="mtd-deal-price">
                                    <span class="mtd-current-price">${deal.price}${deal.currency}</span>
                                    ${deal.originalPrice ? `<span class="mtd-original-price">${deal.originalPrice}${deal.currency}</span>` : ''}
                                    ${deal.discountPct ? `<span class="mtd-discount">-${deal.discountPct}%</span>` : ''}
                                </div>
                                <div class="mtd-deal-details">
                                    <span class="mtd-airline">${deal.airline}</span>
                                    <span class="mtd-dates">${deal.dates}</span>
                                </div>
                                <a href="${deal.url}" target="_blank" class="mtd-deal-button">Ver Oferta</a>
                            </div>
                        `).join('');
                    } else {
                        grid.innerHTML = '<p class="mtd-no-deals">No hay ofertas disponibles en este momento.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error loading deals:', error);
                    grid.innerHTML = '<p class="mtd-error">Error cargando ofertas. Inténtalo más tarde.</p>';
                });
        }
        </script>
        <?php
        return ob_get_clean();
    }
    
    // Shortcode: Contenido premium
    public function deals_premium_shortcode($atts, $content = '') {
        $atts = shortcode_atts(array(
            'message' => 'Este contenido es exclusivo para miembros premium'
        ), $atts);
        
        // Aquí verificarías si el usuario tiene suscripción activa
        $is_premium = false; // Simplificado para demo
        
        if ($is_premium) {
            return do_shortcode($content);
        } else {
            $signup_page = get_option('mtd_signup_page');
            $signup_url = $signup_page ? get_permalink($signup_page) : $this->api_url . '/pricing';
            
            ob_start();
            ?>
            <div class="mtd-premium-gate">
                <div class="mtd-premium-icon">🔒</div>
                <h3>Contenido Premium</h3>
                <p><?php echo esc_html($atts['message']); ?></p>
                <a href="<?php echo esc_url($signup_url); ?>" class="mtd-premium-button">
                    Acceder Premium
                </a>
            </div>
            <?php
            return ob_get_clean();
        }
    }
}

// Inicializar plugin
new MochilerosTravelDeals();

// Hook de activación
register_activation_hook(__FILE__, 'mtd_activate');
function mtd_activate() {
    // Configuración inicial
    add_option('mtd_api_url', 'https://v0-travel-community-creation.vercel.app');
    add_option('mtd_api_token', '');
    
    // Crear páginas por defecto si no existen
    $pages = array(
        'premium' => array(
            'title' => 'Ofertas Premium',
            'content' => '[mochileros_deals_dashboard]'
        ),
        'signup' => array(
            'title' => 'Registro Premium',
            'content' => '[mochileros_deals_signup]'
        )
    );
    
    foreach ($pages as $key => $page_data) {
        $existing = get_page_by_title($page_data['title']);
        if (!$existing) {
            $page_id = wp_insert_post(array(
                'post_title' => $page_data['title'],
                'post_content' => $page_data['content'],
                'post_status' => 'publish',
                'post_type' => 'page'
            ));
            
            update_option('mtd_' . $key . '_page', $page_id);
        }
    }
}

// Hook de desactivación
register_deactivation_hook(__FILE__, 'mtd_deactivate');
function mtd_deactivate() {
    // Limpiar tareas programadas si las hay
}
?>
