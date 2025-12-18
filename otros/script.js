/**
 * Marketplace Valles del Tuy - Lógica de Usuario
 * Optimizado para rendimiento y limpieza de memoria
 */

// Usamos una estructura de módulo para no contaminar el espacio global
const MarketplaceApp = {
    slideIndex: 0,
    searchTimeout: null,

    init() {
        // Inicializar componentes
        this.initSlideshow();
        this.initSearch();
        this.initSmoothScroll();
        this.initCategoryFilters();
    },

    // 1. LÓGICA DEL CARRUSEL (Mejorada para evitar errores)
    initSlideshow() {
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");

        if (slides.length === 0) return; // Si no hay slides, no hacer nada

        // Ocultar todos
        Array.from(slides).forEach(slide => slide.style.display = "none");
        Array.from(dots).forEach(dot => dot.classList.remove("active"));

        this.slideIndex++;
        if (this.slideIndex > slides.length) this.slideIndex = 1;

        slides[this.slideIndex - 1].style.display = "block";
        if (dots[this.slideIndex - 1]) {
            dots[this.slideIndex - 1].classList.add("active");
        }

        // Usamos flecha para mantener el contexto de 'this'
        setTimeout(() => this.initSlideshow(), 5000);
    },

    // 2. LÓGICA DE BÚSQUEDA (Con Debouncing y Normalización)
    initSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.performFilter(e.target.value.toLowerCase().trim());
            }, 300);
        });
    },

    // 3. FILTRADO CENTRALIZADO (Para búsqueda y botones)
    performFilter(term, category = 'all') {
        const posts = document.querySelectorAll('.property-card.post');
        
        // Normalización de texto para ignorar acentos (Opcional pero recomendado)
        const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedTerm = normalize(term);

        posts.forEach(post => {
            const title = normalize(post.querySelector('h3')?.textContent.toLowerCase() || '');
            const cat = post.getAttribute('data-category')?.toLowerCase() || '';
            const loc = normalize(post.getAttribute('data-location')?.toLowerCase() || '');
            const alt = normalize(post.querySelector('img')?.alt.toLowerCase() || '');

            const matchesSearch = title.includes(normalizedTerm) || 
                                 loc.includes(normalizedTerm) || 
                                 alt.includes(normalizedTerm) ||
                                 cat.includes(normalizedTerm);
            
            const matchesCategory = (category === 'all' || cat === category);

            // Animación suave mediante clases CSS
            if (matchesSearch && matchesCategory) {
                post.classList.remove('is-hidden');
                post.style.display = "block"; // Asegura visibilidad para el grid
            } else {
                post.classList.add('is-hidden');
                // Retrasamos el display none para que se vea la transición de opacidad
                setTimeout(() => {
                    if (post.classList.contains('is-hidden')) post.style.display = "none";
                }, 400);
            }
        });
    },

    // 4. FILTROS POR BOTONES (NUEVO: Mejora la UX)
    initCategoryFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // UI: Cambiar botón activo
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-filter');
                this.performFilter('', category);
            });
        });
    },

    // 5. NAVEGACIÓN SUAVE (Mejorada)
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === "#") return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// Iniciar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => MarketplaceApp.init());
