/**
 * Script do Quiz em JavaScript Puro (Vanilla JS)
 * Otimizado para performance e sem dependências externas.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Seletores de Elementos do DOM ---
    const questions = document.querySelectorAll('.qs');
    const options = document.querySelectorAll('.qoptions li');
    const totalQuestions = document.querySelectorAll('.qs:not(.result)').length;

    const headerTitle = document.getElementById('headertitle');
    const resultText3 = document.getElementById('result_ponit3');
    const resultText4 = document.getElementById('result_ponit4');

    const mobileProgressCurrent = document.querySelector('.quiz-number-current');
    const desktopProgressItems = document.querySelectorAll('.desktop-progress li');
    const progressIndicators = document.querySelectorAll('.progress-indicator');
    const resultButtonContainer = document.querySelector('.result-button-container');

    // --- Variáveis de Estado do Quiz ---
    let currentQuestionIndex = 0;
    let totalPoints = 0;

    // --- Inicialização ---
    if (document.querySelector('.quiz-number-total')) {
        document.querySelector('.quiz-number-total').textContent = totalQuestions;
    }

    // --- Funções ---

    /**
     * Navega para a próxima pergunta ou mostra os resultados.
     */
    function goToNextQuestion() {
        // Esconde a pergunta atual
        questions[currentQuestionIndex].classList.remove('active-question');

        currentQuestionIndex++;

        if (currentQuestionIndex < totalQuestions) {
            // Mostra a próxima pergunta
            questions[currentQuestionIndex].classList.add('active-question');
            updateProgress();
        } else {
            displayResults();
        }
    }

    /**
     * Atualiza os indicadores de progresso (mobile e desktop).
     */
    function updateProgress() {
        if (mobileProgressCurrent) {
            mobileProgressCurrent.textContent = currentQuestionIndex + 1;
        }
        desktopProgressItems.forEach((li, index) => {
            li.classList.toggle('active-progress', index === currentQuestionIndex);
        });
    }

    /**
     * Mostra a tela de resultados final.
     */
    function displayResults() {
        progressIndicators.forEach(indicator => indicator.style.display = 'none');

        let headerHTML = "";
        // Nova pontuação máxima = 3+2+2+2+2 = 11. Limite ajustado para 6.
        if (totalPoints > 6) {
            headerHTML = `<span>Oh! Aparentemente você tem fortes indícios de intoxicação com a proteína spike da </span><span class="text-danger">VACINA</span>`;
        } else {
            headerHTML = `<span>Seu resultado indica um grande risco de efeitos colaterais da proteína spike.</span>`;
        }
        headerTitle.innerHTML = headerHTML;

        resultText3.innerHTML = "De acordo com as respostas, possivelmente essa é a condição do seu cérebro atualmente...";

        // ===================================================================
        // A NOVA COPY FOI INSERIDA AQUI
        // ===================================================================
        resultText4.innerHTML = `
            <p><strong>Agora, a melhor parte: existe uma solução.</strong></p>
            <p>Você está a um passo de iniciar um protocolo de <strong>DETOX</strong> simples e natural, desenvolvido para combater a causa raiz dos seus sintomas: a proteína spike.</p>
            <p>Imagine poder:</p>
            <ul class="benefits-list">
                <li>✅ <strong>Eliminar</strong> a névoa mental e o cansaço constante.</li>
                <li>✅ <strong>Restaurar</strong> sua energia e vitalidade natural.</li>
                <li>✅ <strong>Fortalecer</strong> seu corpo contra futuros problemas.</li>
            </ul>
            <p>Essa é a solução que muitos poderosos não querem que você conheça.</p>
            <p><strong>Clique no botão abaixo para acessar as instruções, entender como o detox funciona e iniciar sua recuperação hoje mesmo.</strong></p>
        `;

        const resultScreen = document.querySelector('.qs.result');
        if (resultScreen) {
            resultScreen.classList.add('active-question');
        }

        if (resultButtonContainer) {
            resultButtonContainer.style.display = 'block';
        }

        // Rola a tela para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- Adiciona o Evento de Clique a todas as opções ---
    options.forEach(option => {
        option.addEventListener('click', (event) => {
            // Evita múltiplos cliques
            const parentUl = option.closest('.qoptions');
            if (parentUl.classList.contains('answered')) return;
            parentUl.classList.add('answered');

            // Adiciona a classe 'selected' para feedback visual
            option.classList.add('selected');

            // Soma os pontos
            const points = parseInt(option.dataset.points) || 0;
            totalPoints += points;

            // Atraso para o usuário ver a seleção antes de avançar
            setTimeout(goToNextQuestion, 300);
        });
    });
});