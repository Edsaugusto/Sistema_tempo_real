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
let displayDuration = 2000; // Tempo inicial de exibição da cor em milissegundos
let colorCount = 0; // Contador de cores exibidas

function startGame() {
    document.querySelector('button').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    nextColor();
}

function nextColor() {
    if (colorCount >= 10) {
        endGame(); // Termina o jogo após exibir 10 cores
        return;
    }

    const color = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('color-display').style.backgroundColor = color;
    startTime = Date.now(); // Inicia a contagem de tempo para a cor atual
    colorCount++; // Incrementa o contador de cores exibidas

    setTimeout(() => {
        // Remove a cor após o tempo de exibição
        document.getElementById('color-display').style.backgroundColor = '';
        setTimeout(nextColor, 500); // Aguarda um curto período e exibe a próxima cor
    }, displayDuration);
}

window.addEventListener('keydown', function(event) {
    const color = document.getElementById('color-display').style.backgroundColor;
    const correctKey = colorKeyMapping[color];
    
    if (event.code === correctKey) {
        hits++;
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
        // Remove a cor imediatamente após o usuário pressionar a tecla correta
        document.getElementById('color-display').style.backgroundColor = '';
        // Diminui o tempo de exibição da próxima cor
        displayDuration -= 200; // Reduz o tempo de exibição em 200 milissegundos

        // Calcula e armazena o tempo de reação
        const endTime = Date.now();
        const reactionTime = (endTime - startTime) / 1000;
        reactionTimes.push(reactionTime);
        displayReactionTimes(reactionTime);
    } else {
        errors++;
        score--;
        document.getElementById('score').textContent = `Score: ${score}`;
    }
});

function displayReactionTimes(time) {
    const reactionTimesContainer = document.getElementById('reaction-times');
    reactionTimesContainer.innerHTML = ''; // Limpa os tempos de reação anteriores
    reactionTimes.forEach(time => {
        const reactionTimeElement = document.createElement('div');
        reactionTimeElement.textContent = `Tempo de reação: ${time.toFixed(2)} segundos`;
        reactionTimesContainer.appendChild(reactionTimeElement);
    });
}

function endGame() {
    const totalReactionTime = reactionTimes.reduce((acc, curr) => acc + curr, 0);
    const averageReactionTime = reactionTimes.length > 0 ? totalReactionTime / reactionTimes.length : 0;
    const finalReactionTime = reactionTimes.length > 0 ? reactionTimes[reactionTimes.length - 1] : 0;
    alert(`Tempo de reação médio: ${averageReactionTime.toFixed(2)} segundos\nTempo de reação final: ${finalReactionTime.toFixed(2)} segundos\nScore: ${score}`);
    resetGame();
}

function resetGame() {
    score = 0;
    hits = 0;
    errors = 0;
    reactionTimes = [];
    displayDuration = 2000; // Reinicia o tempo de exibição para o valor inicial
    colorCount = 0; // Reinicia o contador de cores exibidas
    document.querySelector('button').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('score').textContent = '';
    document.getElementById('reaction-times').textContent = '';
}
