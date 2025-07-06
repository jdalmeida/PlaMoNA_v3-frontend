import { Box, Button, Input, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useState } from 'react';

import { atualizaConfSensor, pesquisaSensores } from '@/api/user';
import { tokens } from '@/app/theme';
import { useNotification } from '@/hooks/useNotification';

export default function FormConfiguracaoSensor () {
  const sensores = [
    { label: 'Sensor do Grão Para', codigo: 1 },
    { label: 'Sensor de Olavo Bilack', codigo: 2 }
  ];

  const [value, setValue] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');
  const [codValue, setCodValue] = React.useState(0);
  const [descricao, setDescricao] = useState('');
  const [nvlMin, setNvlMin] = useState(0);
  const [nvlMax, setNvlMax] = useState(0);
  const [envMin, setEnvMin] = useState(false);
  const [envMax, setEnvMax] = useState(false);
  const [msgMin, setMsgMin] = useState('');
  const [msgMax, setMsgMax] = useState('');
  const [sensorBanco, setSensorBanco] = useState([]);
  const [sensor, setSensor] = useState(0);
  const [configurando, setConfigurando] = useState(false);
  const [pesquisando, setPesquisando] = useState(false);
  const { showSuccess, showError, showWarning } = useNotification();

  async function fetchData () {
    try {
      const resultado = await atualizaConfSensor(
        codValue,
        descricao,
        nvlMin,
        nvlMax,
        envMin,
        envMax,
        msgMin,
        msgMax
      );
      showSuccess(resultado);
    } catch (error) {
      showError(error.message);
    } finally {
      setConfigurando(false);
    }
  }

  async function fetchDataPesquisa () {
    try {
      const resultado = await pesquisaSensores(codValue);
      setSensorBanco(resultado);
      showSuccess('Sensor encontrado com sucesso!');
    } catch (error) {
      showError(error.message);
    } finally {
      setPesquisando(false);
    }
  }

  const efetuarPesquisa = () => {
    if (codValue === 0) {
      showWarning('Por favor, selecione um sensor');
      return;
    }
    setPesquisando(true);
    fetchDataPesquisa();
  };

  const efetuarConfigurar = () => {
    if (codValue === 0) {
      showWarning('Por favor, selecione um sensor');
      return;
    }
    if (descricao === '' || msgMin === '' || msgMax === '') {
      showWarning('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    setConfigurando(true);
    fetchData();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: { sm: '35em', xs: '20em' },
            height: 'auto',
            padding: '.5em',
            margin: '1em',
            backgroundColor: tokens.primary[600] + '88',
            borderRadius: '2em'
          }}
        >
          <Box
            sx={{
              padding: '.5em',
              margin: '1em',
              borderRadius: '2em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                setCodValue(newValue ? newValue.codigo : 0);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id='controllable-states-demo'
              options={sensores}
              sx={{ width: 300 }}
              renderInput={params => <TextField {...params} label='Selecione o Sensor' />}
            />
          </Box>

          <Box
            sx={{
              padding: '.5em',
              margin: '1em',
              borderRadius: '2em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <Button variant='contained' onClick={efetuarPesquisa} disabled={pesquisando}>
              {pesquisando ? <CircularProgress size={20} /> : 'Pesquisar Sensor'}
            </Button>
          </Box>

          <Box
            sx={{
              padding: '.5em',
              margin: '1em',
              borderRadius: '2em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <label>
              Descrição: <br />
              <Input
                placeholder='Descrição do sensor'
                onChange={e => setDescricao(e.target.value)}
                value={descricao}
              />
            </label>
          </Box>

          <Box
            sx={{
              padding: '.5em',
              margin: '1em',
              borderRadius: '2em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <label>
              Nível Mínimo: <br />
              <Input
                type='number'
                placeholder='0.00'
                onChange={e => setNvlMin(parseFloat(e.target.value))}
                value={nvlMin}
              />
            </label>
          </Box>

          <Box
            sx={{
              padding: '.5em',
              margin: '1em',
              borderRadius: '2em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <label>
              Nível Máximo: <br />
              <Input
                type='number'
                placeholder='0.00'
                onChange={e => setNvlMax(parseFloat(e.target.value))}
                value={nvlMax}
              />
            </label>
          </Box>

          <Box
            sx={{
              padding: '.5em',
              margin: '1em',
              borderRadius: '2em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={envMin}
                  onChange={e => setEnvMin(e.target.checked)}
                  color='primary'
                />
              }
              label='Enviar alerta no nível mínimo'
            />
          </Box>

          <Box
            sx={{
              padding: '.5em',
              margin: '1em',
              borderRadius: '2em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={envMax}
                  onChange={e => setEnvMax(e.target.checked)}
                  color='primary'
                />
              }
              label='Enviar alerta no nível máximo'
            />
          </Box>

          <Box
            sx={{
              padding: '.5em',
              margin: '1em',
              borderRadius: '2em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <label>
              Mensagem Nível Mínimo: <br />
              <Input
                placeholder='Mensagem de alerta para nível mínimo'
                onChange={e => setMsgMin(e.target.value)}
                value={msgMin}
              />
            </label>
          </Box>

          <Box
            sx={{
              padding: '.5em',
              margin: '1em',
              borderRadius: '2em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <label>
              Mensagem Nível Máximo: <br />
              <Input
                placeholder='Mensagem de alerta para nível máximo'
                onChange={e => setMsgMax(e.target.value)}
                value={msgMax}
              />
            </label>
          </Box>

          <Box
            sx={{
              padding: '.5em',
              margin: '1em',
              borderRadius: '2em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <Button variant='contained' onClick={efetuarConfigurar} disabled={configurando}>
              {configurando ? <CircularProgress size={20} /> : 'Configurar Sensor'}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
