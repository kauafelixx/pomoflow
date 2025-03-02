// Elementos do DOM
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const message = document.getElementById("message");
const messageText = document.getElementById("message-text");
const closeMessage = document.getElementById("close-message");

// Variáveis do Timer
let timeLeft = 25 * 60; // 25 minutos de trabalho
let timerInterval;
let isPaused = true;
let isWorkTime = true; // Indica se é tempo de trabalho (true) ou descanso (false)

// Função para atualizar o display do timer
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Função para salvar o tempo estudado
function saveStudyTime(minutes) {
  const today = new Date().toLocaleDateString(); // Data atual
  const studyData = JSON.parse(localStorage.getItem("studyData")) || {};

  // Converte minutos para horas
  const hours = (studyData[today] || 0) + (minutes / 60);

  // Salva os dados no localStorage
  studyData[today] = hours;
  localStorage.setItem("studyData", JSON.stringify(studyData));

  // Atualiza o gráfico (se estiver na página certa)
  if (typeof updateChart === "function") {
    updateChart();
  }
}

// Função para alternar entre trabalho e descanso
function toggleWorkRest() {
  if (isWorkTime) {
    // Terminou o tempo de trabalho, inicia o descanso
    isWorkTime = false;
    timeLeft = 5 * 60; // 5 minutos de descanso
    showMessage("Tempo de trabalho concluído! Hora de descansar.");
    saveStudyTime(25); // Salva 25 minutos de trabalho
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

// Função para iniciar o timer
function startTimer() {
  if (isPaused) {
    isPaused = false;
    startButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");
    stopButton.classList.remove("hidden");

    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        toggleWorkRest(); // Alterna entre trabalho e descanso
      }
    }, 1000);
  }
}

// Função para pausar o timer
function pauseTimer() {
  clearInterval(timerInterval);
  isPaused = true;
  startButton.textContent = "Continuar";
  startButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
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
  startButton.textContent = "Iniciar";
  startButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
  stopButton.classList.add("hidden");
}

// Event listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
closeMessage.addEventListener("click", () => message.classList.add("hidden"));

// Inicializa o timer
updateTimer();