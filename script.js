// ===== FUNÇÕES UTILITÁRIAS =====
function loadHTML(id, url, callback) {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao carregar o arquivo: ' + url);
        }
        return response.text();
    })
    .then(data => {
        const element = document.getElementById(id);
        element.innerHTML = data;

        // Só ajusta caminhos relativos se estiver dentro da pasta /menu/
        const currentPath = window.location.pathname;
        const isInMenu = currentPath.includes('/menu/');

        if (isInMenu) {
            // Ajustar imagens
            element.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src && src.startsWith('./')) {
                    img.setAttribute('src', '../' + src.substring(2));
                }
            });

            // Ajustar links relativos
            element.querySelectorAll('a').forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('./') && !href.startsWith('#')) {
                    link.setAttribute('href', '../' + href.substring(2));
                }
            });
        }

        // Executa callback depois de carregar
        if (callback) callback();
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
                // Ajustar img para página principal
                const images = item.querySelectorAll('img');
                images.forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && src.startsWith('./plates/')) {
                        img.setAttribute('src', './menu/plates/' + src.substring('./plates/'.length));
                    }
                });
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
        fetch('../menu/menu.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Ajustar img para página do menu
            tempDiv.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src && src.startsWith('./menu/plates/')) {
                    img.setAttribute('src', './plates/' + src.substring('./menu/plates/'.length));
                }
            });

            container.innerHTML = tempDiv.innerHTML;
        })
        .catch(error => {
            console.error('Erro ao carregar itens do menu:', error);
        });
    }
}

// ===== INICIALIZAÇÃO =====
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function initializePage() {
    const currentPath = window.location.pathname;
    const isInMenu = currentPath.includes('/menu/');
    // Header/footer paths dinâmicos conforme página
    const headerPath = isInMenu ? '../headers/header.html' : './headers/header.html';
    const footerPath = isInMenu ? '../headers/footer.html' : './headers/footer.html';

    // Carrega header e ativa navegação depois
    loadHTML('header-placeholder', headerPath, function() {
        initializeNavigation();
    });
    loadHTML('footer-placeholder', footerPath);

    // Secção de menu destacada ou menu completo
    const featuredContainer = document.getElementById('featured-menu-items');
    const allMenuContainer = document.getElementById('all-menu-items');

    if (featuredContainer) loadFeaturedMenuItems();
    if (allMenuContainer) loadAllMenuItems();
}

// ===== CÓDIGO PRINCIPAL =====
class CismaWebsite {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupLazyLoading();
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

// ===== INICIALIZAÇÃO FINAL =====
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    new CismaWebsite();
});