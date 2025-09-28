et slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  // Ocultar todas las diapositivas
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  // Quitar la clase 'active' de todos los puntos
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Incrementar el índice y reiniciarlo si se excede el número de diapositivas
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  
  // Mostrar la diapositiva actual y activar el punto correspondiente
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  
  // Llamar a la función cada 5 segundos
  setTimeout(showSlides, 5000);
}



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
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const posts = document.querySelectorAll('.property-card');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent the default anchor jump
            e.preventDefault(); 
            
            // Get the category from the link's href
            const category = link.getAttribute('href').substring(1); 
            
            // If the category is "inicio", show all posts
            if (category === 'inicio') {
                posts.forEach(post => {
                    post.style.display = 'block';
                });
            } else {
                // Otherwise, show only the posts that match the category
                posts.forEach(post => {
                    const postCategory = post.getAttribute('data-category');
                    if (postCategory === category) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            }

            // Scroll to the top of the property grid
            document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
        });
    });
});
