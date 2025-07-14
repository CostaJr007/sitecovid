/**
 * Quiz Script in Pure JavaScript (Vanilla JS)
 * Optimized for performance with no external dependencies.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selectors ---
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

    // --- Quiz State Variables ---
    let currentQuestionIndex = 0;
    let totalPoints = 0;

    // --- Initialization ---
    if (document.querySelector('.quiz-number-total')) {
        document.querySelector('.quiz-number-total').textContent = totalQuestions;
    }

    // --- Functions ---

    /**
     * Navigates to the next question or shows the results.
     */
    function goToNextQuestion() {
        // Hide the current question
        questions[currentQuestionIndex].classList.remove('active-question');

        currentQuestionIndex++;

        if (currentQuestionIndex < totalQuestions) {
            // Show the next question
            questions[currentQuestionIndex].classList.add('active-question');
            updateProgress();
        } else {
            displayResults();
        }
    }

    /**
     * Updates the progress indicators (mobile and desktop).
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
     * Displays the final results screen.
     */
    function displayResults() {
        progressIndicators.forEach(indicator => indicator.style.display = 'none');

        let headerHTML = "";
        // New max score = 3+2+2+2+2 = 11. Threshold adjusted to 6.
        if (totalPoints > 6) {
            headerHTML = `<span>Oh! It seems you have strong signs of intoxication from the </span><span class="text-danger">VACCINE's</span><span> spike protein</span>`;
        } else {
            headerHTML = `<span>Your result indicates a high risk of side effects from the spike protein.</span>`;
        }
        headerTitle.innerHTML = headerHTML;

        resultText3.innerHTML = "Based on your answers, this is possibly the current condition of your brain...";

        // ===================================================================
        // THE NEW COPY WAS INSERTED HERE
        // ===================================================================
        resultText4.innerHTML = `
            <p><strong>Now, the best part: there is a solution.</strong></p>
            <p>You are one step away from starting a simple and natural <strong>DETOX</strong> protocol, designed to combat the root cause of your symptoms: the spike protein.</p>
            <p>Imagine being able to:</p>
            <ul class="benefits-list">
                <li>✅ <strong>Eliminate</strong> brain fog and constant fatigue.</li>
                <li>✅ <strong>Restore</strong> your natural energy and vitality.</li>
                <li>✅ <strong>Strengthen</strong> your body against future problems.</li>
            </ul>
            <p>This is the solution that many powerful people don't want you to know about.</p>
            <p><strong>Click the button below to access the instructions, understand how the detox works, and start your recovery today.</strong></p>
        `;

        const resultScreen = document.querySelector('.qs.result');
        if (resultScreen) {
            resultScreen.classList.add('active-question');
        }

        if (resultButtonContainer) {
            resultButtonContainer.style.display = 'block';
        }

        // Scroll the screen to the top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- Adds the Click Event to all options ---
    options.forEach(option => {
        option.addEventListener('click', (event) => {
            // Prevents multiple clicks
            const parentUl = option.closest('.qoptions');
            if (parentUl.classList.contains('answered')) return;
            parentUl.classList.add('answered');

            // Adds the 'selected' class for visual feedback
            option.classList.add('selected');

            // Sums the points
            const points = parseInt(option.dataset.points) || 0;
            totalPoints += points;

            // Delay for the user to see the selection before moving on
            setTimeout(goToNextQuestion, 300);
        });
    });
});