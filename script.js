document.querySelectorAll('.choice').forEach(button => {
    button.onclick = () => {
        let feedback = document.getElementById('feedback1');

        // Remove classes anteriores
        document.querySelectorAll('.choice').forEach(b => {
            b.classList.remove('correct', 'incorrect');
        });

        if (button.textContent === 'Paris') {
            button.classList.add('correct');
            feedback.textContent = "Correct!";
        } else {
            button.classList.add('incorrect');
            feedback.textContent = "Incorrect";
        }
    };
});

document.getElementById('check-answer').onclick = () => {
    const input = document.getElementById('input-answer');
    const feedback = document.getElementById('feedback2');

    // Limpa estado anterior
    input.classList.remove('correct', 'incorrect');

    if (input.value.trim() === "8") {
        input.classList.add('correct');
        feedback.textContent = "Correct!";
    } else {
        input.classList.add('incorrect');
        feedback.textContent = "Incorrect";
    }
};

// Seletor de navegação entre perguntas
document.querySelectorAll('.selector').forEach(button => {
    button.addEventListener('click', () => {
        // Esconde todas as seções
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });

        // Remove estado ativo dos botões
        document.querySelectorAll('.selector').forEach(b => {
            b.classList.remove('active');
        });

        // Ativa a seção selecionada
        const target = button.getAttribute('data-target');
        document.getElementById(target).style.display = 'block';
        button.classList.add('active');
    });
});

// Exibe a primeira pergunta por padrão
document.querySelector('.selector').click();

// Se foi correto
document.querySelector('[data-target="q1"]').classList.remove('active', 'incorrect');
document.querySelector('[data-target="q1"]').classList.add('correct');

// Se foi incorreto
document.querySelector('[data-target="q1"]').classList.remove('active', 'correct');
document.querySelector('[data-target="q1"]').classList.add('incorrect');