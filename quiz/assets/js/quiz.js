$(document).ready(function() {
    // --- CONFIGURAÇÃO INICIAL DO QUIZ ---
    console.log("Gauss_QUIZ: Script refatorado iniciado.");

    let currentQuestionIndex = 1;
    let totalPoints = 0;
    const totalQuestions = $(".qs").not(".result").length;

    console.log(`Gauss_QUIZ: Total de ${totalQuestions} perguntas encontradas.`);

    // Esconde todas as perguntas e mostra apenas a primeira.
    $(".qs").hide();
    $(".quest1").show();
    $(".resultbtn").hide();

    // --- MANIPULADOR DE CLIQUE GERAL PARA AS OPÇÕES ---
    $(".qoptions li").on("click", function() {
        const $selectedOption = $(this);
        const $currentQuestion = $(".quest" + currentQuestionIndex);

        // Previne múltiplos cliques enquanto a animação ocorre
        if ($currentQuestion.is(':animated')) {
            return;
        }

        // Soma os pontos da opção clicada
        const points = parseInt($selectedOption.data("points")) || 0;
        totalPoints += points;
        console.log(`Gauss_QUIZ: Pergunta ${currentQuestionIndex} | Pontos: ${points} | Total: ${totalPoints}`);

        // Marca a opção selecionada
        $currentQuestion.find(".qcir").removeClass("active");
        $selectedOption.find(".qcir").addClass("active");

        // Transição suave para a próxima pergunta ou para o resultado
        setTimeout(function() {
            $currentQuestion.fadeOut(400, function() {
                currentQuestionIndex++;

                if (currentQuestionIndex <= totalQuestions) {
                    // Mostra a próxima pergunta
                    $(".quest" + currentQuestionIndex).fadeIn(400);
                    $(".quiznumber").text(currentQuestionIndex);
                    $(".quiznum li").removeClass("qactive");
                    $(".quiznum li:nth-child(" + currentQuestionIndex + ")").addClass("qactive");
                } else {
                    // Fim do quiz, exibe os resultados
                    displayResults();
                }
            });
        }, 300); // Um pequeno delay para o usuário ver a seleção
    });

    /**
     * Função final para calcular e exibir os resultados do quiz.
     */
    function displayResults() {
        console.log(`Gauss_QUIZ: Fim do quiz. Exibindo resultados com ${totalPoints} pontos.`);

        let headerText = "";

        // Define o texto principal com base na pontuação (ajuste o valor de corte se necessário)
        if (totalPoints > 4) {
            headerText = `<span class="text-white">Oh! Aparentemente você tem fortes indícios de intoxicação com a proteína spike da </span><span class="text-danger">VACINA</span>`;
        } else {
            headerText = `<span class="text-white">Seu resultado indica um menor risco de efeitos colaterais da proteína spike.</span>`;
        }

        // Atualiza o título principal da página
        $("#headertitle").html(headerText);

        const resultText3 = "De acordo com as respostas, possivelmente essa é a condição do seu cérebro atualmente...";
        
        // Usando template literals para melhor legibilidade do HTML
        const resultText4 = `
            <p><strong>Agora, as boas notícias</strong></p>
            <p>Isso significa que você está muito mais perto de iniciar um poderoso protocolo de <strong>DETOX</strong> — o mesmo que já tem ajudado inúmeras pessoas vacinadas a recuperarem sua saúde e bem-estar.</p>
            <p>Ao seguir esse protocolo simples, você fortalece sua imunidade e permite que seu corpo elimine naturalmente a proteína spike — um dos principais responsáveis por diversos efeitos colaterais.</p>
            <p>Com o detox completo, seu cérebro e seu corpo tendem a funcionar de forma mais equilibrada — como mostrado na imagem à direita — e você literalmente poderá retomar a vida com mais energia, clareza e vitalidade.</p>
            <p>Não é segredo que muitos poderosos querem manter isso longe da população. Afinal, quanto mais pessoas doentes, mais lucro para as grandes farmacêuticas, que alimentam um ciclo contínuo de dependência de remédios e vacinas.</p>
            <p><strong>Clique no botão abaixo para acessar a página com todas as instruções</strong> — entenda como a proteína spike age no corpo, como combatê-la e veja relatos reais de pessoas que já recuperaram sua saúde com o nosso protocolo de Detox.</p>
        `;

        // Insere o conteúdo na tela de resultados
        $("#result_ponit3").html(resultText3);
        $("#result_ponit4").html(resultText4);

        // Esconde a navegação do quiz e mostra a tela de resultados e o botão
        $(".quiznum, .quiznummob").hide();
        $(".qs.result").fadeIn(800);
        $(".resultbtn").fadeIn(800);

        // Rola a página para o topo para o usuário ver a mudança no título
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
});
