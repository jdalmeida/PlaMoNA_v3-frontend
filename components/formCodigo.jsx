import { enviaNovaSenha } from '@/api/user';
import { tokens } from '@/app/theme';
import { Box, Button, Input, CircularProgress } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNotification } from '@/hooks/useNotification';

export default function FormRecuperar() {
  const [codigo, setCodigo] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [alterando, setAlterando] = useState(false);
  const { showSuccess, showError, showWarning } = useNotification();

  async function fetchData() {
    try {
      const resultado = await enviaNovaSenha(codigo, senha);
      showSuccess(resultado);
      // Limpar formulário
      setCodigo('');
      setSenha('');
      setConfSenha('');
    } catch (error) {
      showError(error.message);
    } finally {
      setAlterando(false);
    }
  }

  const AlterarSenha = () => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    if (senha.match(regex) && senha == confSenha) {
      if (codigo != '') {
        setAlterando(true);
        fetchData();
      } else {
        showWarning('Por favor, informe o código de recuperação');
      }
    } else {
      showWarning(
        'Senha inválida. Deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.'
      );
    }
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
            <label>
              Código de Recuperação: <br />
              <Input
                placeholder='Digite o código recebido por email'
                onChange={e => setCodigo(e.target.value)}
                value={codigo}
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
              Nova Senha: <br />
              <Input
                type='password'
                placeholder='Mínimo 8 caracteres'
                onChange={e => setSenha(e.target.value)}
                value={senha}
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
              Confirmar Nova Senha: <br />
              <Input
                type='password'
                placeholder='Confirme sua nova senha'
                onChange={e => setConfSenha(e.target.value)}
                value={confSenha}
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
            <Button variant='contained' onClick={AlterarSenha} disabled={alterando}>
              {alterando ? <CircularProgress size={20} /> : 'Alterar Senha'}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
