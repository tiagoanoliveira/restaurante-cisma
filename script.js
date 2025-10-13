// ===== FUNÇÕES UTILITÁRIAS =====
function loadHTML(id, url, callback) {
    fetch(url)
    .then(response => {
        if (!response.ok) throw new Error('Falha ao carregar o arquivo: ' + url);
        return response.text();
    })
    .then(data => {
        const element = document.getElementById(id);
        element.innerHTML = data;

        const currentPath = window.location.pathname;
        const isInSubPath = (currentPath.includes('/menu/') || currentPath.includes('/reviews/'));
        if (isInSubPath) {
            element.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src && src.startsWith('./')) {
                    img.setAttribute('src', '../' + src.substring(2));
                }
            });

            element.querySelectorAll('a').forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('./') && !href.startsWith('#')) {
                    link.setAttribute('href', '../' + href.substring(2));
                }
            });
        }

        if (callback) callback();
    })
    .catch(error => console.error(error));
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
                    // Ativar lazy nativo quando aplicável
                    img.loading = 'lazy';
                });
                container.appendChild(item.cloneNode(true));
            });
        }
    })
    .catch(error => console.error('Erro ao carregar itens do menu:', error));
}

function loadAllMenuItems() {
    const container = document.getElementById('all-menu-items');
    if (container) {
        fetch('../menu/menu.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            tempDiv.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src && src.startsWith('./menu/plates/')) {
                    img.setAttribute('src', './plates/' + src.substring('./menu/plates/'.length));
                }
                img.loading = 'lazy';
            });

            container.innerHTML = tempDiv.innerHTML;
        })
        .catch(error => console.error('Erro ao carregar itens do menu:', error));
    }
}

// ===== GALLERY SLIDER (mobile only) =====
(function () {
  const slider = document.querySelector('.gallery-slider');
  const track = document.querySelector('.gallery-track');
  if (!slider || !track) return;

  const slides = Array.from(track.querySelectorAll('.gallery-slide'));
  const btnPrev = slider.querySelector('.gallery-nav.prev');
  const btnNext = slider.querySelector('.gallery-nav.next');

  let index = 0;
  let autoplayTimer = null;
  const interval = 5000;

  const isMobile = () => window.matchMedia('(max-width: 500px)').matches;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    const x = slides[index].offsetLeft;
    track.scrollTo({ left: x, behavior: 'smooth' });
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, interval);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  // Atualiza index com base no scroll (snap)
  let scrollDebounce;
  track.addEventListener('scroll', () => {
    if (!isMobile()) return;
    if (scrollDebounce) cancelAnimationFrame(scrollDebounce);
    scrollDebounce = requestAnimationFrame(() => {
      const scrollLeft = track.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      slides.forEach((s, i) => {
        const dist = Math.abs(s.offsetLeft - scrollLeft);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      index = closest;
    });
  }, { passive: true });

  // Botões
  btnNext?.addEventListener('click', () => { stopAutoplay(); next(); startAutoplay(); });
  btnPrev?.addEventListener('click', () => { stopAutoplay(); prev(); startAutoplay(); });

  // Pausar em hover/toque e retomar
  ['mouseenter','touchstart','focusin'].forEach(evt => {
    slider.addEventListener(evt, stopAutoplay, { passive: true });
  });
  ['mouseleave','touchend','blur'].forEach(evt => {
    slider.addEventListener(evt, () => { if (isMobile()) startAutoplay(); }, { passive: true });
  });

  // Reagir a resize (só autoplay em mobile; reset posição)
  window.addEventListener('resize', () => {
    if (isMobile()) {
      goTo(index);
      startAutoplay();
    } else {
      stopAutoplay();
    }
  });

  // Inicialização condicional
  if (isMobile()) {
    goTo(0);
    startAutoplay();
  }
})();

function loadReviewWidgets() {
    const container = document.getElementById('reviews-widgets');
    if (!container) return;
    const isInSubPath = (window.location.pathname.includes('/menu/') || window.location.pathname.includes('/reviews/'));
    const partialPath = isInSubPath ? './review.html' : './reviews/review.html';   
    fetch(partialPath)
    .then(r => {
      if (!r.ok) throw new Error('Falha ao carregar partial de reviews: ' + partialPath);
      return r.text();
    })
    .then(html => {
        container.innerHTML = html;

        if (!isInSubPath) {
            container.querySelectorAll('img, a').forEach(el => {
            const attr = el.tagName === 'A' ? 'href' : 'src';
            const val = el.getAttribute(attr);
        if (val && val.startsWith('../')) {
            el.setAttribute(attr, val.substring(3)); // remove "../"
        }
        });
        }

      container.querySelectorAll('img').forEach(img => {
        if (!img.loading) img.loading = 'lazy';
      });
    })
    .catch(err => console.error(err));
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
    const isInSubPath = (currentPath.includes('/menu/') || currentPath.includes('/reviews/'));
    const headerPath = isInSubPath ? '../headers/header.html' : './headers/header.html';
    const footerPath = isInSubPath ? '../headers/footer.html' : './headers/footer.html';

    loadHTML('header-placeholder', headerPath, function() {
        initializeNavigation();
    });
    loadHTML('footer-placeholder', footerPath);

    const featuredContainer = document.getElementById('featured-menu-items');
    const allMenuContainer = document.getElementById('all-menu-items');
    if (featuredContainer) loadFeaturedMenuItems();
    if (allMenuContainer) loadAllMenuItems();

    // Home
    if (document.getElementById('reviews-widgets')) {
        loadReviewWidgets('reviews-widgets');
    }
    // Página reviews/index.html
    if (document.getElementById('reviews-widgets-page')) {
        loadReviewWidgets('reviews-widgets-page');
    }
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

    // Usa rAF para reduzir trabalho em scroll
    setupScrollEffects() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset;
                    if (scrollTop > 100) {
                        this.navbar?.classList.add('scrolled');
                    } else {
                        this.navbar?.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
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
                        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                    }
                }
            });
        });
    }

    setupLazyLoading() {
        // Prioriza lazy nativo; fallback para IntersectionObserver
        const images = document.querySelectorAll('img[data-src]');

        if ('loading' in HTMLImageElement.prototype) {
            images.forEach(img => {
                img.src = img.dataset.src;
                img.loading = 'lazy';
                img.removeAttribute('data-src');
            });
            return;
        }

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