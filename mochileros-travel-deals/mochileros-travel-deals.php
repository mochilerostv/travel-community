<?php
/**
 * Plugin Name: Mochileros Travel Deals
 * Plugin URI: https://v0-travel-community-creation.vercel.app
 * Description: Plugin para mostrar ofertas de viaje premium con integración de IA
 * Version: 1.4.0
 * Author: Mochileros TV
 * License: GPL v2 or later
 * Text Domain: mochileros-deals
 */

// Prevenir acceso directo
if (!defined('ABSPATH')) {
    exit;
}

// Definir constantes del plugin
define('MOCHILEROS_DEALS_VERSION', '1.4.0');
define('MOCHILEROS_DEALS_PLUGIN_URL', plugin_dir_url(__FILE__));
define('MOCHILEROS_DEALS_PLUGIN_PATH', plugin_dir_path(__FILE__));

class MochilerosTravelDeals {
    
    private $api_url;
    private $api_token;
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'admin_init'));
        
        // Registrar shortcodes
        add_shortcode('mochileros_deals_signup', array($this, 'deals_signup_shortcode'));
        add_shortcode('mochileros_deals_dashboard', array($this, 'deals_dashboard_shortcode'));
        add_shortcode('mochileros_deals_premium', array($this, 'premium_content_shortcode'));
        add_shortcode('mochileros_deals_feed', array($this, 'deals_feed_shortcode'));
        
        // Hooks de activación/desactivación
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
        
        // Cargar configuración
        $this->api_url = get_option('mochileros_api_url', 'https://v0-travel-community-creation.vercel.app');
        $this->api_token = get_option('mochileros_api_token', '');
    }
    
    public function init() {
        // Cargar textdomain para traducciones
        load_plugin_textdomain('mochileros-deals', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style(
            'mochileros-deals-style',
            MOCHILEROS_DEALS_PLUGIN_URL . 'assets/mochileros-deals.css',
            array(),
            MOCHILEROS_DEALS_VERSION
        );
        
        wp_enqueue_script(
            'mochileros-deals-script',
            MOCHILEROS_DEALS_PLUGIN_URL . 'assets/mochileros-deals.js',
            array('jquery'),
            MOCHILEROS_DEALS_VERSION,
            true
        );
        
        // Localizar script con datos del plugin
        wp_localize_script('mochileros-deals-script', 'mochileros_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('mochileros_nonce'),
            'api_url' => $this->api_url
        ));
    }
    
    public function add_admin_menu() {
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
        register_setting('mochileros_deals_settings', 'mochileros_api_url');
        register_setting('mochileros_deals_settings', 'mochileros_api_token');
        register_setting('mochileros_deals_settings', 'mochileros_enable_ai');
        register_setting('mochileros_deals_settings', 'mochileros_default_source');
    }
    
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>Mochileros Travel Deals</h1>
            <div class="mochileros-admin-dashboard">
                <div class="mochileros-stats">
                    <div class="stat-box">
                        <h3>Estado de la API</h3>
                        <p id="api-status">Verificando...</p>
                        <button id="test-api" class="button">Probar Conexión</button>
                    </div>
                    <div class="stat-box">
                        <h3>Ofertas Procesadas</h3>
                        <p id="deals-count">-</p>
                    </div>
                    <div class="stat-box">
                        <h3>IA Activa</h3>
                        <p id="ai-status">-</p>
                    </div>
                </div>
                
                <div class="mochileros-actions">
                    <h3>Acciones Rápidas</h3>
                    <button id="sync-deals" class="button button-primary">Sincronizar Ofertas</button>
                    <button id="test-ai" class="button">Probar IA</button>
                    <a href="<?php echo admin_url('admin.php?page=mochileros-deals-settings'); ?>" class="button">Configuración</a>
                </div>
                
                <div class="mochileros-shortcodes">
                    <h3>Shortcodes Disponibles</h3>
                    <div class="shortcode-item">
                        <code>[mochileros_deals_signup]</code>
                        <p>Hero de registro premium</p>
                    </div>
                    <div class="shortcode-item">
                        <code>[mochileros_deals_dashboard]</code>
                        <p>Dashboard con ofertas</p>
                    </div>
                    <div class="shortcode-item">
                        <code>[mochileros_deals_feed limit="5" source="all"]</code>
                        <p>Feed de ofertas personalizable</p>
                    </div>
                    <div class="shortcode-item">
                        <code>[mochileros_deals_premium]contenido[/mochileros_deals_premium]</code>
                        <p>Contenido protegido para suscriptores</p>
                    </div>
                </div>
            </div>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            // Probar conexión API
            $('#test-api').click(function() {
                $('#api-status').text('Probando...');
                $.get('<?php echo $this->api_url; ?>/api/health')
                    .done(function(data) {
                        $('#api-status').html('<span style="color: green;">✓ Conectado</span>');
                        $('#ai-status').text(data.ai === 'available' ? '✓ Activa' : '✗ Inactiva');
                    })
                    .fail(function() {
                        $('#api-status').html('<span style="color: red;">✗ Error de conexión</span>');
                    });
            });
            
            // Sincronizar ofertas
            $('#sync-deals').click(function() {
                $(this).text('Sincronizando...');
                $.post('<?php echo $this->api_url; ?>/api/ingest', {})
                    .done(function(data) {
                        $('#deals-count').text(data.total || 0);
                        $('#sync-deals').text('Sincronizar Ofertas');
                        alert('Ofertas sincronizadas: ' + (data.total || 0));
                    })
                    .fail(function() {
                        $('#sync-deals').text('Sincronizar Ofertas');
                        alert('Error al sincronizar ofertas');
                    });
            });
            
            // Auto-verificar al cargar
            $('#test-api').click();
        });
        </script>
        <?php
    }
    
    public function settings_page() {
        ?>
        <div class="wrap">
            <h1>Configuración - Mochileros Deals</h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('mochileros_deals_settings');
                do_settings_sections('mochileros_deals_settings');
                ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">URL de la API</th>
                        <td>
                            <input type="url" name="mochileros_api_url" value="<?php echo esc_attr($this->api_url); ?>" class="regular-text" />
                            <p class="description">URL base de tu API Next.js (ej: https://v0-travel-community-creation.vercel.app)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Token de API</th>
                        <td>
                            <input type="text" name="mochileros_api_token" value="<?php echo esc_attr($this->api_token); ?>" class="regular-text" />
                            <p class="description">Token de seguridad para la API (opcional)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Habilitar IA</th>
                        <td>
                            <input type="checkbox" name="mochileros_enable_ai" value="1" <?php checked(get_option('mochileros_enable_ai'), 1); ?> />
                            <p class="description">Activar extracción automática con IA</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Fuente por defecto</th>
                        <td>
                            <select name="mochileros_default_source">
                                <option value="all" <?php selected(get_option('mochileros_default_source'), 'all'); ?>>Todas las fuentes</option>
                                <option value="secretflying" <?php selected(get_option('mochileros_default_source'), 'secretflying'); ?>>Secret Flying</option>
                                <option value="viajerospiratas" <?php selected(get_option('mochileros_default_source'), 'viajerospiratas'); ?>>Viajeros Piratas</option>
                                <option value="traveldealz" <?php selected(get_option('mochileros_default_source'), 'traveldealz'); ?>>Travel Dealz</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
    
    // Shortcode: Hero de registro
    public function deals_signup_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Únete a la Comunidad Premium',
            'subtitle' => 'Accede a ofertas exclusivas de viaje',
            'button_text' => 'Ver Planes Premium',
            'button_url' => $this->api_url . '/pricing'
        ), $atts);
        
        ob_start();
        ?>
        <div class="mochileros-signup-hero">
            <div class="hero-content">
                <h2><?php echo esc_html($atts['title']); ?></h2>
                <p><?php echo esc_html($atts['subtitle']); ?></p>
                <div class="hero-features">
                    <div class="feature">
                        <span class="feature-icon">✈️</span>
                        <span>Ofertas exclusivas</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🤖</span>
                        <span>IA avanzada</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">⚡</span>
                        <span>Alertas instantáneas</span>
                    </div>
                </div>
                <a href="<?php echo esc_url($atts['button_url']); ?>" class="mochileros-cta-button" target="_blank">
                    <?php echo esc_html($atts['button_text']); ?>
                </a>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    // Shortcode: Dashboard de ofertas
    public function deals_dashboard_shortcode($atts) {
        $atts = shortcode_atts(array(
            'limit' => '6',
            'source' => 'all',
            'show_filters' => 'true'
        ), $atts);
        
        ob_start();
        ?>
        <div class="mochileros-dashboard" data-limit="<?php echo esc_attr($atts['limit']); ?>" data-source="<?php echo esc_attr($atts['source']); ?>">
            <?php if ($atts['show_filters'] === 'true'): ?>
            <div class="dashboard-filters">
                <select id="source-filter">
                    <option value="all">Todas las fuentes</option>
                    <option value="secretflying">Secret Flying</option>
                    <option value="viajerospiratas">Viajeros Piratas</option>
                    <option value="traveldealz">Travel Dealz</option>
                </select>
                <select id="type-filter">
                    <option value="all">Todos los tipos</option>
                    <option value="error">Errores de Tarifa</option>
                    <option value="flash">Ofertas Flash</option>
                    <option value="promo">Promociones</option>
                </select>
                <button id="refresh-deals" class="button">Actualizar</button>
            </div>
            <?php endif; ?>
            
            <div id="deals-container" class="deals-grid">
                <div class="loading">Cargando ofertas...</div>
            </div>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            function loadDeals() {
                const container = $('#deals-container');
                const limit = $('.mochileros-dashboard').data('limit');
                const source = $('#source-filter').val() || $('.mochileros-dashboard').data('source');
                
                container.html('<div class="loading">Cargando ofertas...</div>');
                
                $.get('<?php echo $this->api_url; ?>/api/wordpress/deals-feed', {
                    limit: limit,
                    source: source
                })
                .done(function(data) {
                    if (data.success && data.deals.length > 0) {
                        let html = '';
                        data.deals.forEach(function(deal) {
                            const savings = deal.originalPrice - deal.price;
                            const expiresAt = new Date(deal.expiresAt);
                            const now = new Date();
                            const hoursLeft = Math.max(0, Math.floor((expiresAt - now) / (1000 * 60 * 60)));
                            
                            html += `
                                <div class="deal-card">
                                    <div class="deal-header">
                                        <span class="deal-type">${deal.type}</span>
                                        <span class="deal-source">${deal.source}</span>
                                    </div>
                                    <div class="deal-route">
                                        <span class="city">${deal.cities.fromCity}</span>
                                        <span class="arrow">→</span>
                                        <span class="city">${deal.cities.toCity}</span>
                                    </div>
                                    <div class="deal-price">
                                        <span class="current-price">${deal.price}€</span>
                                        ${deal.originalPrice ? `<span class="original-price">${deal.originalPrice}€</span>` : ''}
                                        ${savings > 0 ? `<span class="savings">Ahorra ${savings}€</span>` : ''}
                                    </div>
                                    <div class="deal-details">
                                        <p><strong>Aerolínea:</strong> ${deal.airline}</p>
                                        <p><strong>Fechas:</strong> ${deal.dates}</p>
                                        ${hoursLeft > 0 ? `<p class="expires"><strong>Expira en:</strong> ${hoursLeft}h</p>` : ''}
                                    </div>
                                    <a href="${deal.url}" target="_blank" class="deal-button">Ver Oferta</a>
                                </div>
                            `;
                        });
                        container.html(html);
                    } else {
                        container.html('<div class="no-deals">No se encontraron ofertas</div>');
                    }
                })
                .fail(function() {
                    container.html('<div class="error">Error al cargar ofertas</div>');
                });
            }
            
            // Cargar ofertas al inicio
            loadDeals();
            
            // Eventos de filtros
            $('#source-filter, #type-filter').change(loadDeals);
            $('#refresh-deals').click(loadDeals);
        });
        </script>
        <?php
        return ob_get_clean();
    }
    
    // Shortcode: Contenido premium
    public function premium_content_shortcode($atts, $content = null) {
        $atts = shortcode_atts(array(
            'plan' => 'premium',
            'message' => 'Este contenido es exclusivo para suscriptores premium.'
        ), $atts);
        
        // Verificar suscripción (simulado)
        $user_email = wp_get_current_user()->user_email;
        $has_subscription = $this->check_user_subscription($user_email);
        
        if ($has_subscription) {
            return do_shortcode($content);
        } else {
            ob_start();
            ?>
            <div class="mochileros-premium-gate">
                <div class="premium-message">
                    <h3>🔒 Contenido Premium</h3>
                    <p><?php echo esc_html($atts['message']); ?></p>
                    <a href="<?php echo $this->api_url; ?>/pricing" class="premium-upgrade-btn" target="_blank">
                        Actualizar a Premium
                    </a>
                </div>
            </div>
            <?php
            return ob_get_clean();
        }
    }
    
    // Shortcode: Feed de ofertas
    public function deals_feed_shortcode($atts) {
        $atts = shortcode_atts(array(
            'limit' => '3',
            'source' => 'all',
            'layout' => 'grid'
        ), $atts);
        
        ob_start();
        ?>
        <div class="mochileros-deals-feed" data-limit="<?php echo esc_attr($atts['limit']); ?>" data-source="<?php echo esc_attr($atts['source']); ?>" data-layout="<?php echo esc_attr($atts['layout']); ?>">
            <div class="deals-loading">Cargando ofertas...</div>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            const feedContainer = $('.mochileros-deals-feed');
            const limit = feedContainer.data('limit');
            const source = feedContainer.data('source');
            const layout = feedContainer.data('layout');
            
            $.get('<?php echo $this->api_url; ?>/api/wordpress/deals-feed', {
                limit: limit,
                source: source
            })
            .done(function(data) {
                if (data.success && data.deals.length > 0) {
                    let html = `<div class="deals-${layout}">`;
                    data.deals.forEach(function(deal) {
                        html += `
                            <div class="deal-item">
                                <div class="deal-info">
                                    <h4>${deal.title}</h4>
                                    <p class="deal-price">${deal.price}€</p>
                                    <p class="deal-route">${deal.cities.fromCity} → ${deal.cities.toCity}</p>
                                </div>
                                <a href="${deal.url}" target="_blank" class="deal-link">Ver Oferta</a>
                            </div>
                        `;
                    });
                    html += '</div>';
                    feedContainer.html(html);
                } else {
                    feedContainer.html('<div class="no-deals">No hay ofertas disponibles</div>');
                }
            })
            .fail(function() {
                feedContainer.html('<div class="error">Error al cargar ofertas</div>');
            });
        });
        </script>
        <?php
        return ob_get_clean();
    }
    
    // Verificar suscripción del usuario
    private function check_user_subscription($email) {
        if (empty($email)) {
            return false;
        }
        
        // Hacer petición a la API para verificar suscripción
        $response = wp_remote_post($this->api_url . '/api/wordpress/subscription-check', array(
            'body' => json_encode(array('email' => $email)),
            'headers' => array(
                'Content-Type' => 'application/json',
                'x-ai-proxy-token' => $this->api_token
            )
        ));
        
        if (is_wp_error($response)) {
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        return isset($data['subscription']['active']) && $data['subscription']['active'];
    }
    
    public function activate() {
        // Configuración por defecto
        add_option('mochileros_api_url', 'https://v0-travel-community-creation.vercel.app');
        add_option('mochileros_api_token', '');
        add_option('mochileros_enable_ai', 1);
        add_option('mochileros_default_source', 'all');
        
        // Crear páginas necesarias
        $this->create_default_pages();
    }
    
    public function deactivate() {
        // Limpiar cache si es necesario
        wp_cache_flush();
    }
    
    private function create_default_pages() {
        // Crear página de ofertas si no existe
        $deals_page = get_page_by_title('Ofertas Premium');
        if (!$deals_page) {
            wp_insert_post(array(
                'post_title' => 'Ofertas Premium',
                'post_content' => '[mochileros_deals_dashboard]',
                'post_status' => 'publish',
                'post_type' => 'page'
            ));
        }
        
        // Crear página de registro si no existe
        $signup_page = get_page_by_title('Únete Premium');
        if (!$signup_page) {
            wp_insert_post(array(
                'post_title' => 'Únete Premium',
                'post_content' => '[mochileros_deals_signup]',
                'post_status' => 'publish',
                'post_type' => 'page'
            ));
        }
    }
}

// Inicializar el plugin
new MochilerosTravelDeals();

// Hook para AJAX si es necesario
add_action('wp_ajax_mochileros_sync_deals', 'mochileros_sync_deals_callback');
add_action('wp_ajax_nopriv_mochileros_sync_deals', 'mochileros_sync_deals_callback');

function mochileros_sync_deals_callback() {
    // Verificar nonce
    if (!wp_verify_nonce($_POST['nonce'], 'mochileros_nonce')) {
        wp_die('Nonce verification failed');
    }
    
    // Hacer petición a la API de ingesta
    $api_url = get_option('mochileros_api_url', 'https://v0-travel-community-creation.vercel.app');
    $response = wp_remote_post($api_url . '/api/ingest', array(
        'body' => json_encode(array('sources' => array('secretflying', 'viajerospiratas', 'traveldealz'))),
        'headers' => array('Content-Type' => 'application/json')
    ));
    
    if (is_wp_error($response)) {
        wp_send_json_error('Error connecting to API');
    } else {
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        wp_send_json_success($data);
    }
}
?>
