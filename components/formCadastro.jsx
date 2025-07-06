import { Box, Button, Input, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';

import { registerUser } from '@/api/user';
import { tokens } from '@/app/theme';
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

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [alertaEmail, setAlertaEmail] = useState(false);
  const [alertaSMS, setAlertaSMS] = useState(false);
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [alertaSMSInt, setalertaSMSInt] = useState(0);
  const [alertaEmailInt, setalertaEmailInt] = useState(0);
  const [cadastrando, setCadastrando] = useState(false);
  const { showSuccess, showError, showWarning } = useNotification();

  const fetchData = async () => {
    try {
      const resposta = await registerUser(
        nome,
        cpf,
        endereco,
        email,
        telefone,
        alertaSMSInt,
        alertaEmailInt,
        senha
      );

      if (resposta == 0) {
        showError('Erro ao criar usuário');
      } else if (resposta == 5) {
        showError('Email informado já cadastrado');
      } else if (resposta == 1) {
        showSuccess('Cadastro efetuado com sucesso!');
        // Limpar formulário
        setNome('');
        setCPF('');
        setEmail('');
        setTelefone('');
        setAlertaEmail(false);
        setAlertaSMS(false);
        setSenha('');
        setConfSenha('');
        setEndereco('');
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setCadastrando(false);
    }
  };

  const efetuarCadastro = () => {
    if (
      (email == '') |
      (nome == '') |
      (cpf == '') |
      (endereco == '') |
      (telefone == '') |
      (confSenha == '') |
      (senha == '')
    ) {
      showWarning('Por favor, preencher todos os campos');
    } else {
      const telefoneAlterado = telefone.replace(/\D/g, '');
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
      if (telefoneAlterado.length >= 10 && telefoneAlterado.length <= 11) {
        if (senha.match(regex) && senha == confSenha) {
          if (testaCPF(cpf)) {
            if (email.match('@')) {
              if (alertaEmail) {
                setalertaEmailInt(1);
              } else {
                setalertaEmailInt(0);
              }
              if (alertaSMS) {
                setalertaSMSInt(1);
              } else {
                setalertaSMSInt(0);
              }

              setCadastrando(true);
              fetchData();
            } else {
              showWarning('E-mail inválido');
            }
          } else {
            showWarning('CPF inválido');
          }
        } else {
          showWarning(
            'Senha inválida. Deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.'
          );
        }
      } else {
        showWarning('Telefone inválido');
      }
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
            <label>
              Senha: <br />
              <Input
                type='password'
                placeholder='Mínimo 8 caracteres'
                onChange={event => setSenha(event.target.value)}
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
              Confirmar Senha: <br />
              <Input
                type='password'
                placeholder='Confirme sua senha'
                onChange={event => setConfSenha(event.target.value)}
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
            <Button variant='contained' onClick={efetuarCadastro} disabled={cadastrando}>
              {cadastrando ? <CircularProgress size={20} /> : 'Cadastrar'}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cadastro;
