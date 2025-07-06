import { Box, Button, Input, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import React from 'react';
import { useState } from 'react';

import { registerUser } from '@/api/user';
import { tokens } from '@/app/theme';
import { useNotification } from '@/hooks/useNotification';

function testaCPF (cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let result = true;
  [9, 10].forEach((j) => {
    let soma = 0,
      r;
    cpf
      .split(/(?=)/)
      .splice(0, j)
      .forEach((e, i) => {
        soma += parseInt(e) * (j + 2 - (i + 1));
      });
    r = soma % 11;
    r = r < 2 ? 0 : 11 - r;
    if (r != cpf.substring(j, j + 1)) result = false;
  });
  return result;
}

export default function Cadastro () {
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [alerta_email, setAlertaEmail] = useState(false);
  const [alerta_sms, setAlertaSMS] = useState(false);
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [resposta, setResposta] = useState('');
  const [alerta_smsInt, setAlerta_smsInt] = useState(0);
  const [alerta_emailInt, setAlerta_emailInt] = useState(0);
  const [cadastrando, setCadastrando] = useState(false);
  const { showSuccess, showError, showWarning } = useNotification();

  async function fetchData () {
    try {
      const resposta = await registerUser(
        nome,
        cpf,
        endereco,
        email,
        telefone,
        alerta_smsInt,
        alerta_emailInt,
        senha
      );
      setResposta(resposta);

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
  }

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
              if (alerta_email) {
                setAlerta_emailInt(1);
              } else {
                setAlerta_emailInt(0);
              }
              if (alerta_sms) {
                setAlerta_smsInt(1);
              } else {
                setAlerta_smsInt(0);
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
              <Input name='nome' id='nomeID' onChange={e => setNome(e.target.value)} value={nome} />
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
                onChange={e => setEndereco(e.target.value)}
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
                onChange={e => setCPF(e.target.value)}
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
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setTelefone(e.target.value)}
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
              Confirmar Senha: <br />
              <Input
                type='password'
                placeholder='Confirme sua senha'
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={alerta_email}
                  onChange={e => setAlertaEmail(e.target.checked)}
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
                  checked={alerta_sms}
                  onChange={e => setAlertaSMS(e.target.checked)}
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
}
