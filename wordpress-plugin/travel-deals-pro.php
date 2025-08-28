<?php
/**
 * Plugin Name: TravelDeals Pro Integration
 * Description: Integración con la comunidad premium de TravelDeals Pro
 * Version: 1.0.0
 * Author: TravelDeals Pro
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class TravelDealsProPlugin {
    
    private $api_base_url;
    
    public function __construct() {
        $this->api_base_url = 'https://tu-app-nextjs.vercel.app/api';
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('travel_deals_signup', array($this, 'signup_shortcode'));
        add_shortcode('travel_deals_premium', array($this, 'premium_content_shortcode'));
        add_action('wp_ajax_check_subscription', array($this, 'check_subscription_status'));
        add_action('wp_ajax_nopriv_check_subscription', array($this, 'check_subscription_status'));
    }
    
    public function init() {
        // Create custom post type for deals
        register_post_type('travel_deal', array(
            'labels' => array(
                'name' => 'Ofertas de Viaje',
                'singular_name' => 'Oferta de Viaje'
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'menu_icon' => 'dashicons-airplane'
        ));
        
        // Add custom fields for deals
        add_action('add_meta_boxes', array($this, 'add_deal_meta_boxes'));
        add_action('save_post', array($this, 'save_deal_meta'));
    }
    
    public function enqueue_scripts() {
        wp_enqueue_script('travel-deals-js', plugin_dir_url(__FILE__) . 'assets/travel-deals.js', array('jquery'), '1.0.0', true);
        wp_enqueue_style('travel-deals-css', plugin_dir_url(__FILE__) . 'assets/travel-deals.css', array(), '1.0.0');
        
        // Localize script for AJAX
        wp_localize_script('travel-deals-js', 'travel_deals_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('travel_deals_nonce'),
            'api_url' => $this->api_base_url
        ));
    }
    
    public function signup_shortcode($atts) {
        $atts = shortcode_atts(array(
            'style' => 'default'
        ), $atts);
        
        ob_start();
        ?>
        <div class="travel-deals-signup">
            <div class="signup-card">
                <h3>🌍 Únete a TravelDeals Pro</h3>
                <p>Accede a ofertas exclusivas de viajes por solo <strong>€1,99/mes</strong></p>
                <ul class="benefits-list">
                    <li>✈️ Errores de tarifa de vuelos</li>
                    <li>🏨 Chollos de hoteles verificados</li>
                    <li>🔔 Alertas personalizadas</li>
                    <li>👥 Comunidad premium exclusiva</li>
                </ul>
                <a href="<?php echo $this->api_base_url; ?>/../register" class="signup-button" target="_blank">
                    Comenzar Ahora - €1,99/mes
                </a>
                <p class="guarantee">Garantía de devolución de 30 días</p>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function premium_content_shortcode($atts, $content = null) {
        $atts = shortcode_atts(array(
            'message' => 'Este contenido es exclusivo para miembros premium.'
        ), $atts);
        
        // Check if user has active subscription
        $user_email = wp_get_current_user()->user_email;
        $has_subscription = $this->check_user_subscription($user_email);
        
        if ($has_subscription) {
            return do_shortcode($content);
        } else {
            ob_start();
            ?>
            <div class="premium-content-locked">
                <div class="lock-icon">🔒</div>
                <h4>Contenido Premium</h4>
                <p><?php echo esc_html($atts['message']); ?></p>
                <a href="<?php echo $this->api_base_url; ?>/../register" class="unlock-button">
                    Desbloquear por €1,99/mes
                </a>
            </div>
            <?php
            return ob_get_clean();
        }
    }
    
    private function check_user_subscription($email) {
        if (empty($email)) return false;
        
        $response = wp_remote_get($this->api_base_url . '/subscription-status?email=' . urlencode($email));
        
        if (is_wp_error($response)) {
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        return isset($data['success']) && $data['success'] && 
               isset($data['data']['status']) && $data['data']['status'] === 'active';
    }
    
    public function check_subscription_status() {
        check_ajax_referer('travel_deals_nonce', 'nonce');
        
        $email = sanitize_email($_POST['email']);
        $has_subscription = $this->check_user_subscription($email);
        
        wp_send_json_success(array(
            'has_subscription' => $has_subscription
        ));
    }
    
    public function add_deal_meta_boxes() {
        add_meta_box(
            'deal_details',
            'Detalles de la Oferta',
            array($this, 'deal_meta_box_callback'),
            'travel_deal'
        );
    }
    
    public function deal_meta_box_callback($post) {
        wp_nonce_field('save_deal_meta', 'deal_meta_nonce');
        
        $original_price = get_post_meta($post->ID, '_original_price', true);
        $deal_price = get_post_meta($post->ID, '_deal_price', true);
        $destination = get_post_meta($post->ID, '_destination', true);
        $deal_type = get_post_meta($post->ID, '_deal_type', true);
        $expires_at = get_post_meta($post->ID, '_expires_at', true);
        ?>
        <table class="form-table">
            <tr>
                <th><label for="original_price">Precio Original (€)</label></th>
                <td><input type="number" id="original_price" name="original_price" value="<?php echo esc_attr($original_price); ?>" step="0.01" /></td>
            </tr>
            <tr>
                <th><label for="deal_price">Precio Oferta (€)</label></th>
                <td><input type="number" id="deal_price" name="deal_price" value="<?php echo esc_attr($deal_price); ?>" step="0.01" /></td>
            </tr>
            <tr>
                <th><label for="destination">Destino</label></th>
                <td><input type="text" id="destination" name="destination" value="<?php echo esc_attr($destination); ?>" /></td>
            </tr>
            <tr>
                <th><label for="deal_type">Tipo de Oferta</label></th>
                <td>
                    <select id="deal_type" name="deal_type">
                        <option value="flight" <?php selected($deal_type, 'flight'); ?>>Vuelo</option>
                        <option value="hotel" <?php selected($deal_type, 'hotel'); ?>>Hotel</option>
                        <option value="package" <?php selected($deal_type, 'package'); ?>>Paquete</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="expires_at">Fecha de Expiración</label></th>
                <td><input type="datetime-local" id="expires_at" name="expires_at" value="<?php echo esc_attr($expires_at); ?>" /></td>
            </tr>
        </table>
        <?php
    }
    
    public function save_deal_meta($post_id) {
        if (!isset($_POST['deal_meta_nonce']) || !wp_verify_nonce($_POST['deal_meta_nonce'], 'save_deal_meta')) {
            return;
        }
        
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        
        $fields = array('original_price', 'deal_price', 'destination', 'deal_type', 'expires_at');
        
        foreach ($fields as $field) {
            if (isset($_POST[$field])) {
                update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
            }
        }
    }
}

// Initialize the plugin
new TravelDealsProPlugin();

// Activation hook
register_activation_hook(__FILE__, 'travel_deals_pro_activate');
function travel_deals_pro_activate() {
    flush_rewrite_rules();
}

// Deactivation hook
register_deactivation_hook(__FILE__, 'travel_deals_pro_deactivate');
function travel_deals_pro_deactivate() {
    flush_rewrite_rules();
}
?>
