// Elementos do DOM
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const message = document.getElementById("message");
const messageText = document.getElementById("message-text");
const closeMessage = document.getElementById("close-message");

// Variáveis do Timer
let timeLeft; // Tempo restante
let timerInterval;
let isPaused = true;
let isWorkTime = true; // Indica se é tempo de trabalho (true) ou descanso (false)
let messageTimeout; // Temporizador para fechar a mensagem automaticamente

// Elemento de áudio
const audio = new Audio("sound/som-temporizador.mp3"); // Arquivo de áudio curto

// Função para atualizar o display do timer
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Função para exibir a mensagem
function showMessage(text) {
  messageText.textContent = text;
  message.classList.remove("hidden");

  // Fecha a mensagem automaticamente após 10 segundos
  clearTimeout(messageTimeout); // Limpa o temporizador anterior (se houver)
  messageTimeout = setTimeout(hideMessage, 10000); // 10 segundos
}

// Função para ocultar a mensagem
function hideMessage() {
  message.classList.add("hidden");
}

// Função para tocar o som nos últimos 5 segundos
function checkLastSeconds() {
  if (timeLeft <= 5 && timeLeft > 0) {
    audio.currentTime = 0; // Reinicia o áudio para tocar do início
    audio.play(); // Toca o som
  }
}

// Função para iniciar o timer
function startTimer() {
  if (isPaused) {
    isPaused = false;
    startButton.classList.add("hidden"); // Oculta o botão "Iniciar"
    pauseButton.classList.remove("hidden"); // Mostra o botão "Pausar"
    stopButton.classList.remove("hidden"); // Mostra o botão "Parar"

    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
        checkLastSeconds(); // Verifica os últimos 5 segundos
      } else {
        clearInterval(timerInterval);
        toggleWorkRest(); // Alterna entre trabalho e descanso
      }
    }, 1000);
  }
}

// Função para alternar entre trabalho e descanso
function toggleWorkRest() {
  if (isWorkTime) {
    // Terminou o tempo de trabalho, inicia o descanso
    isWorkTime = false;
    timeLeft = 5 * 60; // 5 minutos de descanso
    showMessage("Tempo de trabalho concluído! Hora de descansar.");
  } else {
    // Terminou o tempo de descanso, inicia o trabalho
    isWorkTime = true;
    timeLeft = 25 * 60; // 25 minutos de trabalho
    showMessage("Tempo de descanso concluído! Hora de trabalhar.");
  }
  // Reinicia o timer automaticamente
  isPaused = true; // Reseta o estado de pausa
  startTimer(); // Inicia o próximo ciclo
}

// Função para pausar o timer
function pauseTimer() {
  clearInterval(timerInterval);
  isPaused = true;
  startButton.textContent = "Continuar"; // Altera o texto do botão "Iniciar"
  startButton.classList.remove("hidden"); // Mostra o botão "Iniciar"
  pauseButton.classList.add("hidden"); // Oculta o botão "Pausar"
}

// Função para parar o timer
function stopTimer() {
  clearInterval(timerInterval);
  isWorkTime = true; // Reinicia para o tempo de trabalho
  timeLeft = 25 * 60; // Reinicia o timer para 25 minutos
  updateTimer();
  isPaused = true;
  resetButtons(); // Volta ao estado inicial
}

// Função para resetar os botões ao estado inicial
function resetButtons() {
  startButton.textContent = "Iniciar"; // Restaura o texto do botão "Iniciar"
  startButton.classList.remove("hidden"); // Mostra o botão "Iniciar"
  pauseButton.classList.add("hidden"); // Oculta o botão "Pausar"
  stopButton.classList.add("hidden"); // Oculta o botão "Parar"
}

// Event listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
closeMessage.addEventListener("click", hideMessage);

// Inicializa o timer
timeLeft = 25 * 60; // Começa com 25 minutos de trabalho
updateTimer();







// Função para salvar o tempo estudado/trabalhado

function saveStudyTime(minutes) {
  const today = new Date().toLocaleDateString(); // Data atual
  const studyData = JSON.parse(localStorage.getItem('studyData')) || {};

  // Converte minutos para horas
  const hours = (studyData[today] || 0) + (minutes / 60);

  // Salva os dados no localStorage
  studyData[today] = hours;
  localStorage.setItem('studyData', JSON.stringify(studyData));
}
// Modifique a função toggleWorkRest para salvar o tempo estudado
function toggleWorkRest() {
  if (isWorkTime) {
    // Terminou o tempo de trabalho, inicia o descanso
    isWorkTime = false;
    timeLeft = 5 * 60; // 5 minutos de descanso
    showMessage('Tempo de trabalho concluído! Hora de descansar.');

    // Salva o tempo estudado (25 minutos)
    saveStudyTime(25);
  } else {
    // Terminou o tempo de descanso, inicia o trabalho
    isWorkTime = true;
    timeLeft = 25 * 60; // 25 minutos de trabalho
    showMessage('Tempo de descanso concluído! Hora de trabalhar.');
  }
  // Reinicia o timer automaticamente
  isPaused = true; // Reseta o estado de pausa
  startTimer(); // Inicia o próximo ciclo
}