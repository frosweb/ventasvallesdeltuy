document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const searchCategory = document.getElementById('searchCategory');
    const propertyCards = document.querySelectorAll('.property-card');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // --- Funcionalidad de Búsqueda Optimizada por Categoría ---

    function filterProperties() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = searchCategory.value;

        // Mostrar/Ocultar el botón de borrado
        searchClear.style.display = searchTerm.length > 0 ? 'inline-block' : 'none';

        propertyCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h4').textContent.toLowerCase();
            const cardAlt = card.querySelector('img').alt.toLowerCase();

            // 1. Filtrar por Categoría: (Si la categoría seleccionada no es 'all' y la tarjeta no coincide)
            const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;

            // 2. Filtrar por Término: (Si el término de búsqueda está vacío O si coincide con el título/alt)
            const matchesSearch = searchTerm === '' || cardTitle.includes(searchTerm) || cardAlt.includes(searchTerm);

            // 3. Mostrar tarjeta solo si cumple AMBAS condiciones
            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // --- Event Listeners para la Búsqueda ---
    
    // Filtra al escribir
    searchInput.addEventListener('input', filterProperties);
    
    // Filtra al cambiar la categoría
    searchCategory.addEventListener('change', filterProperties);
    
    // Limpia el input y resetea los filtros al hacer clic
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchCategory.value = 'all'; // Opcional: Resetea también la categoría
        filterProperties();
    });
    
    // --- Funcionalidad Visual (Volver Arriba) ---

    // Mostrar el botón cuando se desplaza
    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    }

    // Al hacer clic, vuelve al inicio de la página
    backToTopBtn.addEventListener('click', () => {
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
    });
});
