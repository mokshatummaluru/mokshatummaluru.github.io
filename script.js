document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scrollToTop');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // Close menu after clicking a link (mobile)
    navLinks.forEach(link => link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    }));

    // Smooth scrolling for internal links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (!link) return;
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.1 });
    sections.forEach(section => sectionObserver.observe(section));

    // Reveal on scroll (fade up)
    const revealTargets = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.about .about-content > *'),
        ...document.querySelectorAll('.skill-category'),
        ...document.querySelectorAll('.projects .project-card'),
        ...document.querySelectorAll('.achievements .achievement-card'),
        ...document.querySelectorAll('.contact .contact-content > *')
    ];
    revealTargets.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => revealObserver.observe(el));

    // Animate skill bars when skills section comes into view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const progressBars = skillsSection.querySelectorAll('.skill-progress');
        const skillsObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width') || '0';
                        bar.style.width = targetWidth + '%';
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });
        skillsObserver.observe(skillsSection);
    }

    // Scroll-to-top button
    const toggleScrollTop = () => {
        const show = window.scrollY > 600;
        if (show) scrollTopBtn.classList.add('show');
        else scrollTopBtn.classList.remove('show');
    };
    toggleScrollTop();
    window.addEventListener('scroll', toggleScrollTop, { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Contact form (prevent page reload and simple UX)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                return;
            }
            alert('Thanks, your message has been prepared. Please send via your email client.');
            // You can replace this with a mailto link if desired
            // window.location.href = `mailto:mokshadhar499@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)} (${email})`;
            form.reset();
        });
    }
});



