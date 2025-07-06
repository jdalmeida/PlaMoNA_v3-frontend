import { Box, Typography, Paper, Grid } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';

import { tokens } from '@/app/theme';

const GraficoMonitoramento = ({ data }) => {
  
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

  // Separar dados por tipo e configurar eixos Y diferentes
  const processarDadosMultiEixo = (dados) => {
    const nivelAgua = dados.find(serie => serie.id === 'Nível da Água');
    const temperatura = dados.find(serie => serie.id === 'Temperatura');
    const umidade = dados.find(serie => serie.id === 'Umidade');

    const series = [];

    // Configurar Nível da Água (eixo Y esquerdo)
    if (nivelAgua && nivelAgua.data.length > 0) {
      series.push({
        ...nivelAgua,
        yAxis: 'left',
        color: tokens.primary[600],
        lineWidth: 3,
        pointSize: 8
      });
    }

    // Configurar Temperatura (eixo Y direito)
    if (temperatura && temperatura.data.length > 0) {
      series.push({
        ...temperatura,
        yAxis: 'right',
        color: tokens.error[600],
        lineWidth: 2,
        pointSize: 6
      });
    }

    // Configurar Umidade (eixo Y direito secundário)
    if (umidade && umidade.data.length > 0) {
      series.push({
        ...umidade,
        yAxis: 'right2',
        color: tokens.secondary[600],
        lineWidth: 2,
        pointSize: 6
      });
    }

    return series;
  };

  const seriesProcessadas = processarDadosMultiEixo(data);
  
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
        <ResponsiveLine
          data={seriesProcessadas}
          theme={{
            text: {
              fontSize: 12,
              fill: tokens.text.primary,
              outlineWidth: 0,
              outlineColor: 'transparent'
            },
            axis: {
              domain: {
                line: {
                  stroke: tokens.grey[300],
                  strokeWidth: 1
                }
              },
              legend: {
                text: {
                  fontSize: 14,
                  fill: tokens.text.primary,
                  fontWeight: 600,
                  outlineWidth: 0,
                  outlineColor: 'transparent'
                }
              },
              ticks: {
                line: {
                  stroke: tokens.grey[300],
                  strokeWidth: 1
                },
                text: {
                  fontSize: 11,
                  fill: tokens.text.secondary,
                  outlineWidth: 0,
                  outlineColor: 'transparent'
                }
              }
            },
            grid: {
              line: {
                stroke: tokens.grey[200],
                strokeWidth: 1,
                strokeDasharray: '4 4'
              }
            },
            legends: {
              title: {
                text: {
                  fontSize: 12,
                  fill: tokens.text.primary,
                  fontWeight: 600,
                  outlineWidth: 0,
                  outlineColor: 'transparent'
                }
              },
              text: {
                fontSize: 11,
                fill: tokens.text.secondary,
                outlineWidth: 0,
                outlineColor: 'transparent'
              },
              ticks: {
                line: {},
                text: {
                  fontSize: 10,
                  fill: tokens.text.secondary,
                  outlineWidth: 0,
                  outlineColor: 'transparent'
                }
              }
            },
            annotations: {
              text: {
                fontSize: 13,
                fill: tokens.text.primary,
                outlineWidth: 2,
                outlineColor: tokens.background.paper,
                outlineOpacity: 1
              },
              link: {
                stroke: tokens.primary[600],
                strokeWidth: 2,
                outlineWidth: 2,
                outlineColor: tokens.background.paper,
                outlineOpacity: 1
              },
              outline: {
                stroke: tokens.primary[600],
                strokeWidth: 2,
                outlineWidth: 2,
                outlineColor: tokens.background.paper,
                outlineOpacity: 1
              },
              symbol: {
                fill: tokens.primary[600],
                outlineWidth: 2,
                outlineColor: tokens.background.paper,
                outlineOpacity: 1
              }
            },
            tooltip: {
              container: {
                background: tokens.background.paper,
                fontSize: 12,
                borderRadius: 8,
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                border: `1px solid ${tokens.grey[200]}`,
                color: tokens.text.primary,
                padding: '12px'
              },
              basic: {},
              chip: {},
              table: {},
              tableCell: {},
              tableCellValue: {}
            }
          }}
          margin={{
            top: 50,
            right: 80,
            bottom: 60,
            left: 60
          }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false
          }}
          yFormat=' >-.2f'
          curve='monotoneX'
          axisTop={null}
          axisBottom={{
            tickValues: 7,
            tickSize: 5,
            tickPadding: 8,
            tickRotation: 0,
            legend: 'HORA',
            legendOffset: 40,
            legendPosition: 'middle',
            legendStyle: {
              fontSize: 14,
              fontWeight: 600
            }
          }}
          axisLeft={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 8,
            tickRotation: 0,
            format: '.2s',
            legend: 'NÍVEL (metros)',
            legendOffset: -50,
            legendPosition: 'middle',
            legendStyle: {
              fontSize: 14,
              fontWeight: 600
            }
          }}
          axisRight={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 8,
            tickRotation: 0,
            format: '.0f',
            legend: 'TEMP (°C) / UMID (%)',
            legendOffset: 50,
            legendPosition: 'middle',
            legendStyle: {
              fontSize: 14,
              fontWeight: 600
            }
          }}
          enableGridX={true}
          enableGridY={true}
          colors={seriesProcessadas.map(serie => serie.color)}
          borderColor={{ from: 'color' }}
          lineWidth={seriesProcessadas.map(serie => serie.lineWidth)}
          pointSize={seriesProcessadas.map(serie => serie.pointSize)}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={3}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          gridXValues={7}
          gridYValues={7}
          enableSlices="x"
          enableArea={false}
          enablePoints={true}
          enablePointLabel={false}
          pointLabel="y"
          pointLabelFormat=".2f"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          sliceTooltip={({ slice }) => (
            <Box
              sx={{
                background: tokens.background.paper,
                p: 3,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                border: `1px solid ${tokens.grey[200]}`,
                minWidth: '200px'
              }}
            >
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 2, color: tokens.primary[600] }}>
                {slice.points[0]?.data?.x}
              </Typography>
              {slice.points.map((point) => (
                <Box key={point.id} sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  mb: 1.5,
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: `${point.color}10`
                }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: point.color,
                      border: `2px solid ${tokens.background.paper}`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant='body2' sx={{ 
                      color: tokens.text.secondary,
                      textTransform: 'capitalize',
                      fontWeight: 500
                    }}>
                      {point.serieId}
                    </Typography>
                    <Typography variant='h6' sx={{ 
                      fontWeight: 700,
                      color: tokens.text.primary
                    }}>
                      {point.serieId === 'Nível da Água' 
                        ? `${point.data.yFormatted} metros`
                        : point.serieId === 'Temperatura'
                        ? `${point.data.yFormatted}°C`
                        : `${point.data.yFormatted}%`
                      }
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          legends={[
            {
              anchor: 'top-left',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: -40,
              itemsSpacing: 8,
              itemDirection: 'left-to-right',
              itemWidth: 140,
              itemHeight: 24,
              itemOpacity: 0.85,
              symbolSize: 16,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                    symbolSize: 18
                  }
                }
              ]
            }
          ]}
        />
      </Paper>
    </Box>
  );
};

export default GraficoMonitoramento; 