import { Box, Button, Input, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

import { loginUser } from '@/api/user';
import { useNotification } from '@/hooks/useNotification';

export default function FormLogin () {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async event => {
    event.preventDefault();
    setCarregando(true);
    try {
      const resultado = await loginUser(email, senha);
      if (resultado) {
        showSuccess('Login realizado com sucesso!');
      } else {
        showError('Email ou senha inválidos!');
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Input value={email} onChange={event => setEmail(event.target.value)} placeholder='Email' />
      <Input
        value={senha}
        onChange={event => setSenha(event.target.value)}
        placeholder='Senha'
        type='password'
      />
      <Button type='submit' disabled={carregando} variant='contained' color='primary'>
        {carregando ? <CircularProgress size={24} /> : 'Entrar'}
      </Button>
    </Box>
  );
}
