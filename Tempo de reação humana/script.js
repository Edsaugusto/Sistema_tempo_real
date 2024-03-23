const colors = ['red', 'green', 'blue', 'yellow'];
    const colorKeyMapping = {
        'red': 'KeyR',
        'green': 'KeyG',
        'blue': 'KeyB',
        'yellow': 'KeyY'
    };
    let score = 0;
    let hits = 0;
    let errors = 0;
    let startTime;
    let reactionTimes = [];

    function startGame() {
        document.querySelector('button').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        nextColor();
    }

    function nextColor() {
        const color = colors[Math.floor(Math.random() * colors.length)];
        document.getElementById('color-display').style.backgroundColor = color;
        startTime = Date.now(); // Inicia a contagem de tempo
    }

    window.addEventListener('keydown', function(event) {
        const color = document.getElementById('color-display').style.backgroundColor;
        if (event.code === colorKeyMapping[color]) {
            hits++;
            score = hits - errors;
            const endTime = Date.now(); // Termina a contagem de tempo
            const reactionTime = (endTime - startTime) / 1000; // Variável que calcula o tempo de reação em segundos
            reactionTimes.push(reactionTime); // aqui é onde armazenamos o tempo de reação
            displayReactionTime(reactionTime); // chamo a função que exibe o tempo de reação na tela
            if (hits + errors < 10) {
                nextColor();
            } else {
                endGame();
            }
        } else {
            errors++;
            score = hits - errors;
        }
        document.getElementById('score').textContent = `Score: ${score}`;
    });

    function displayReactionTime(time) {
        const reactionTimesContainer = document.getElementById('reaction-times');
        const reactionTimeElement = document.createElement('div');
        reactionTimeElement.textContent = `Tempo de reação: ${time.toFixed(2)} segundos`;
        reactionTimesContainer.appendChild(reactionTimeElement);
    }

    function endGame() {
        const totalReactionTime = reactionTimes.reduce((acc, curr) => acc + curr, 0);
        const averageReactionTime = totalReactionTime / reactionTimes.length;
        const finalReactionTime = reactionTimes[reactionTimes.length - 1];
        alert(`Tempo de reação médio: ${averageReactionTime.toFixed(2)} segundos\nTempo de reação final: ${finalReactionTime.toFixed(2)} segundos\nScore: ${score}`);
        resetGame();
    }

    function resetGame() {
        score = 0;
        hits = 0;
        errors = 0;
        reactionTimes = [];
        document.querySelector('button').style.display = 'block';
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('score').textContent = '';
        document.getElementById('reaction-times').textContent = '';
    }