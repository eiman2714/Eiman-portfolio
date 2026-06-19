// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MOBILE NAVIGATION TOGGLE ====================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    function toggleMenu() {
        const isActive = navLinks.classList.toggle('active');
        if (hamburger) {
            hamburger.setAttribute('aria-expanded', isActive);
        }
        
        const spans = hamburger ? hamburger.querySelectorAll('span') : [];
        if (isActive) {
            if (spans[0]) spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            if (spans[1]) spans[1].style.opacity = '0';
            if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            body.style.overflow = 'hidden';
        } else {
            if (spans[0]) spans[0].style.transform = 'none';
            if (spans[1]) spans[1].style.opacity = '1';
            if (spans[2]) spans[2].style.transform = 'none';
            body.style.overflow = '';
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ==================== SMOOTH SCROLLING ====================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== CONTACT FORM HANDLER ====================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name && email && message) {
                formStatus.innerHTML = '✅ Message sent! I\'ll get back to you soon. 💖';
                formStatus.style.color = '#28a745';
                formStatus.style.fontWeight = '500';
                contactForm.reset();
            } else {
                formStatus.innerHTML = '❌ Please fill all fields. 🙏';
                formStatus.style.color = '#dc3545';
                formStatus.style.fontWeight = '500';
            }
            
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 3000);
        });
    }

    // ==================== SCROLL ANIMATION (INTERSECTION OBSERVER) ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply initial styles and observe all sections except hero
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(section);
        }
    });

   