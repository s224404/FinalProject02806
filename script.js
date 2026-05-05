const scroller = scrollama();
const charDiv = document.getElementById('fixed-character');
const happyImg = document.getElementById('happy-char-img');

// 1. KLIK PÅ FIGUR
document.querySelectorAll('.choice').forEach(choice => {
    choice.addEventListener('click', () => {
        const mode = choice.getAttribute('data-perspective');
        
        // Visuel feedback
        document.querySelectorAll('.choice').forEach(c => c.classList.add('fade-out'));
        choice.classList.remove('fade-out');

        // Gør indhold klar
        document.getElementById('story-hook').classList.remove('hidden');
        document.getElementById('scrolly-container').classList.remove('hidden');
        document.getElementById('fixed-character').classList.remove('hidden');
        document.getElementById('scroll-prompt').classList.remove('hidden');

        // Map motorist -> driver filer
        const fileBase = mode === 'motorist' ? 'driver' : mode;
        happyImg.src = `${fileBase}_happy.svg`;
        document.getElementById('plot-frame').src = `${mode}_hourly_plot.html`;

        initScrollama();
        setupFading();
    });
});

// 2. FADE LOGIK
function setupFading() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.step-section').forEach(section => observer.observe(section));
}

// 3. KARAKTER HOP
function initScrollama() {
    scroller
        .setup({ step: ".step", offset: 0.6 })
        .onStepEnter(response => {
            const pos = response.element.getAttribute('data-pos');
            charDiv.className = ''; // Reset position
            charDiv.classList.add(pos);
        });
}