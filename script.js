// Initialiser Scrollama
const scroller = scrollama();

// Find elementer
const introSection = document.getElementById('intro');
const scrollyContainer = document.getElementById('scrolly-container');
const choices = document.querySelectorAll('.choice');
const charSprite = document.getElementById('character-sprite');

// Funktion der starter historien
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const perspective = choice.getAttribute('data-perspective');
        startStory(perspective);
    });
});

function startStory(mode) {
    // 1. Skjul intro og vis scrollytelling
    introSection.classList.add('hidden');
    scrollyContainer.classList.remove('hidden');

    // 2. Indsæt den rigtige karakter i det "sticky" felt
    // Her bruger vi den neutrale version som start
    charSprite.innerHTML = `<img src="${mode}_neutral.svg" alt="${mode}">`;

    // 3. Rul automatisk til toppen af den nye sektion
    window.scrollTo(0, 0);

    // 4. Setup Scrollama (vi fortæller den hvilke 'steps' den skal kigge efter)
    setupScroller(mode);
}

function setupScroller(mode) {
    scroller
        .setup({
            step: ".step",
            offset: 0.5,
            debug: false
        })
        .onStepEnter(response => {
            // Her kan vi ændre karakterens udtryk eller talebobler
            // baseret på hvilket 'step' vi er nået til
            console.log("Enter step:", response.index, "for", mode);
            
            // Eksempel: Hvis vi er i step 2, skift til 'surprised'
            // charSprite.innerHTML = `<img src="${mode}_surprised.svg">`;
        });
}

// Sørg for at scrolleren genberegner størrelser hvis man ændrer vinduet
window.addEventListener("resize", scroller.resize);