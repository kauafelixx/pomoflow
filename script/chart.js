// Função para recuperar os dados de tempo estudado/trabalhado
function getStudyData() {
    // Dados fictícios para teste
    const labels = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const data = [6, 10, 14, 6, 20, 30, 2]; // Tempo em horas (valores fictícios)
  
    return { labels, data };
  }
  
  // Dados do gráfico
  const { labels, data } = getStudyData();
  
  // Cria um gradiente para as barras
  const ctx = document.getElementById('studyChart').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(22, 62, 115, 1)'); // Cor inicial
  gradient.addColorStop(1, 'rgba(22, 62, 115, 0.2)'); // Cor final
  
  const studyData = {
    labels,
    datasets: [{
      label: 'Tempo Estudado/Trabalhado (horas)',
      data,
      backgroundColor: gradient,
      borderColor: 'rgba(22, 62, 115, 1)',
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
      shadowColor: 'rgba(0, 0, 0, 0.85)', // Cor da sombra
    }]
  };
  
  // Configurações do gráfico
  const chartConfig = {
    type: 'bar', // Tipo de gráfico (barras)
    data: studyData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#060E26', // Cor da legenda
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true, // Começa o eixo Y do zero
          grid: {
            color: 'rgba(0, 0, 0, 0.1)', // Cor das linhas de grade
          },
          ticks: {
            color: '#060E26', // Cor dos números do eixo Y
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          title: {
            display: true,
            text: 'Horas',
            color: '#060E26', // Cor do título do eixo Y
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        x: {
          grid: {
            display: false, // Remove as linhas de grade do eixo X
          },
          ticks: {
            color: '#060E26', // Cor dos rótulos do eixo X
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          title: {
            display: true,
            text: 'Dias da Semana',
            color: '#060E26', // Cor do título do eixo X
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      },
      animation: {
        duration: 1000, // Duração da animação em milissegundos
        easing: 'easeInOutQuart' // Tipo de animação
      }
    }
  };
  
  // Cria o gráfico
  const studyChart = new Chart(document.getElementById('studyChart'), chartConfig);
  
  // Função para atualizar o gráfico
  function updateChart() {
    const { labels, data } = getStudyData(); // Recupera os dados atualizados
    studyChart.data.datasets[0].data = data; // Atualiza os dados do gráfico
    studyChart.update(); // Renderiza o gráfico novamente
  }