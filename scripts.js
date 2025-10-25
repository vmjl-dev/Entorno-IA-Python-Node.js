 // Smooth scrolling para navegación académica
        document.querySelectorAll('.toc-list a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 30,
                    behavior: 'smooth'
                });
            });
        });

        // Highlight de sección actual para mejor navegación
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('.content-section');
            const navLinks = document.querySelectorAll('.toc-list a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.fontWeight = 'normal';
                link.style.color = 'var(--secondary-color)';
                if (link.getAttribute('href') === `#${current}`) {
                    link.style.fontWeight = 'bold';
                    link.style.color = 'var(--accent-color)';
                }
            });
        });

        // Efecto de aparición suave para elementos académicos
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Aplicar observador a elementos de contenido
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
