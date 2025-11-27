document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL MENÚ RESPONSIVE ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abrir / Cerrar Menú
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('locked-scroll'); // Bloquea scroll del fondo
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('is-active');
            navMenu.classList.remove('active');
            document.body.classList.remove('locked-scroll');
        });
    });


    // --- LÓGICA DEL CARRUSEL ---
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const dotsNav = document.querySelector('.indicators');
    const dots = Array.from(dotsNav.children);

    let currentSlideIndex = 0;

    const updateSlide = (index) => {
        // Quitar clase active de todo
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Poner clase active al actual
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    };

    nextButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlide(currentSlideIndex);
    });

    prevButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlide(currentSlideIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlideIndex = index;
            updateSlide(currentSlideIndex);
        });
    });

    // Autoplay opcional (cada 5 segundos)
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlide(currentSlideIndex);
    }, 5000);

});
