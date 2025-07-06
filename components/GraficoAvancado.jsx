import { Box, Typography, Paper, Grid } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { tokens } from '@/app/theme';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GraficoAvancado = ({ data }) => {
  
  // Validar se os dados estão no formato correto
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
          color: tokens.text.secondary,
          gap: 2
        }}
      >
        <Typography variant='h6' sx={{ opacity: 0.7 }}>
          Nenhum dado disponível
        </Typography>
        <Typography variant='body2' sx={{ opacity: 0.5 }}>
          Aguarde a coleta de novos dados de medição
        </Typography>
      </Box>
    );
  }

  // Processar dados para Chart.js com múltiplos eixos Y
  const processarDadosChartJS = (dados) => {
    const nivelAgua = dados.find(serie => serie.id === 'Nível da Água');
    const temperatura = dados.find(serie => serie.id === 'Temperatura');
    const umidade = dados.find(serie => serie.id === 'Umidade');

    // Obter todos os timestamps únicos
    const timestamps = new Set();
    dados.forEach(serie => {
      serie.data.forEach(ponto => timestamps.add(ponto.x));
    });
    const labels = Array.from(timestamps).sort();

    const datasets = [];

    // Dataset para Nível da Água (eixo Y esquerdo)
    if (nivelAgua && nivelAgua.data.length > 0) {
      const nivelData = labels.map(label => {
        const ponto = nivelAgua.data.find(p => p.x === label);
        return ponto ? ponto.y : null;
      });

      datasets.push({
        label: 'Nível da Água (m)',
        data: nivelData,
        borderColor: tokens.primary[600],
        backgroundColor: `${tokens.primary[600]}20`,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: tokens.primary[600],
        pointBorderColor: tokens.background.paper,
        pointBorderWidth: 2,
        fill: false,
        tension: 0.4,
        yAxisID: 'y-nivel',
        order: 1
      });
    }

    // Dataset para Temperatura (eixo Y direito)
    if (temperatura && temperatura.data.length > 0) {
      const tempData = labels.map(label => {
        const ponto = temperatura.data.find(p => p.x === label);
        return ponto ? ponto.y : null;
      });

      datasets.push({
        label: 'Temperatura (°C)',
        data: tempData,
        borderColor: tokens.error[600],
        backgroundColor: `${tokens.error[600]}20`,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: tokens.error[600],
        pointBorderColor: tokens.background.paper,
        pointBorderWidth: 2,
        fill: false,
        tension: 0.4,
        yAxisID: 'y-temp',
        order: 2
      });
    }

    // Dataset para Umidade (eixo Y direito secundário)
    if (umidade && umidade.data.length > 0) {
      const umidData = labels.map(label => {
        const ponto = umidade.data.find(p => p.x === label);
        return ponto ? ponto.y : null;
      });

      datasets.push({
        label: 'Umidade (%)',
        data: umidData,
        borderColor: tokens.secondary[600],
        backgroundColor: `${tokens.secondary[600]}20`,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: tokens.secondary[600],
        pointBorderColor: tokens.background.paper,
        pointBorderWidth: 2,
        fill: false,
        tension: 0.4,
        yAxisID: 'y-umid',
        order: 3
      });
    }

    return { labels, datasets };
  };

  const chartData = processarDadosChartJS(data);
  
  // Calcular estatísticas para exibir no gráfico
  const calculateStats = () => {
    if (!data || data.length === 0) return null;
    
    const stats = {};
    
    data.forEach(serie => {
      const valores = serie.data.map(point => point.y).filter(y => y !== null && !isNaN(y));
      if (valores.length > 0) {
        stats[serie.id] = {
          max: Math.max(...valores),
          min: Math.min(...valores),
          avg: valores.reduce((sum, val) => sum + val, 0) / valores.length
        };
      }
    });
    
    return stats;
  };

  const stats = calculateStats();

  // Configuração do Chart.js
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '600'
          },
          color: tokens.text.primary
        }
      },
      tooltip: {
        backgroundColor: tokens.background.paper,
        titleColor: tokens.text.primary,
        bodyColor: tokens.text.primary,
        borderColor: tokens.grey[200],
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 12
        },
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (label.includes('Nível')) {
              return `${label}: ${value.toFixed(2)}m`;
            } else if (label.includes('Temperatura')) {
              return `${label}: ${value.toFixed(1)}°C`;
            } else if (label.includes('Umidade')) {
              return `${label}: ${value.toFixed(1)}%`;
            }
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Hora',
          font: {
            size: 14,
            weight: '600'
          },
          color: tokens.text.primary
        },
        grid: {
          color: tokens.grey[200],
          drawBorder: false
        },
        ticks: {
          color: tokens.text.secondary,
          font: {
            size: 11
          }
        }
      },
      'y-nivel': {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Nível da Água (metros)',
          font: {
            size: 12,
            weight: '600'
          },
          color: tokens.primary[600]
        },
        grid: {
          color: `${tokens.primary[600]}20`,
          drawBorder: false
        },
        ticks: {
          color: tokens.primary[600],
          font: {
            size: 11
          },
          callback: function(value) {
            return value.toFixed(2) + 'm';
          }
        }
      },
      'y-temp': {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Temperatura (°C)',
          font: {
            size: 12,
            weight: '600'
          },
          color: tokens.error[600]
        },
        grid: {
          drawOnChartArea: false,
          color: `${tokens.error[600]}20`
        },
        ticks: {
          color: tokens.error[600],
          font: {
            size: 11
          },
          callback: function(value) {
            return value.toFixed(1) + '°C';
          }
        }
      },
      'y-umid': {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Umidade (%)',
          font: {
            size: 12,
            weight: '600'
          },
          color: tokens.secondary[600]
        },
        grid: {
          drawOnChartArea: false,
          color: `${tokens.secondary[600]}20`
        },
        ticks: {
          color: tokens.secondary[600],
          font: {
            size: 11
          },
          callback: function(value) {
            return value.toFixed(1) + '%';
          }
        }
      }
    }
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      {/* Estatísticas Rápidas */}
      {stats && Object.keys(stats).length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            {Object.entries(stats).map(([tipo, valores]) => (
              <Grid item xs={12} sm={6} md={4} key={tipo}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    textAlign: 'center',
                    background: tipo === 'Nível da Água' 
                      ? `linear-gradient(135deg, ${tokens.primary[50]} 0%, ${tokens.primary[100]} 100%)`
                      : tipo === 'Temperatura'
                      ? `linear-gradient(135deg, ${tokens.error[50]} 0%, ${tokens.error[100]} 100%)`
                      : `linear-gradient(135deg, ${tokens.secondary[50]} 0%, ${tokens.secondary[100]} 100%)`,
                    border: tipo === 'Nível da Água' 
                      ? `1px solid ${tokens.primary[200]}`
                      : tipo === 'Temperatura'
                      ? `1px solid ${tokens.error[200]}`
                      : `1px solid ${tokens.secondary[200]}`
                  }}
                >
                  <Typography variant='caption' sx={{ color: tokens.text.secondary, display: 'block', mb: 0.5 }}>
                    {tipo.toUpperCase()}
                  </Typography>
                  <Typography variant='h6' sx={{ 
                    fontWeight: 700, 
                    color: tipo === 'Nível da Água' 
                      ? tokens.primary[700]
                      : tipo === 'Temperatura'
                      ? tokens.error[700]
                      : tokens.secondary[700]
                  }}>
                    {tipo === 'Nível da Água' 
                      ? `${valores.avg.toFixed(2)}m`
                      : tipo === 'Temperatura'
                      ? `${valores.avg.toFixed(1)}°C`
                      : `${valores.avg.toFixed(1)}%`
                    }
                  </Typography>
                  <Typography variant='body2' sx={{ color: tokens.text.secondary, fontSize: '0.75rem' }}>
                    Max: {tipo === 'Nível da Água' 
                      ? `${valores.max.toFixed(2)}m`
                      : tipo === 'Temperatura'
                      ? `${valores.max.toFixed(1)}°C`
                      : `${valores.max.toFixed(1)}%`
                    } | Min: {tipo === 'Nível da Água' 
                      ? `${valores.min.toFixed(2)}m`
                      : tipo === 'Temperatura'
                      ? `${valores.min.toFixed(1)}°C`
                      : `${valores.min.toFixed(1)}%`
                    }
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Gráfico Principal */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: `1px solid ${tokens.grey[200]}`,
          height: '450px'
        }}
      >
        <Line data={chartData} options={options} />
      </Paper>
    </Box>
  );
};

export default GraficoAvancado; 