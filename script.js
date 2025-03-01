const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');

let timeLeft = 25 * 60; // 25 minutos em segundos
let timerInterval;
let isPaused = true;

// Função para atualizar o display do timer
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Função para iniciar o timer
function startTimer() {
  if (isPaused) {
    isPaused = false;
    startButton.classList.add('hidden'); // Oculta o botão "Iniciar"
    pauseButton.classList.remove('hidden'); // Mostra o botão "Pausar"
    stopButton.classList.remove('hidden'); // Mostra o botão "Parar"

    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        alert('Tempo esgotado! Hora de uma pausa.');
        resetButtons(); // Volta ao estado inicial após o tempo acabar
      }
    }, 1000);
  }
}

// Função para pausar o timer
function pauseTimer() {
  clearInterval(timerInterval);
  isPaused = true;
  startButton.textContent = 'Continuar'; // Altera o texto do botão "Iniciar"
  startButton.classList.remove('hidden'); // Mostra o botão "Iniciar"
  pauseButton.classList.add('hidden'); // Oculta o botão "Pausar"
}

// Função para parar o timer
function stopTimer() {
  clearInterval(timerInterval);
  timeLeft = 25 * 60;
  updateTimer();
  isPaused = true;
  resetButtons(); // Volta ao estado inicial
}

// Função para resetar os botões ao estado inicial
function resetButtons() {
  startButton.textContent = 'Iniciar'; // Restaura o texto do botão "Iniciar"
  startButton.classList.remove('hidden'); // Mostra o botão "Iniciar"
  pauseButton.classList.add('hidden'); // Oculta o botão "Pausar"
  stopButton.classList.add('hidden'); // Oculta o botão "Parar"
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);

// Inicializa o timer
updateTimer();