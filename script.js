const scroller = scrollama();
const choices = document.querySelectorAll('.choice');
const sections = document.querySelectorAll('.fade-section');
const charContainer = document.getElementById('dynamic-character');

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const mode = choice.getAttribute('data-perspective');
        
        // 1. Gør karakteren klar
        let filePrefix = mode === "motorist" ? "driver" : mode;
        document.getElementById('happy-char-img').src = `${filePrefix}_happy.svg`;
        
        // 2. Vis næste sektioner og start fade
        document.getElementById('story-hook').classList.remove('hidden');
        document.getElementById('scrolly-container').classList.remove('hidden');
        document.getElementById('scroll-prompt').classList.remove('hidden');
        
        // 3. Setup Plotly
        document.getElementById('plot-frame').src = `${mode}_hourly_plot.html`;

        initScrollama();
    });
});

function initScrollama() {
    scroller
        .setup({
            step: ".step",
            offset: 0.7
        })
        .onStepEnter(response => {
            // Hent position fra data-attributten i HTML
            const newPos = response.element.getAttribute('data-char-pos');
            
            // Fjern alle gamle positioner og tilføj den nye
            charContainer.className = ''; 
            charContainer.classList.add(newPos);
        });

    // Intersection Observer til at fade sektioner ind/ud
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}