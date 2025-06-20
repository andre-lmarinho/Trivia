// VISUAL FEEDBACK HELPER
function setFeedback(el, isCorrect, feedbackEl) {
    el.classList.remove('correct', 'incorrect');
    el.classList.add(isCorrect ? 'correct' : 'incorrect');
    feedbackEl.textContent = isCorrect ? 'Correct!' : 'Incorrect';
}

// MULTIPLE CHOICE HANDLER
document.querySelectorAll('[data-type="multiple"]').forEach(sec => {
    const answer = sec.dataset.answer;
    const feedbackEl = sec.querySelector('.feedback');

    sec.querySelectorAll('.choice').forEach(btn => {
        btn.addEventListener('click', () => {
        // limpa estados
        sec.querySelectorAll('.choice').forEach(x => x.classList.remove('correct','incorrect'));
        const ok = btn.textContent.trim() === answer;
        setFeedback(btn, ok, feedbackEl);

        // seta status no selector
        const sel = document.querySelector(`.selector[data-target="${sec.id}"]`);
        sel.classList.toggle('correct', ok);
        sel.classList.toggle('incorrect', !ok);
        });
    });
});

// FREE RESPONSE HANDLER
document.querySelectorAll('[data-type="free"]').forEach(sec => {
    const answer = sec.dataset.answer;
    const feedbackEl = sec.querySelector('.feedback');
    const input = sec.querySelector('.free-input');
    const btn = sec.querySelector('.check-free');

    btn.addEventListener('click', () => {
        const ok = input.value.trim() === answer;
        setFeedback(input, ok, feedbackEl);

        const sel = document.querySelector(`.selector[data-target="${sec.id}"]`);
        sel.classList.toggle('correct', ok);
        sel.classList.toggle('incorrect', !ok);
    });
});

// QUESTION NAVIGATION SELECTOR
const selectors = document.querySelectorAll('.selector');
selectors.forEach(btn => {
    btn.addEventListener('click', () => {
        // aria e hidden
        selectors.forEach(x => {
        x.classList.remove('active');
        x.setAttribute('aria-selected','false');
        });
        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected','true');
        document.getElementById(btn.dataset.target).classList.remove('hidden');
    });
});

// Display the first question by default - Just in case I messup CSS
selectors[0].click();