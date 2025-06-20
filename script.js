// Helper function to apply visual feedback
// element: the button or input to color
// isCorrect: boolean indicating correct or not
// feedbackEl: the <p> element where we show the text
function setFeedback(element, isCorrect, feedbackEl) {
    // remove any previous state
    element.classList.remove('correct', 'incorrect');
    // add new state class
    element.classList.add(isCorrect ? 'correct' : 'incorrect');
    // update feedback text
    feedbackEl.textContent = isCorrect ? 'Correct!' : 'Incorrect';
}

// Initialize the quiz by fetching questions.json
async function initQuiz() {
    // fetch the questions data
    const response = await fetch('./questions.json');
    const questions = await response.json();

    const selectorWrap = document.querySelector('.question-selector');
    const container    = document.querySelector('.container');

    // build the selector buttons and question sections
    questions.forEach(q => {
        // 1) Create and append a selector button
        const selBtn = document.createElement('button');
        selBtn.className = 'selector';
        selBtn.dataset.target = q.id;
        selBtn.textContent = `${q.id.slice(1)}`;
        selectorWrap.appendChild(selBtn);

        // 2) Create the question section container
        const sec = document.createElement('div');
        sec.className = 'section hidden';
        sec.id = q.id;
        sec.dataset.type   = q.type;
        sec.dataset.answer = q.answer;

        // 3) Build inner HTML based on question type
        let innerHTML = `<h2>${q.title}</h2><h3>${q.question}</h3>`;
        if (q.type === 'multiple') {
            innerHTML += '<div class="choices">';
            q.choices.forEach(choice => {
                innerHTML += `<button class="choice">${choice}</button>`;
            });
            innerHTML += '</div><p class="feedback"></p>';
        } else { // free response
            innerHTML += `
                <input type="text" class="free-input" />
                <button class="check-free">Check</button>
                <p class="feedback"></p>
            `;
        }

        sec.innerHTML = innerHTML;
        container.appendChild(sec);
    });

    // after DOM creation, attach all handlers
    applyMultipleHandlers();
    applyFreeHandlers();
    applyNavigation();

    // show the first question by default
    document.querySelector('.selector').click();
}

// Attach click handlers for all multiple-choice sections
function applyMultipleHandlers() {
    document.querySelectorAll('[data-type="multiple"]').forEach(sec => {
        const correctAnswer = sec.dataset.answer.trim();
        const feedbackEl    = sec.querySelector('.feedback');

        sec.querySelectorAll('.choice').forEach(btn => {
            btn.addEventListener('click', () => {
                // clear previous choice states
                sec.querySelectorAll('.choice')
                    .forEach(x => x.classList.remove('correct','incorrect'));

                // determine if clicked choice is correct
                const isCorrect = btn.textContent.trim() === correctAnswer;
                setFeedback(btn, isCorrect, feedbackEl);

                // mark corresponding selector button
                const sel = document.querySelector(`.selector[data-target="${sec.id}"]`);
                sel.classList.toggle('correct', isCorrect);
                sel.classList.toggle('incorrect', !isCorrect);
            });
        });
    });
}

// Attach click handlers for all free-response sections
function applyFreeHandlers() {
    document.querySelectorAll('[data-type="free"]').forEach(sec => {
        const correctAnswer = sec.dataset.answer.trim();
        const feedbackEl    = sec.querySelector('.feedback');
        const inputEl       = sec.querySelector('.free-input');
        const btnCheck      = sec.querySelector('.check-free');

        btnCheck.addEventListener('click', () => {
            // compare user input with correct answer
            const isCorrect = inputEl.value.trim() === correctAnswer;
            setFeedback(inputEl, isCorrect, feedbackEl);

            // mark corresponding selector button
            const sel = document.querySelector(`.selector[data-target="${sec.id}"]`);
            sel.classList.toggle('correct', isCorrect);
            sel.classList.toggle('incorrect', !isCorrect);
        });
    });
}

// Set up navigation between question sections
function applyNavigation() {
    const selectors = document.querySelectorAll('.selector');
    selectors.forEach(btn => {
        btn.addEventListener('click', () => {
            // hide all sections first
            document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
            // reset active state on all selector buttons
            selectors.forEach(x => x.classList.remove('active'));

            // show the targeted section
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.remove('hidden');
        });
    });
}

// wait for DOM to be ready, then initialize quiz
document.addEventListener('DOMContentLoaded', initQuiz);
