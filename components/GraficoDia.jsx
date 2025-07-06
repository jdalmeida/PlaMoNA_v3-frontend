import { ArrowLeftOutlined, ArrowRightOutlined, CalendarToday, Timeline } from '@mui/icons-material';
import { 
  Box, 
  CircularProgress, 
  Paper, 
  Typography, 
  Grid,
  IconButton,
  Chip
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import GraficoAvancado from './GraficoAvancado';

import { tokens } from '@/app/theme';
import { useObterDia } from '@/hooks/useTRPC';

const GraficoDia = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const { data, isLoading: loading, error } = useObterDia('diaEsp', selectedDate.format('YYYY/MM/DD'));

  const navigateDate = (direction) => {
    const newDate = direction === 'next' 
      ? selectedDate.add(1, 'day')
      : selectedDate.subtract(1, 'day');
    setSelectedDate(newDate);
  };

  const handleDateChange = (newValue) => {
    if (newValue) {
      setSelectedDate(newValue);
    }
  };

  const formatDate = (date) => {
    return date.format('DD/MM/YYYY');
  };

  const getDayOfWeek = (date) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[date.day()];
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Controles de Navegação */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${tokens.warning[50]} 0%, ${tokens.warning[100]} 100%)`,
          border: `1px solid ${tokens.warning[200]}`
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Timeline sx={{ color: tokens.warning[600], mr: 2, fontSize: 24 }} />
          <Typography variant='h6' sx={{ fontWeight: 600, color: tokens.text.primary }}>
            Navegação Temporal
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={() => navigateDate('prev')}
                disabled={loading}
                sx={{
                  backgroundColor: tokens.background.paper,
                  border: `1px solid ${tokens.grey[300]}`,
                  '&:hover': {
                    backgroundColor: tokens.grey[100]
                  }
                }}
              >
                <ArrowLeftOutlined />
              </IconButton>
              
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant='h6' sx={{ fontWeight: 600, color: tokens.text.primary }}>
                  {formatDate(selectedDate)}
                </Typography>
                <Typography variant='body2' sx={{ color: tokens.text.secondary }}>
                  {getDayOfWeek(selectedDate)}
                </Typography>
              </Box>
              
              <IconButton
                onClick={() => navigateDate('next')}
                disabled={loading}
                sx={{
                  backgroundColor: tokens.background.paper,
                  border: `1px solid ${tokens.grey[300]}`,
                  '&:hover': {
                    backgroundColor: tokens.grey[100]
                  }
                }}
              >
                <ArrowRightOutlined />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Selecionar Data"
                value={selectedDate}
                onChange={handleDateChange}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: tokens.warning[300]
                    },
                    '&:hover fieldset': {
                      borderColor: tokens.warning[400]
                    }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<CalendarToday />}
                label="Hoje"
                onClick={() => setSelectedDate(dayjs())}
                sx={{
                  backgroundColor: selectedDate.isSame(dayjs(), 'day') 
                    ? tokens.primary[600] 
                    : tokens.grey[200],
                  color: selectedDate.isSame(dayjs(), 'day') 
                    ? 'white' 
                    : tokens.text.primary,
                  '&:hover': {
                    backgroundColor: selectedDate.isSame(dayjs(), 'day') 
                      ? tokens.primary[700] 
                      : tokens.grey[300]
                  }
                }}
              />
              <Chip
                label="Ontem"
                onClick={() => setSelectedDate(dayjs().subtract(1, 'day'))}
                sx={{
                  backgroundColor: selectedDate.isSame(dayjs().subtract(1, 'day'), 'day') 
                    ? tokens.secondary[600] 
                    : tokens.grey[200],
                  color: selectedDate.isSame(dayjs().subtract(1, 'day'), 'day') 
                    ? 'white' 
                    : tokens.text.primary,
                  '&:hover': {
                    backgroundColor: selectedDate.isSame(dayjs().subtract(1, 'day'), 'day') 
                      ? tokens.secondary[700] 
                      : tokens.grey[300]
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
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
            <CircularProgress size={60} sx={{ color: tokens.warning[600] }} />
            <Typography variant='h6' sx={{ color: tokens.text.secondary }}>
              Carregando dados do dia...
            </Typography>
            <Typography variant='body2' sx={{ color: tokens.text.secondary, opacity: 0.7 }}>
              Buscando medições de {formatDate(selectedDate)}
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
              gap: 2,
              textAlign: 'center'
            }}
          >
            <Typography variant='h6' sx={{ color: tokens.error[600] }}>
              Erro ao carregar dados
            </Typography>
            <Typography variant='body2' sx={{ color: tokens.text.secondary, opacity: 0.7 }}>
              {error.message}
            </Typography>
          </Box>
        ) : !data?.data || data.data.length === 0 ? (
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
            <Timeline sx={{ fontSize: 64, color: tokens.grey[400], mb: 2 }} />
            <Typography variant='h6' sx={{ color: tokens.text.secondary }}>
              Nenhum dado disponível
            </Typography>
            <Typography variant='body2' sx={{ color: tokens.text.secondary, opacity: 0.7 }}>
              Não há medições registradas para {formatDate(selectedDate)}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ width: '100%', height: '500px' }}>
            <GraficoAvancado data={data?.data || []} />
          </Box>
        )}
      </Paper>

      {/* Informações Adicionais */}
      {data?.data && data.data.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mt: 3,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${tokens.primary[50]} 0%, ${tokens.primary[100]} 100%)`,
            border: `1px solid ${tokens.primary[200]}`
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, mb: 2, color: tokens.text.primary }}>
            Dados do Dia {formatDate(selectedDate)}
          </Typography>
          <Typography variant='body2' sx={{ color: tokens.text.secondary, mb: 1 }}>
            • Visualize medições detalhadas de um dia específico
          </Typography>
          <Typography variant='body2' sx={{ color: tokens.text.secondary, mb: 1 }}>
            • Use as setas ou o seletor de data para navegar entre os dias
          </Typography>
          <Typography variant='body2' sx={{ color: tokens.text.secondary }}>
            • Clique nos botões &quot;Hoje&quot; ou &quot;Ontem&quot; para navegação rápida
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default GraficoDia;
