// TravelDeals Pro WordPress Plugin JavaScript

jQuery(document).ready(function($) {
    
    // Check subscription status for logged-in users
    if (typeof travel_deals_ajax !== 'undefined') {
        checkUserSubscription();
    }
    
    // Handle signup button clicks
    $('.signup-button').on('click', function(e) {
        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'TravelDeals',
                'event_label': 'Signup Button Click'
            });
        }
    });
    
    // Handle unlock button clicks
    $('.unlock-button').on('click', function(e) {
        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'TravelDeals',
                'event_label': 'Premium Unlock Click'
            });
        }
    });
    
    function checkUserSubscription() {
        // Get current user email if available
        var userEmail = getCurrentUserEmail();
        
        if (userEmail) {
            $.ajax({
                url: travel_deals_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'check_subscription',
                    email: userEmail,
                    nonce: travel_deals_ajax.nonce
                },
                success: function(response) {
                    if (response.success && response.data.has_subscription) {
                        // User has active subscription
                        $('.premium-content-locked').hide();
                        $('.premium-content').show();
                        
                        // Add premium badge
                        addPremiumBadge();
                    }
                },
                error: function() {
                    console.log('Error checking subscription status');
                }
            });
        }
    }
    
    function getCurrentUserEmail() {
        // This would need to be populated by WordPress
        // You can add this via wp_localize_script in the PHP
        return travel_deals_ajax.user_email || null;
    }
    
    function addPremiumBadge() {
        if (!$('.travel-deals-premium-badge').length) {
            $('body').append('<div class="travel-deals-premium-badge">✨ Premium Member</div>');
        }
    }
    
    // Auto-refresh deals every 5 minutes
    setInterval(function() {
        refreshDeals();
    }, 5 * 60 * 1000);
    
    function refreshDeals() {
        $.ajax({
            url: travel_deals_ajax.api_url + '/deals',
            type: 'GET',
            success: function(response) {
                if (response.success) {
                    updateDealsDisplay(response.data);
                }
            },
            error: function() {
                console.log('Error refreshing deals');
            }
        });
    }
    
    function updateDealsDisplay(deals) {
        // Update deals display if there's a deals container
        var $dealsContainer = $('.travel-deals-container');
        if ($dealsContainer.length && deals.length > 0) {
            // Update with new deals
            console.log('Updated deals:', deals.length);
        }
    }
});

// CSS for premium badge
var premiumBadgeCSS = `
.travel-deals-premium-badge {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: bold;
    z-index: 9999;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
`;

// Inject CSS
var style = document.createElement('style');
style.textContent = premiumBadgeCSS;
document.head.appendChild(style);
