document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Elementos del DOM ---
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const searchCategory = document.getElementById('searchCategory');
    const propertyCards = document.querySelectorAll('.property-card');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // --- 2. Funcionalidad de Búsqueda y Filtrado Optimizada ---

    function filterProperties() {
        // Obtiene y normaliza el término de búsqueda
        const searchTerm = searchInput.value.toLowerCase().trim();
        // Obtiene la categoría seleccionada
        const selectedCategory = searchCategory.value;

        // Muestra/Oculta el botón de borrado de la búsqueda
        searchClear.style.display = searchTerm.length > 0 ? 'inline-block' : 'none';

        propertyCards.forEach(card => {
            // Lee la categoría de la tarjeta (data-category="venta" o "alquiler")
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h4')?.textContent.toLowerCase() || '';
            const cardAlt = card.querySelector('img')?.alt.toLowerCase() || '';

            // Condición 1: Coincidencia de Categoría (true si es 'all' o si coincide)
            const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;

            // Condición 2: Coincidencia de Término (true si no hay término o si coincide con título/alt)
            const matchesSearch = searchTerm === '' || cardTitle.includes(searchTerm) || cardAlt.includes(searchTerm);

            // Muestra la tarjeta si cumple AMBAS condiciones
            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // --- 3. Asignación de Event Listeners ---
    
    // Filtra dinámicamente al escribir
    searchInput.addEventListener('input', filterProperties);
    
    // Filtra al cambiar la categoría
    searchCategory.addEventListener('change', filterProperties);
    
    // Limpia el input y resetea los filtros al hacer clic en la 'X'
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchCategory.value = 'all'; 
        filterProperties();
        searchInput.focus(); // Devuelve el foco al campo de búsqueda
    });
    
    // --- 4. Funcionalidad de Volver Arriba ---

    // Muestra el botón cuando el scroll baja 300px
    function toggleBackToTopButton() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    }

    // Llama a la función al hacer scroll
    window.addEventListener('scroll', toggleBackToTopButton);

    // Al hacer clic, desplaza la página al inicio
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave
        });
    });
});
