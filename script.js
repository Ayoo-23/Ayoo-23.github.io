/**
 * GESTION DU THÈME (DARK MODE)
 */
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Fonction pour appliquer le thème
function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Optionnel: On peut changer l'icône ici si nécessaire
}

// Initialisation au chargement
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

// Événement clic
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

/**
 * NAVIGATION FLUIDE (SMOOTH SCROLL)
 */
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Offset pour la nav collée
                behavior: 'smooth'
            });
        }
    });
});

/**
 * ANIMATIONS D'APPARITION (REVEAL ON SCROLL)
 * C'est ce qui donne l'effet "premium"
 */
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // On arrête d'observer une fois que c'est affiché
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

// On applique l'observateur aux sections et aux cartes de projets
document.querySelectorAll('section, .project-card').forEach(el => {
    el.classList.add('reveal-item'); // On ajoute la classe de base pour le CSS
    revealObserver.observe(el);
});

/**
 * HIGHLIGHT DE LA NAV AU SCROLL
 */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
