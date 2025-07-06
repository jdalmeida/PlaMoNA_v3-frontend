import { Box, Button, Input, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

import { useNotification } from '@/hooks/useNotification';
import { useLoginUser } from '@/hooks/useTRPC';

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { showSuccess, showError } = useNotification();
  const loginMutation = useLoginUser();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const resultado = await loginMutation.mutateAsync({ email, senha });
      if (resultado.success) {
        showSuccess('Login realizado com sucesso!');
        // Aqui você pode redirecionar ou atualizar o contexto do usuário
      } else {
        showError('Email ou senha inválidos!');
      }
    } catch (error) {
      showError(error.message || 'Erro ao realizar login');
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
      <Button type='submit' disabled={loginMutation.isLoading} variant='contained' color='primary'>
        {loginMutation.isLoading ? <CircularProgress size={24} /> : 'Entrar'}
      </Button>
    </Box>
  );
}
