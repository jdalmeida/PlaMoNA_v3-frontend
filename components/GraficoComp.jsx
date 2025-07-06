import { Refresh } from '@mui/icons-material';
import { Box, Button, MenuItem, Select, CircularProgress } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState, useEffect } from 'react';

import Grafico from './Grafico';

import { obterComparacao } from '@/api/database';
import { useNotification } from '@/hooks/useNotification';

export default function GraficoComp () {
  const [periodo, setPeriodo] = useState(localStorage.getItem('periodoComp') || 'dia');
  const [dia1, setDia1] = useState(new Date().toISOString().substring(0, 10));
  const [dia2, setDia2] = useState(new Date().toISOString().substring(0, 10));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showError } = useNotification();

  const fetchData = async () => {
    try {
      setLoading(true);
      setData([]);

      const result = await obterComparacao(
        periodo,
        localStorage.getItem('data1'),
        localStorage.getItem('data2')
      );
      setData(result);
    } catch (error) {
      showError('Erro ao carregar dados de comparação');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [periodo]);

  const handlePeriodo = event => {
    const newPeriodo = event.target.value;
    localStorage.setItem('periodoComp', newPeriodo);
    setPeriodo(newPeriodo);
  };

  const handleData1Change = newValue => {
    if (newValue) {
      const formattedDate = newValue.format('YYYY/MM/DD');
      localStorage.setItem('data1', formattedDate);
    }
  };

  const handleData2Change = newValue => {
    if (newValue) {
      const formattedDate = newValue.format('YYYY/MM/DD');
      localStorage.setItem('data2', formattedDate);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <Box m='20px'>
      <Box
        sx={{
          display: 'flex',
          gap: '1em',
          flexDirection: 'column',
          p: { sx: '0.5em', sm: '0.5em 5em' },
          width: { sx: '16.5em', sm: '100%' }
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Select
            variant='outlined'
            value={periodo}
            label='Período'
            onChange={handlePeriodo}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value={'dia'}>Dia</MenuItem>
            <MenuItem value={'semana'}>Semana</MenuItem>
            <MenuItem value={'mes'}>Mês</MenuItem>
            <MenuItem value={'ano'}>Ano</MenuItem>
          </Select>

          <Button
            variant='outlined'
            onClick={handleRefresh}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <Refresh />}
          >
            Atualizar
          </Button>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <DatePicker label='Data 1' dateFormat='yyyy/MM/dd' onChange={handleData1Change} />
            <DatePicker
              label='Data 2'
              dateFormat='yyyy/MM/dd'
              onChange={handleData2Change}
              openTo='day'
            />
          </Box>
        </LocalizationProvider>
      </Box>

      <Box
        justifyContent={'center'}
        sx={{
          overflowX: 'scroll',
          overflowY: 'hidden'
        }}
      >
        <Box height='30em' width='70em' display={'flex'} justifyContent={'center'}>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grafico data={data} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
