$(document).ready(function() {
    // --- CONFIGURAÇÃO INICIAL DO QUIZ ---
    console.log("Gauss_QUIZ: Script corrigido iniciado.");

    let currentQuestionIndex = 1;
    let totalPoints = 0;
    const totalQuestions = $(".qs").not(".result").length;
    const $headerTitle = $("#headertitle");

    console.log(`Gauss_QUIZ: Total de ${totalQuestions} perguntas encontradas.`);

    // Mostra apenas a primeira pergunta ao iniciar
    $(".qs.quest1").show();

    // --- MANIPULADOR DE CLIQUE NAS OPÇÕES ---
    $(".qoptions li").on("click", function() {
        const $selectedOption = $(this);
        const $currentQuestion = $(".quest" + currentQuestionIndex);

        // Previne múltiplos cliques
        if ($currentQuestion.is(':animated') || $selectedOption.hasClass('disabled')) {
            return;
        }

        // Desabilita outras opções na mesma pergunta
        $currentQuestion.find('.qoptions li').addClass('disabled');

        // Adiciona pontos
        const points = parseInt($selectedOption.data("points")) || 0;
        totalPoints += points;
        console.log(`Gauss_QUIZ: Pergunta ${currentQuestionIndex} | Pontos: ${points} | Total: ${totalPoints}`);

        // Animação da seleção
        $currentQuestion.find(".qcir").removeClass("active");
        $selectedOption.find(".qcir").addClass("active");

        // Transição para a próxima etapa
        setTimeout(function() {
            $currentQuestion.fadeOut(400, function() {
                currentQuestionIndex++;

                if (currentQuestionIndex <= totalQuestions) {
                    // Mostra a próxima pergunta
                    $(".quest" + currentQuestionIndex).css('display', 'flex').hide().fadeIn(400); // Garante display:flex e animação
                    $(".quiznumber").text(currentQuestionIndex);
                    $(".quiznum li").removeClass("qactive");
                    $(".quiznum li:nth-child(" + currentQuestionIndex + ")").addClass("qactive");
                } else {
                    displayResults();
                }
            });
        }, 300);
    });

    /**
     * Função para exibir os resultados finais.
     */
    function displayResults() {
        console.log(`Gauss_QUIZ: Fim do quiz. Exibindo resultados com ${totalPoints} pontos.`);
        
        // Remove as classes de cor existentes e adiciona a nova com base na pontuação
        $headerTitle.empty(); // Limpa o conteúdo atual

        if (totalPoints > 4) { // Ajuste o valor de corte se necessário
            $headerTitle.append('<span class="header-text-white">Oh! Aparentemente você tem fortes indícios de intoxicação com a proteína spike da </span>')
                       .append('<span class="header-text-red">VACINA</span>');
        } else {
            $headerTitle.append('<span class="header-text-white">Seu resultado indica um menor risco de efeitos colaterais da proteína spike.</span>');
        }

        // Preenche o texto do resultado
        const resultText3 = "De acordo com as respostas, possivelmente essa é a condição do seu cérebro atualmente...";
        const resultText4 = `
            <p><strong>Agora, as boas notícias</strong></p>
            <p>Isso significa que você está muito mais perto de iniciar um poderoso protocolo de <strong>DETOX</strong> — o mesmo que já tem ajudado inúmeras pessoas vacinadas a recuperarem sua saúde e bem-estar.</p>
            <p>Ao seguir esse protocolo simples, você fortalece sua imunidade e permite que seu corpo elimine naturalmente a proteína spike — um dos principais responsáveis por diversos efeitos colaterais.</p>
            <p>Com o detox completo, seu cérebro e seu corpo tendem a funcionar de forma mais equilibrada — como mostrado na imagem à direita — e você literalmente poderá retomar a vida com mais energia, clareza e vitalidade.</p>
            <p>Não é segredo que muitos poderosos querem manter isso longe da população. Afinal, quanto mais pessoas doentes, mais lucro para as grandes farmacêuticas, que alimentam um ciclo contínuo de dependência de remédios e vacinas.</p>
            <p><strong>Clique no botão abaixo para acessar a página com todas as instruções</strong> — entenda como a proteína spike age no corpo, como combatê-la e veja relatos reais de pessoas que já recuperaram sua saúde com o nosso protocolo de Detox.</p>
        `;

        $("#result_ponit3").html(resultText3);
        $("#result_ponit4").html(resultText4);

        // Mostra a seção de resultados
        $(".quiznum, .quiznummob").hide();
        $(".qs.result").css('display', 'block').hide().fadeIn(800);
        $(".resultbtn").fadeIn(800);

        // Rola a página para o topo para mostrar a mudança no título
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
});
