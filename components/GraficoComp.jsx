import { Refresh, CompareArrows } from '@mui/icons-material';
import { 
  Box, 
  Button, 
  MenuItem, 
  Select, 
  CircularProgress, 
  Paper, 
  Typography, 
  Grid,
  FormControl,
  InputLabel,
  Alert
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';

import GraficoAvancado from './GraficoAvancado';

import { tokens } from '@/app/theme';
import { useObterComparacao } from '@/hooks/useTRPC';

const GraficoComp = () => {
  // Função para combinar dados de dois períodos
  const combinarDadosComparacao = (periodo1, periodo2) => {
    if (!periodo1 || !periodo2) return [];
    
    return [
      ...periodo1.map(serie => ({
        ...serie,
        id: `${serie.id} (Período 1)`
      })),
      ...periodo2.map(serie => ({
        ...serie,
        id: `${serie.id} (Período 2)`
      }))
    ];
  };

  const [periodo, setPeriodo] = useState(localStorage.getItem('periodoComp') || 'dia');
  const [data1, setData1] = useState(localStorage.getItem('data1') || 'hoje');
  const [data2, setData2] = useState(localStorage.getItem('data2') || 'ontem');

  const { data, isLoading: loading, error, refetch } = useObterComparacao(periodo, data1, data2);

  const handlePeriodo = event => {
    const newPeriodo = event.target.value;
    localStorage.setItem('periodoComp', newPeriodo);
    setPeriodo(newPeriodo);
  };

  const handleData1Change = newValue => {
    if (newValue) {
      const formattedDate = newValue.format('YYYY/MM/DD');
      localStorage.setItem('data1', formattedDate);
      setData1(formattedDate);
    }
  };

  const handleData2Change = newValue => {
    if (newValue) {
      const formattedDate = newValue.format('YYYY/MM/DD');
      localStorage.setItem('data2', formattedDate);
      setData2(formattedDate);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Controles de Filtro */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${tokens.primary[50]} 0%, ${tokens.primary[100]} 100%)`,
          border: `1px solid ${tokens.primary[200]}`
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CompareArrows sx={{ color: tokens.primary[600], mr: 2, fontSize: 24 }} />
          <Typography variant='h6' sx={{ fontWeight: 600, color: tokens.text.primary }}>
            Configurar Comparação
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Período</InputLabel>
              <Select
                value={periodo}
                label="Período"
                onChange={handlePeriodo}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: tokens.primary[300]
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: tokens.primary[400]
                  }
                }}
              >
                <MenuItem value={'dia'}>Dia</MenuItem>
                <MenuItem value={'semana'}>Semana</MenuItem>
                <MenuItem value={'mes'}>Mês</MenuItem>
                <MenuItem value={'ano'}>Ano</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant='contained'
              onClick={handleRefresh}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} /> : <Refresh />}
              sx={{
                background: tokens.primary[600],
                '&:hover': { background: tokens.primary[700] },
                height: 56,
                width: '100%'
              }}
            >
              {loading ? 'Atualizando...' : 'Atualizar'}
            </Button>
          </Grid>
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: 1, color: tokens.text.secondary, fontWeight: 500 }}>
                Período 1
              </Typography>
              <DatePicker 
                label='Data 1' 
                dateFormat='yyyy/MM/dd' 
                onChange={handleData1Change}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: tokens.primary[300]
                    },
                    '&:hover fieldset': {
                      borderColor: tokens.primary[400]
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2' sx={{ mb: 1, color: tokens.text.secondary, fontWeight: 500 }}>
                Período 2
              </Typography>
              <DatePicker
                label='Data 2'
                dateFormat='yyyy/MM/dd'
                onChange={handleData2Change}
                openTo='day'
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: tokens.secondary[300]
                    },
                    '&:hover fieldset': {
                      borderColor: tokens.secondary[400]
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Paper>

      {/* Área do Gráfico */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: `1px solid ${tokens.grey[200]}`,
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '400px',
              gap: 2
            }}
          >
            <CircularProgress size={60} sx={{ color: tokens.primary[600] }} />
            <Typography variant='h6' sx={{ color: tokens.text.secondary }}>
              Carregando dados comparativos...
            </Typography>
            <Typography variant='body2' sx={{ color: tokens.text.secondary, opacity: 0.7 }}>
              Aguarde enquanto buscamos os dados dos períodos selecionados
            </Typography>
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '400px',
              gap: 2
            }}
          >
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              Erro ao carregar dados comparativos: {error.message}
            </Alert>
            <Button
              variant='outlined'
              onClick={handleRefresh}
              startIcon={<Refresh />}
            >
              Tentar Novamente
            </Button>
          </Box>
        ) : !data?.data?.periodo1 || !data?.data?.periodo2 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '400px',
              gap: 2,
              textAlign: 'center'
            }}
          >
            <CompareArrows sx={{ fontSize: 64, color: tokens.grey[400], mb: 2 }} />
            <Typography variant='h6' sx={{ color: tokens.text.secondary }}>
              Nenhum dado para comparar
            </Typography>
            <Typography variant='body2' sx={{ color: tokens.text.secondary, opacity: 0.7 }}>
              Selecione as datas e períodos para visualizar a comparação
            </Typography>
          </Box>
        ) : (
          <Box sx={{ width: '100%', height: '500px' }}>
            <GraficoAvancado data={combinarDadosComparacao(data?.data?.periodo1, data?.data?.periodo2)} />
          </Box>
        )}
      </Paper>

      {/* Informações Adicionais */}
      {data?.data?.periodo1 && data?.data?.periodo2 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mt: 3,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${tokens.secondary[50]} 0%, ${tokens.secondary[100]} 100%)`,
            border: `1px solid ${tokens.secondary[200]}`
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, mb: 2, color: tokens.text.primary }}>
            Sobre a Comparação
          </Typography>
          <Typography variant='body2' sx={{ color: tokens.text.secondary, mb: 1 }}>
            • <strong>Período 1:</strong> Dados do período selecionado como referência
          </Typography>
          <Typography variant='body2' sx={{ color: tokens.text.secondary, mb: 1 }}>
            • <strong>Período 2:</strong> Dados do período para comparação
          </Typography>
          <Typography variant='body2' sx={{ color: tokens.text.secondary }}>
            • Use esta ferramenta para identificar padrões, variações e tendências entre diferentes períodos
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default GraficoComp;
