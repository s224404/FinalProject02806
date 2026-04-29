const scroller = scrollama();

const choices = document.querySelectorAll('.choice');
const scrollPrompt = document.getElementById('scroll-prompt');
const scrollyContainer = document.getElementById('scrolly-container');
const charSprite = document.getElementById('character-sprite');

let currentMode = "";

// Håndter valg af path
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        currentMode = choice.getAttribute('data-perspective');

        // Visuel feedback på klik
        choices.forEach(c => c.classList.add('fade-out'));
        choice.classList.remove('fade-out');
        choice.classList.add('selected-shake');

        // Vis scroll pil
        scrollPrompt.classList.remove('hidden');

        // Gør klar til at vise historien
        prepareStory(currentMode);
    });
});

function prepareStory(mode) {
    // Sæt den neutrale karakter ind i den sticky sektion
    charSprite.innerHTML = `<img src="${mode}_neutral.svg" alt="${mode}">`;

    // Lyt efter scroll for at afsløre indholdet
    window.addEventListener('scroll', function reveal() {
        if (window.scrollY > 100) {
            scrollyContainer.classList.remove('hidden');
            window.removeEventListener('scroll', reveal);
            
            // Start Scrollama når indholdet er synligt
            initScrollama();
        }
    });
}

function initScrollama() {
    scroller
        .setup({
            step: ".step",
            offset: 0.6,
            debug: false
        })
        .onStepEnter(response => {
            // Tilføj 'is-active' klasse til det nuværende step
            response.element.classList.add("is-active");
            
            // Her kan vi senere tilføje kode til at skifte karakterens ansigtsudtryk
            console.log("Step", response.index, "entered");
        });
}

window.addEventListener("resize", scroller.resize);