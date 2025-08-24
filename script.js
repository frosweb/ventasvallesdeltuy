document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const posts = document.querySelectorAll('.post');

    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase(); // Término de búsqueda en minúsculas

        posts.forEach(post => {
            // Se busca en el título, el contenido y las etiquetas
            const postText = post.textContent.toLowerCase();
            const postImageAlt = post.querySelector('img').alt.toLowerCase();

            if (postText.includes(searchTerm) || postImageAlt.includes(searchTerm)) {
                post.style.display = 'flex'; // Muestra la publicación si hay coincidencia
            } else {
                post.style.display = 'none'; // Oculta la publicación
            }
        });
    });
});
