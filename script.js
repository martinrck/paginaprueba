document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 0. PRELOADER (PANTALLA DE CARGA)
    // =========================================
    const preloader = document.getElementById('preloader');
    const hiddenElements = document.querySelectorAll('.hidden-element');

    // 1. Bloqueamos scroll al inicio
    document.body.classList.add('loading');

    // 2. Temporizador para quitar la pantalla de carga
    setTimeout(() => {
        // A. Quitar pantalla negra (Verificamos que exista para evitar errores)
        if (preloader) {
            preloader.classList.add('fade-out');
        }
        
        // B. Devolver el scroll al usuario
        document.body.classList.remove('loading');

        // C. Hacer entrar los elementos
        setTimeout(() => {
            hiddenElements.forEach(el => {
                el.classList.add('show-element');
            });
        }, 300);

    }, 2200);


    // =========================================
    // 1. MENÚ MÓVIL (CORREGIDO Y SEGURO)
    // =========================================
    const menuBtn = document.getElementById('mobile-menu-btn'); // Debe coincidir con el HTML
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // SOLUCIÓN AL ERROR: Verificamos si existe el botón antes de usarlo.
    if (menuBtn && navMenu) {
        
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('is-active');
            navMenu.classList.toggle('active');
            
            // Solo bloqueamos scroll si NO estamos cargando la página
            if (!document.body.classList.contains('loading')) {
                document.body.classList.toggle('locked-scroll');
            }
        });

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

    } else {
        // Si no encuentra el menú, no hace nada y NO rompe el resto del sitio
        console.log("Menú móvil no activo en esta resolución o ID incorrecto.");
    }


    // =========================================
    // 2. NAVBAR SCROLL EFFECT
    // =========================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }


    // =========================================
    // 3. CARRUSEL LÓGICA
    // =========================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');
    
    // Verificamos si hay slides para evitar errores
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        // Crear indicadores
        if (indicatorsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                indicatorsContainer.appendChild(dot);
            });
        }

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

        // Listeners seguros
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
            
            const x = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = 15 + Math.random() * 20;
            const size = Math.random() * 3;

            particle.style.left = `${x}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            if(Math.random() > 0.8) {
                particle.style.background = '#3333ff';
                particle.style.boxShadow = '0 0 5px #3333ff';
            }

            particlesContainer.appendChild(particle);
        }
    }
});
