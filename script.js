const scroller = scrollama();

const choices = document.querySelectorAll('.choice');
const scrollPrompt = document.getElementById('scroll-prompt');
const storyHook = document.getElementById('story-hook');
const scrollyContainer = document.getElementById('scrolly-container');

const plotFrame = document.getElementById('plot-frame');
const happyCharImg = document.getElementById('happy-char-img');
const hookTitle = document.getElementById('hook-title');

let currentMode = "";

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        currentMode = choice.getAttribute('data-perspective');

        choices.forEach(c => c.classList.add('fade-out'));
        choice.classList.remove('fade-out');
        choice.classList.add('selected-shake');

        scrollPrompt.classList.remove('hidden');

        prepareContent(currentMode);
    });
});

function prepareContent(mode) {
    // 1. Indlæs plottet (motorist_hourly_plot.html virker nu direkte)
    plotFrame.src = `${mode}_hourly_plot.html`;

    // 2. Sæt den glade karakter ind til højre
    // HVIS dine filer stadig hedder 'driver_happy.svg', lader vi den kigge efter det
    let imgName = mode === "motorist" ? "driver" : mode;
    happyCharImg.src = `${imgName}_happy.svg`;

    // 3. Opdater hook-teksten
    hookTitle.innerText = `The streets of NYC from a ${mode}'s perspective...`;

    // 4. Vis sektionerne ved scroll
    window.addEventListener('scroll', function revealSections() {
        if (window.scrollY > 100) {
            storyHook.classList.remove('hidden');
            scrollyContainer.classList.remove('hidden');
            initScrollama();
            window.removeEventListener('scroll', revealSections);
        }
    });
}

function initScrollama() {
    scroller
        .setup({
            step: ".step",
            offset: 0.7,
            debug: false
        })
        .onStepEnter(response => {
            response.element.classList.add("is-active");
            console.log("Entering step:", response.index);
        });
}

window.addEventListener("resize", scroller.resize);