import { loginUser } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button, Input, CircularProgress } from "@mui/material";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNotification } from '@/hooks/useNotification';

export default function FormLogin(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [user, setUser] = useState(null);
    const [logando, setLogando] = useState(false);
    const { showSuccess, showError, showWarning } = useNotification();
    
    async function fetchData() {
        try {
            const usuario = await loginUser(email, senha);
            setUser(usuario);
        } catch (error) {
            showError(error.message);
            setLogando(false);
        }
    }

    const efetuarLogin = () => {
        if(!logando){
            setLogando(true);
            if(email.match('@')){
                fetchData();
                setTimeout(function() {
                    if(user!=null){
                        showSuccess("Logado com sucesso!");
                        
                        localStorage.setItem("userName", user.nome);
                        localStorage.setItem("userMail", user.email);
                        localStorage.setItem("userCPF", user.cpf);
                        localStorage.setItem("userEndereco", user.endereco);
                        localStorage.setItem("userTelefone", user.telefone);
                        localStorage.setItem("userAlertaSms", user.alerta_sms);
                        localStorage.setItem("userAlertaEmail", user.alerta_email);
                        localStorage.setItem("userAcess", user.acesso);
                        
                        setUser(null);
                    }else{
                        showError('Email ou senha incorretos');
                    }
                    setLogando(false);
                    
                }, 500);
            }else{
                showWarning("E-mail inválido");
                setLogando(false);
            }
        }else{
            showWarning('Logando, aguarde...');
        }
    };

    return(
        <>
        <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                            width: {sm: '35em', xs: '20em'},
                            height: 'auto',
                            padding: '.5em',
                            margin: '1em',
                            backgroundColor: tokens.primary[600]+"88",
                            borderRadius: '2em',
                        }}>
                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                            <label margin='1px'>
                            E-mail: <br/><Input name='email' id='emailID' 
                            onChange={e => setEmail(e.target.value)}/>
                            </label>
                        </Box>
                        
                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                            <label>
                            Senha: <br/><Input name='senha' id='senhaID' type='password'
                            onChange={e => setSenha(e.target.value)}/>
                            </label>
                        </Box>
                        
                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                            <Button variant='contained' onClick={efetuarLogin} disabled={logando}>
                                {logando ? <CircularProgress size={20} /> : 'Entrar'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
        </>
    );
}