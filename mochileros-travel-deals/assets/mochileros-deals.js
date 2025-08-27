// Mochileros Travel Deals Plugin JavaScript

jQuery(document).ready(function($) {
    
    // Initialize dashboard functionality
    initializeDashboard();
    
    // Handle signup button clicks
    $('#join-premium').on('click', function(e) {
        e.preventDefault();
        
        // For demo purposes, show alert
        alert('¡Funcionalidad de pago en desarrollo! Pronto podrás unirte a la comunidad premium de MochilerosTV.');
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'MochilerosDeals',
                'event_label': 'Premium Signup Click'
            });
        }
    });
    
    // Handle view deal button clicks
    $(document).on('click', '.view-deal-btn', function(e) {
        e.preventDefault();
        
        // For demo purposes, show alert
        alert('¡Oferta verificada! En la versión completa, te redirigiremos al sitio de reserva.');
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'MochilerosDeals',
                'event_label': 'Deal View Click'
            });
        }
    });
    
    // Handle community button clicks
    $('.community-btn').on('click', function(e) {
        e.preventDefault();
        
        alert('¡Únete a nuestro grupo de Telegram exclusivo! Link disponible para miembros premium.');
    });
    
    function initializeDashboard() {
        // Tab switching functionality
        $('.tab-button').on('click', function() {
            var tab = $(this).data('tab');
            
            // Update active tab
            $('.tab-button').removeClass('active');
            $(this).addClass('active');
            
            // Show/hide content
            $('.deals-grid').addClass('hidden');
            $('#' + tab + '-deals').removeClass('hidden');
        });
        
        // Filter functionality
        $('#continent-filter, #airport-filter').on('change', function() {
            filterDeals();
        });
        
        $('#destination-search').on('input', function() {
            filterDeals();
        });
        
        // Auto-refresh deals every 5 minutes (demo)
        setInterval(function() {
            updateDealCounters();
        }, 5 * 60 * 1000);
    }
    
    function filterDeals() {
        var continent = $('#continent-filter').val();
        var airport = $('#airport-filter').val();
        var search = $('#destination-search').val().toLowerCase();
        
        console.log('Filtering deals:', { continent, airport, search });
        
        // In a real implementation, this would make an AJAX call
        // For demo purposes, we'll just show a message
        if (continent !== 'all' || airport !== 'all' || search !== '') {
            showFilterMessage();
        }
    }
    
    function showFilterMessage() {
        // Create temporary message
        if (!$('.filter-message').length) {
            $('.deals-grid').prepend('<div class="filter-message" style="background: #dbeafe; color: #1e40af; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;">🔍 Filtros aplicados - En la versión completa verías ofertas personalizadas</div>');
            
            // Remove message after 3 seconds
            setTimeout(function() {
                $('.filter-message').fadeOut(function() {
                    $(this).remove();
                });
            }, 3000);
        }
    }
    
    function updateDealCounters() {
        // Simulate real-time updates
        $('.time-left').each(function() {
            var $this = $(this);
            var text = $this.text();
            
            if (text.includes('h')) {
                var hours = parseInt(text.match(/(\d+)h/)[1]);
                var minutes = parseInt(text.match(/(\d+)m/)[1]);
                
                // Decrease time by 1 minute
                minutes--;
                if (minutes < 0) {
                    hours--;
                    minutes = 59;
                }
                
                if (hours >= 0) {
                    $this.text(`⏰ ${hours}h ${minutes}m restante`);
                }
            }
        });
    }
    
    // Smooth scrolling for internal links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });
    
    // Add loading states to buttons
    $('.signup-button, .view-deal-btn, .community-btn').on('click', function() {
        var $btn = $(this);
        var originalText = $btn.text();
        
        $btn.text('Cargando...');
        
        setTimeout(function() {
            $btn.text(originalText);
        }, 2000);
    });
    
    // Animate stats on scroll
    function animateStats() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var target = parseInt($this.text().replace(/[€,]/g, ''));
            
            if (target && !$this.hasClass('animated')) {
                $this.addClass('animated');
                
                $({ counter: 0 }).animate({ counter: target }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        var value = Math.ceil(this.counter);
                        if ($this.text().includes('€')) {
                            $this.text('€' + value.toLocaleString());
                        } else {
                            $this.text(value.toLocaleString());
                        }
                    }
                });
            }
        });
    }
    
    // Trigger stats animation when in viewport
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        
        $('.stats-grid').each(function() {
            var elementTop = $(this).offset().top;
            
            if (scrollTop + windowHeight > elementTop + 100) {
                animateStats();
            }
        });
    });
    
    // Initialize tooltips (if you want to add them later)
    $('[data-tooltip]').hover(
        function() {
            var tooltip = $(this).data('tooltip');
            $(this).append('<div class="tooltip">' + tooltip + '</div>');
        },
        function() {
            $('.tooltip').remove();
        }
    );
    
    // Simple animations
    $('.stat-number').each(function() {
        const $el = $(this);
        const target = parseInt($el.text().replace(/[^\d]/g, '')) || 0;
        $({ c: 0 }).animate({ c: target }, { duration: 1200, step: function() { $el.text(this.c.toLocaleString()); } });
    });
});

// Add some CSS for tooltips
var tooltipCSS = `
.tooltip {
    position: absolute;
    background: #1e3c72;
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 1000;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 5px;
}

.tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #1e3c72;
}
`;

// Inject tooltip CSS
var style = document.createElement('style');
style.textContent = tooltipCSS;
document.head.appendChild(style);
