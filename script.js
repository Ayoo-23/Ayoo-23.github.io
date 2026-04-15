// inter Obs Reveal whn Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Theme Toggle
const btn = document.getElementById('theme-toggle');
btn.addEventListener('click', () => {
    const doc = document.documentElement;
    if (doc.getAttribute('data-theme') === 'dark') {
        doc.setAttribute('data-theme', 'light');
        btn.innerHTML = '☾';
    } else {
        doc.setAttribute('data-theme', 'dark');
        btn.innerHTML = '☼';
    }
});

// Smooth Scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
