document.addEventListener('DOMContentLoaded', () => {
    
    // Typing animation for hero text
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        const text = "natalie's portfolio.";
        glitchText.textContent = ''; // Clear initial text
        
        // Create cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        
        let charIndex = 0;
        
        const typeText = () => {
            if (charIndex < text.length) {
                glitchText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100); // Typing speed: 100ms per character
            } else {
                // Add blinking cursor after typing is complete
                glitchText.appendChild(cursor);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeText, 500);
    }

    
    // Smooth scroll for navigation links with proper centering
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle hash links (internal page navigation)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Use the browser's native smooth scrolling with scroll-margin-top
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards (but exclude hero section)
    const animatedElements = document.querySelectorAll('.section, .project-card, .skill-category');
    
    animatedElements.forEach(el => {
        // Don't animate the hero section or elements inside it
        if (!el.closest('.hero')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        }
    });

    // Add active state to navigation on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Check if section is in the middle of viewport
            if (window.pageYOffset >= sectionTop - (window.innerHeight / 2) &&
                window.pageYOffset < sectionTop + sectionHeight - (window.innerHeight / 2)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add parallax effect to hero background
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg-effect');
    
    if (hero && heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Dynamic particle effects
    const bgEffects = document.querySelector('.bg-effects');
    
    if (bgEffects) {
        // Add more particles dynamically
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            bgEffects.appendChild(particle);
        }
    }

    // Add typing effect to hero tagline (optional)
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add glow effect on mouse move for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

});