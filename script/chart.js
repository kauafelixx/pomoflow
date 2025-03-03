function getStudyData() {
  const studyData = JSON.parse(localStorage.getItem('studyData')) || {};

  // Array com os nomes dos dias da semana
  const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const labels = [];
  const data = [];

  // Preenche os arrays com os dados dos últimos 7 dias
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toLocaleDateString();
    labels.push(daysOfWeek[date.getDay()]); // Usa o nome do dia da semana
    data.push(studyData[dateString] || 0); // Se não houver dados, usa 0
  }

  return { labels, data };
}

// Configuração do gráfico
const ctx = document.getElementById("studyChart").getContext("2d");
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(22, 62, 115, 1)");
gradient.addColorStop(1, "rgba(32, 66, 110, 0.2)");

const studyData = {
  labels: getStudyData().labels,
  datasets: [{
    label: "Tempo Estudado/Trabalhado (horas)",
    data: getStudyData().data,
    backgroundColor: gradient,
    borderColor: "#060E26",
    borderWidth: {
      top: 2,    // Borda no topo
      right: 2,  // Borda à direita
      left: 2,   // Borda à esquerda
      bottom: 0, // Sem borda na base
    },
    borderRadius: 0, // Sem bordas arredondadas
    borderSkipped: false, // Aplica bordas conforme configurado
    shadowOffsetX: 2, // Deslocamento horizontal da sombra
    shadowOffsetY: 2, // Deslocamento vertical da sombra
    shadowBlur: 5,    // Suavidade da sombra
    shadowColor: "rgba(0, 0, 0, 0.1)", // Cor da sombra
  }]
};

const chartConfig = {
  type: "bar",
  data: studyData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#060E26",
          font: {
            size: 14,
            weight: "bold"
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#060E26",
        },
        ticks: {
          color: "#060E26",
          font: {
            size: 12,
            weight: "bold"
          }
        },
        title: {
          display: true,
          text: "Horas",
          color: "#060E26",
          font: {
            size: 14,
            weight: "bold"
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#060E26",
          font: {
            size: 12,
            weight: "bold"
          }
        },
        title: {
          display: true,
          text: "Dias da Semana",
          color: "#060E26",
          font: {
            size: 14,
            weight: "bold"
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart"
    }
  }
};

// Cria o gráfico
const studyChart = new Chart(document.getElementById("studyChart"), chartConfig);

// Função para atualizar o gráfico
function updateChart() {
  const { labels, data } = getStudyData(); // Recupera os dados atualizados
  studyChart.data.labels = labels; // Atualiza os rótulos do gráfico
  studyChart.data.datasets[0].data = data; // Atualiza os dados do gráfico
  studyChart.update(); // Renderiza o gráfico novamente
}