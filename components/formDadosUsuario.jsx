import { Box, Button, Input, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import { useState, useEffect } from 'react';

import { tokens } from '@/app/theme';
import { useUser } from '@/contexts/UserContext';
import { useNotification } from '@/hooks/useNotification';

const testaCPF = cpf => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let result = true;
  [9, 10].forEach(j => {
    let soma = 0,
      re;
    cpf
      .split(/(?=)/)
      .splice(0, j)
      .forEach((element, i) => {
        soma += parseInt(element) * (j + 2 - (i + 1));
      });
    re = soma % 11;
    re = re < 2 ? 0 : 11 - re;
    if (re != cpf.substring(j, j + 1)) result = false;
  });
  return result;
};

const DadosUsuario = () => {
  const { user, updateUser } = useUser();
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [alertaEmail, setAlertaEmail] = useState(false);
  const [alertaSMS, setAlertaSMS] = useState(false);
  const [endereco, setEndereco] = useState('');
  const [atualizando, setAtualizando] = useState(false);
  const { showSuccess, showError, showWarning } = useNotification();

  // Carregar dados do usuário quando o componente montar
  useEffect(() => {
    if (user) {
      setNome(user.nome || '');
      setCPF(user.cpf || '');
      setEmail(user.email || '');
      setTelefone(user.telefone || '');
      setAlertaEmail(user.alertaEmail === '1');
      setAlertaSMS(user.alertaSMS === '1');
      setEndereco(user.endereco || '');
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const userData = {
        ...user,
        nome,
        cpf,
        email,
        telefone,
        endereco,
        alertaSMS: alertaSMS ? '1' : '0',
        alertaEmail: alertaEmail ? '1' : '0'
      };

      updateUser(userData);
      showSuccess('Dados atualizados com sucesso!');
    } catch (error) {
      showError(error.message);
    } finally {
      setAtualizando(false);
    }
  };

  const efetuarAlteracao = () => {
    if ((email == '') | (nome == '') | (cpf == '') | (endereco == '') | (telefone == '')) {
      showWarning('Por favor, preencher todos os campos');
    } else {
      const telefoneAlterado = telefone.replace(/\D/g, '');

      if (telefoneAlterado.length >= 10 && telefoneAlterado.length <= 11) {
        if (testaCPF(cpf)) {
          if (email.match('@')) {
            setAtualizando(true);
            fetchData();
          } else {
            showWarning('E-mail inválido');
          }
        } else {
          showWarning('CPF inválido');
        }
      } else {
        showWarning('Telefone inválido');
      }
    }
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>
        <p>Usuário não autenticado</p>
      </Box>
    );
  }

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
            <label margin='1px'>
              Nome: <br />
              <Input
                name='nome'
                id='nomeID'
                onChange={event => setNome(event.target.value)}
                value={nome}
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
              Endereco: <br />
              <Input
                placeholder='Rua, Nº, Bairro'
                onChange={event => setEndereco(event.target.value)}
                value={endereco}
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
              CPF: <br />
              <Input
                name='cpf'
                id='cpfID'
                maxLength='14'
                onChange={event => setCPF(event.target.value)}
                value={cpf}
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
              E-mail: <br />
              <Input
                name='email'
                pattern='email'
                placeholder='exemplo@exemplo.com'
                onChange={event => setEmail(event.target.value)}
                value={email}
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
              Telefone: <br />
              <Input
                placeholder='(00) 00000-0000'
                onChange={event => setTelefone(event.target.value)}
                value={telefone}
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
                  checked={alertaEmail}
                  onChange={event => setAlertaEmail(event.target.checked)}
                  color='primary'
                />
              }
              label='Receber alertas por email'
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
                  checked={alertaSMS}
                  onChange={event => setAlertaSMS(event.target.checked)}
                  color='primary'
                />
              }
              label='Receber alertas por SMS'
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
            <Button variant='contained' onClick={efetuarAlteracao} disabled={atualizando}>
              {atualizando ? <CircularProgress size={20} /> : 'Atualizar Dados'}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DadosUsuario;
