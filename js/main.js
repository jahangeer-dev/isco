/* -----------------------------------------------------------------------------
 * ISCO Technologies - Main JavaScript
 * -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');

        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Mobile Navigation ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Typing Effect (Hero) ---
    const words = ["E-Commerce Solutions", "App Development", "ERP Solutions"];
    let i = 0;
    let timer;

    // A simple re-implementation or we can leave static if the CSS blink is enough.
    // The HTML has "ERP Solutions" hardcoded. Let's make it dynamic.
    const typingTextElement = document.querySelector('.typing-text');

    if (typingTextElement) {
        function typeWriter() {
            const currentWord = words[i];
            typingTextElement.textContent = currentWord;

            // This is a simplified "slideshow" of text. 
            // Real typewriter effect would need char-by-char manipulation.

            i = (i + 1) % words.length;
        }
        // Change word every 3 seconds
        setInterval(typeWriter, 3000);
    }


    // --- Accordion ---
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            // Close other open items (optional - accordion behavior)
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-body').style.maxHeight = null;
                }
            });

            // Toggle current
            item.classList.toggle('active');

            const body = item.querySelector('.accordion-body');
            if (item.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                entry.target.style.opacity = "1"; // Ensure it stays visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial elements to animate (cards, headers)
    const fadeElements = document.querySelectorAll('.feature-card, .portfolio-item, .section-title, .feature-item');
    fadeElements.forEach(el => {
        el.style.opacity = "0"; // Start hidden
        el.style.transform = "translateY(30px)"; // Start lower
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });

    // Handle "animate-up" class dynamically
    // The CSS defines .animate-up keyframes for hero. 
    // Here we use inline styles for the scroll observer to keep it simple and reusable.

});
