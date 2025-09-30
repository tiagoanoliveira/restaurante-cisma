// CISMA Matosinhos Website JavaScript
// Mobile-optimized parallax scrolling and interactive elements

class CismaWebsite {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.parallaxElements = document.querySelectorAll('.parallax-element');
        this.heroBackground = document.getElementById('hero-bg');

        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupParallax();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.optimizePerformance();
    }

    // Mobile Navigation
    setupNavigation() {
        // Mobile menu toggle
        this.mobileMenu.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close mobile menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.remove('active');
                this.navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.mobileMenu.classList.remove('active');
                this.navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Parallax Scrolling (Mobile-Optimized)
    setupParallax() {
        // Check if device supports smooth parallax
        const supportsPassive = this.supportsPassiveEvents();
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Simplified parallax for mobile devices
            this.setupMobileParallax();
        } else {
            // Full parallax for desktop
            this.setupDesktopParallax(supportsPassive);
        }
    }

    setupMobileParallax() {
        // Throttled scroll handler for mobile
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateMobileParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupDesktopParallax(supportsPassive) {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                this.updateParallax();
            });
        };

        const scrollOptions = supportsPassive ? { passive: true } : false;
        window.addEventListener('scroll', handleScroll, scrollOptions);
    }

    updateMobileParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Hero parallax (reduced effect for mobile)
        if (this.heroBackground) {
            const heroOffset = scrollTop * 0.3;
            this.heroBackground.style.transform = `translateY(${heroOffset}px)`;
        }

        // Other parallax elements (minimal effect)
        this.parallaxElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.bottom >= 0 && rect.top <= windowHeight;

            if (isVisible) {
                const speed = element.dataset.speed || 0.3;
                const yPos = scrollTop * speed * 0.5; // Reduced for mobile
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Hero parallax effect
        if (this.heroBackground) {
            const heroOffset = scrollTop * 0.5;
            this.heroBackground.style.transform = `translateY(${heroOffset}px)`;
        }

        // Parallax elements
        this.parallaxElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.bottom >= 0 && rect.top <= windowHeight;

            if (isVisible) {
                const speed = parseFloat(element.dataset.speed) || 0.5;
                const yPos = (rect.top + scrollTop) * speed - scrollTop;
                element.style.transform = `translateY(${yPos * 0.1}px)`;
            }
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        let lastScrollTop = 0;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Navbar background on scroll
            if (scrollTop > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on mobile
            if (window.innerWidth <= 768) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    this.navbar.style.transform = 'translateY(-100%)';
                } else {
                    this.navbar.style.transform = 'translateY(0)';
                }
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - this.navbar.offsetHeight;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Smooth scroll for call-to-action buttons
        const ctaButtons = document.querySelectorAll('a[href^="#"]');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const href = button.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - this.navbar.offsetHeight;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Performance Optimizations
    optimizePerformance() {
        // Lazy loading for images
        this.setupLazyLoading();

        // Preload critical images
        this.preloadCriticalImages();

        // Optimize animations for mobile
        this.optimizeAnimations();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalImages() {
        const criticalImages = [
            'resources/interior_fundo.jpg',
            'resources/chefs.png'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    optimizeAnimations() {
        // Reduce motion for users who prefer it
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            document.documentElement.style.setProperty('--transition', 'none');
            // Disable parallax for reduced motion
            this.parallaxElements.forEach(element => {
                element.style.transform = 'none';
            });
        }
    }

    // Utility Functions
    supportsPassiveEvents() {
        let supportsPassive = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: function() {
                    supportsPassive = true;
                }
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        } catch (e) {}
        return supportsPassive;
    }

    // Intersection Observer for animations
    setupScrollAnimations() {
        const animateElements = document.querySelectorAll('.menu-item, .gallery-item, .contact-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

// Contact Form Enhancement (if needed later)
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        // Handle form submission
        console.log('Form submitted:', Object.fromEntries(formData));
    }
}

// The Fork Widget Integration
class ReservationWidget {
    constructor() {
        this.widgetContainer = document.getElementById('thefork-widget');
        this.init();
    }

    init() {
        // Placeholder for The Fork widget integration
        // This will be replaced with actual The Fork widget code
        this.setupPlaceholder();
    }

    setupPlaceholder() {
        if (this.widgetContainer) {
            // Add click-to-call functionality
            const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
            phoneLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Analytics tracking for phone calls
                    console.log('Phone call initiated');
                });
            });
        }
    }
}

// Delivery Integration
class DeliveryIntegration {
    constructor() {
        this.deliveryLinks = document.querySelectorAll('.delivery-option');
        this.init();
    }

    init() {
        this.deliveryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = link.querySelector('img').alt;
                this.trackDeliveryClick(platform);

                // Open delivery platform (replace with actual URLs)
                const deliveryUrls = {
                    'Uber Eats': 'https://www.ubereats.com/pt/store/cisma-matosinhos',
                    'Glovo': 'https://glovoapp.com/pt/pt/porto/cisma-matosinhos'
                };

                if (deliveryUrls[platform]) {
                    window.open(deliveryUrls[platform], '_blank');
                }
            });
        });
    }

    trackDeliveryClick(platform) {
        console.log(`Delivery click: ${platform}`);
        // Add analytics tracking here
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main website functionality
    const website = new CismaWebsite();
    const reservationWidget = new ReservationWidget();
    const deliveryIntegration = new DeliveryIntegration();
    const contactForm = new ContactForm();

    // Setup scroll animations
    website.setupScrollAnimations();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reinitialize parallax on resize
            website.setupParallax();
        }, 250);
    });

    // Service Worker registration (for better performance)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(registrationError => console.log('SW registration failed'));
        });
    }
});

// Google Maps Integration (to be added)
function initGoogleMap() {
    // Google Maps initialization will go here
    const mapContainer = document.getElementById('map-placeholder');
    if (mapContainer) {
        // Replace placeholder with actual map
        console.log('Google Maps would be initialized here');
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CismaWebsite, ContactForm, ReservationWidget, DeliveryIntegration };
}
