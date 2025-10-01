// ===== FUNÇÕES UTILITÁRIAS (DRY - Don't Repeat Yourself) =====
function loadHTML(id, url) {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao carregar o arquivo: ' + url);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById(id).innerHTML = data;
    })
    .catch(error => {
        console.error(error);
    });
}

function loadFeaturedMenuItems() {
    fetch('./menu/menu.html')
    .then(response => response.text())
    .then(html => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const featuredItems = tempDiv.querySelectorAll('.menu-item[data-top="true"]');
        const container = document.getElementById('featured-menu-items');
        
        if (container) {
            featuredItems.forEach(item => {
                container.appendChild(item.cloneNode(true));
            });
        }
    })
    .catch(error => {
        console.error('Erro ao carregar itens do menu:', error);
    });
}

function loadAllMenuItems() {
    const container = document.getElementById('all-menu-items');
    if (container) {
        fetch('/menu/menu.html')
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
        })
        .catch(error => {
            console.error('Erro ao carregar itens do menu:', error);
        });
    }
}

// ===== INICIALIZAÇÃO AUTOMÁTICA =====
function initializePage() {
    // Carregar header e footer (presente em todas as páginas)
    loadHTML('header-placeholder', '../headers/header.html');
    loadHTML('footer-placeholder', '../headers/footer.html');
    
    // Carregar menu conforme a página
    const featuredContainer = document.getElementById('featured-menu-items');
    const allMenuContainer = document.getElementById('all-menu-items');
    
    if (featuredContainer) {
        loadFeaturedMenuItems();
    }
    
    if (allMenuContainer) {
        loadAllMenuItems();
    }
}

// ===== CÓDIGO PRINCIPAL SIMPLIFICADO =====
class CismaWebsite {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        if (this.navbar && this.mobileMenu && this.navMenu) {
            this.setupNavigation();
        }
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupLazyLoading();
    }

    setupNavigation() {
        this.mobileMenu.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
    }

    setupScrollEffects() {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 100) {
                this.navbar?.classList.add('scrolled');
            } else {
                this.navbar?.classList.remove('scrolled');
            }
            
            lastScroll = scrollTop;
        }, { passive: true });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - (this.navbar?.offsetHeight || 0);
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => observer.observe(img));
        } else {
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    new CismaWebsite();
});
