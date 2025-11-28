document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 0. PRELOADER Y ANIMACIÓN DE ENTRADA
    // =========================================
    const preloader = document.getElementById('preloader');
    const hiddenElements = document.querySelectorAll('.hidden-element');

    // 1. Aseguramos que el scroll esté bloqueado al inicio
    document.body.classList.add('loading');

    // 2. Temporizador para simular la carga (Sincronizado con la animación CSS de 2s)
    setTimeout(() => {
        
        // A. Desvanecer la pantalla negra
        if (preloader) {
            preloader.classList.add('fade-out');
        }
        
        // B. Devolver el scroll al usuario
        document.body.classList.remove('loading');

        // C. Hacer entrar los elementos (Título, Bola, etc.)
        // Esperamos 300ms para que el negro empiece a irse antes de que entren los textos
        setTimeout(() => {
            hiddenElements.forEach(el => {
                el.classList.add('show-element');
            });
        }, 300);

    }, 2200); // 2.2 segundos de espera


    // =========================================
    // 1. MENÚ MÓVIL
    // =========================================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('is-active');
            navMenu.classList.toggle('active');
            // Solo bloqueamos scroll si NO estamos en modo carga
            if (!document.body.classList.contains('loading')) {
                document.body.classList.toggle('locked-scroll');
            }
        });
    }

    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('is-active');
            navMenu.classList.remove('active');
            if (!document.body.classList.contains('loading')) {
                document.body.classList.remove('locked-scroll');
            }
        });
    });


    // =========================================
    // 2. NAVBAR SCROLL EFFECT
    // =========================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // =========================================
    // 3. CARRUSEL LÓGICA
    // =========================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        // Crear indicadores dinámicamente
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            if(indicatorsContainer) indicatorsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if(dots[index]) dots[index].classList.remove('active');
                
                if (index === currentSlide) {
                    slide.classList.add('active');
                    if(dots[index]) dots[index].classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlides();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlides();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlides();
            resetTimer();
        }

        function resetTimer() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000); 
        }

        // Listeners
        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetTimer();
            });
        }

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetTimer();
            });
        }

        // Iniciar automático
        slideInterval = setInterval(nextSlide, 5000);
    }


    // =========================================
    // 4. GENERADOR DE PARTÍCULAS
    // =========================================
    const particlesContainer = document.getElementById('particles-container');
    
    if (particlesContainer) {
        const particleCount = 50; 

        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Posición aleatoria horizontal
            const x = Math.random() * 100;
            // Retraso aleatorio
            const delay = Math.random() * 20;
            // Duración aleatoria (velocidad)
            const duration = 15 + Math.random() * 20;
            // Tamaño aleatorio
            const size = Math.random() * 3;

            particle.style.left = `${x}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            // Color ligeramente variado (blanco o azulado)
            if(Math.random() > 0.8) {
                particle.style.background = '#3333ff';
                particle.style.boxShadow = '0 0 5px #3333ff';
            }

            particlesContainer.appendChild(particle);
        }
    }
});
