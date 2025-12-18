// ==========================================================

// Lógica del Carrusel (Slideshow)

// ==========================================================

let slideIndex = 0;

// Se llama al inicio para empezar el carrusel

showSlides(); 



function showSlides() {

  let i;

  let slides = document.getElementsByClassName("mySlides");

  let dots = document.getElementsByClassName("dot");

  

  for (i = 0; i < slides.length; i++) {

    slides[i].style.display = "none";

  }

  

  // Uso de classList es más moderno que modificar className directamente

  for (i = 0; i < dots.length; i++) {

    dots[i].classList.remove("active"); 

  }

  

  slideIndex++;

  if (slideIndex > slides.length) {

    slideIndex = 1;

  }

  

  slides[slideIndex - 1].style.display = "block";

  dots[slideIndex - 1].classList.add("active");

  

  // Llama a la función cada 5 segundos

  setTimeout(showSlides, 5000);

}





// ==========================================================

// Lógica de Búsqueda y Navegación (Optimizado con Debouncing)

// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('searchInput');

    const posts = document.querySelectorAll('.property-card.post');

    let searchTimeout = null; // Variable para el Debouncing



    // 1. FUNCIÓN DE FILTRADO

    function filterPosts(searchTerm) {

        const term = searchTerm.toLowerCase().trim();



        posts.forEach(post => {

            // Se busca en el título, alt de imagen, categorías y localización

            const postTitle = post.querySelector('h3') ? post.querySelector('h3').textContent.toLowerCase() : '';

            const postImageAlt = post.querySelector('img').alt.toLowerCase();

            const postCategory = post.getAttribute('data-category').toLowerCase();

            const postLocation = post.getAttribute('data-location').toLowerCase();



            // Lógica de coincidencia

            const isMatch = postTitle.includes(term) || 

                            postImageAlt.includes(term) ||

                            postCategory.includes(term) ||

                            postLocation.includes(term);



            // Aplicar las clases optimizadas del CSS para animación

            if (isMatch) {

                post.classList.remove('is-hidden'); 

            } else {

                post.classList.add('is-hidden'); 

            }

        });

    }





    // 2. DEBOUNCING IMPLEMENTADO (CRUCIAL PARA EL RENDIMIENTO)

    searchInput.addEventListener('keyup', function() {

        // Limpia el temporizador anterior

        clearTimeout(searchTimeout); 



        // Establece un nuevo temporizador

        searchTimeout = setTimeout(() => {

            // Llama a la función de filtrado SOLO después de 300ms de inactividad

            filterPosts(this.value);

        }, 300); 

    });





    // 3. NAVEGACIÓN (Scroll a secciones) - ARREGLADO

    const navLinks = document.querySelectorAll('.nav-menu a');

    

    navLinks.forEach(link => {

        link.addEventListener('click', (e) => {

            e.preventDefault(); 

            

            // Obtiene el ID del destino (inicio, ofertas, formulario-contacto)

            const targetId = link.getAttribute('href').substring(1); 

            

            // Scroll a la sección correcta

            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });



            // Opcional: limpiar la búsqueda al navegar por el menú

            searchInput.value = '';

            filterPosts(''); // Muestra todos los artículos al limpiar

        });

    });

}); 
