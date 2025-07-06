import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { Box, Button, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';

import Grafico from './Grafico';

import { obterDia } from '@/api/database';
import { useNotification } from '@/hooks/useNotification';

const fetchData = async (dia1, setData, setLoading, showError) => {
  try {
    setLoading(true);
    const res = await obterDia('diaEsp', dia1);
    setData(res);
  } catch (error) {
    showError('Erro ao carregar dados do gráfico');
    setData([]);
  } finally {
    setLoading(false);
  }
};

const GraficoDia = () => {
  const [dia1, setDia1] = useState(new Date().toISOString().substring(0, 10));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showError } = useNotification();

  useEffect(() => {
    setData([]);
    fetchData(dia1, setData, setLoading, showError);
  }, [dia1, showError]);

  const aumentarDia1 = () => {
    const dataAtual = new Date(dia1);
    dataAtual.setDate(dataAtual.getDate() + 1);
    setDia1(dataAtual.toISOString().substring(0, 10));
  };

  const diminuirDia1 = () => {
    const dataAtual = new Date(dia1);
    dataAtual.setDate(dataAtual.getDate() - 1);
    setDia1(dataAtual.toISOString().substring(0, 10));
  };

  return (
    <Box m='20px'>
      <Box
        sx={{
          display: 'flex',
          gap: '1em',
          flexDirection: 'column',
          padding: '0.5em 5em'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Button
            variant='outlined'
            sx={{ height: '5em' }}
            onClick={diminuirDia1}
            disabled={loading}
          >
            <ArrowLeftOutlined />
          </Button>

          <Box
            sx={{
              overflowX: 'scroll',
              overflowY: 'hidden',
              position: 'relative'
            }}
          >
            <Box height='30em' width='80em'>
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
          <Button
            variant='outlined'
            sx={{ height: '5em' }}
            onClick={aumentarDia1}
            disabled={loading}
          >
            <ArrowRightOutlined />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GraficoDia;
