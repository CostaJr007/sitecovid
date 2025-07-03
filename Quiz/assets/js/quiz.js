$(document).ready(function() {
    // --- CONFIGURAÇÃO INICIAL DO QUIZ ---
    console.log("Gauss_QUIZ: Script iniciado.");

    var currentQuestionIndex = 1;
    var totalPoints = 0;
    var totalQuestions = $(".qs").not(".result").length;

    console.log("Gauss_QUIZ: Total de " + totalQuestions + " perguntas encontradas.");

    $(".qs").hide();
    $(".quest1").show();
    $(".resultbtn").hide();

    // --- MANIPULADOR DE CLIQUE GERAL PARA AS OPÇÕES ---
    $(".qoptions li").on("click", function() {

        var $selectedOption = $(this);
        var $currentQuestion = $(".quest" + currentQuestionIndex);

        if ($currentQuestion.is(':animated')) {
            return;
        }

        var points = parseInt($selectedOption.attr("data-points")) || 0;
        totalPoints += points;
        console.log("Gauss_QUIZ: Pergunta " + currentQuestionIndex + " | Pontos ganhos: " + points + " | Total: " + totalPoints);

        $currentQuestion.find(".qcir").removeClass("active");
        $selectedOption.find(".qcir").addClass("active");

        setTimeout(function() {
            $currentQuestion.fadeOut(400, function() {

                currentQuestionIndex++;

                if (currentQuestionIndex <= totalQuestions) {
                    $(".quest" + currentQuestionIndex).fadeIn(400);
                    $(".quiznumber").html(currentQuestionIndex);
                    $(".quiznum li").removeClass("qactive");
                    $(".quiznum li:nth-child(" + currentQuestionIndex + ")").addClass("qactive");
                } else {
                    displayResults();
                }
            });
        }, 250);
    });

    /**
     * Função final para calcular e exibir os resultados do quiz.
     */
    function displayResults() {
        console.log("Gauss_QUIZ: Fim do quiz. Exibindo resultados com " + totalPoints + " pontos.");

        var headerText = "";

        // Define o texto principal com base na pontuação
        if (totalPoints > 4) { // Ajuste o valor 4 se necessário

            // ===================================================================
            // ALTERAÇÃO AQUI: Adicionado <span style='color: white;'> ao texto
            // ===================================================================
            headerText = "<span style='color: white;'>Oh! Aparentemente você tem fortes indícios de intoxicação com a proteína spike da </span><span style='color: red;'>VACINA</span>";

        } else {
            // Para pontuações mais baixas, também garantimos o texto branco.
            headerText = "<span style='color: white;'>Seu resultado indica um menor risco de efeitos colaterais da proteína spike.</span>";
        }

        $("#headertitle").html(headerText);

        var resultText3 = "De acordo com as respostas, possivelmente essa é a condição do seu cérebro atualmente...";

        var resultText4 = `
            <p><strong>Agora, as boas notícias</strong></p>
            <p>Isso significa que você está muito mais perto de iniciar um poderoso protocolo de <strong>DETOX</strong> — o mesmo que já tem ajudado inúmeras pessoas vacinadas a recuperarem sua saúde e bem-estar.</p>
            <p>Ao seguir esse protocolo simples, você fortalece sua imunidade e permite que seu corpo elimine naturalmente a proteína spike — um dos principais responsáveis por diversos efeitos colaterais.</p>
            <p>Com o detox completo, seu cérebro e seu corpo tendem a funcionar de forma mais equilibrada — como mostrado na imagem à direita — e você literalmente poderá retomar a vida com mais energia, clareza e vitalidade.</p>
            <p>Não é segredo que muitos poderosos querem manter isso longe da população. Afinal, quanto mais pessoas doentes, mais lucro para as grandes farmacêuticas, que alimentam um ciclo contínuo de dependência de remédios e vacinas.</p>
            <p><strong>Clique no botão abaixo para acessar a página com todas as instruções</strong> — entenda como a proteína spike age no corpo, como combatê-la e veja relatos reais de pessoas que já recuperaram sua saúde com o nosso protocolo de Detox.</p>
        `;

        $("#result_ponit3").html(resultText3);
        $("#result_ponit4").html(resultText4);

        $(".quiznum, .quiznummob").hide();

        $(".qs.result").fadeIn(800);
        $(".resultbtn").fadeIn(800);

        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
});