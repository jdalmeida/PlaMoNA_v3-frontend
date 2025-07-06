import { loginUser } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button, Input, CircularProgress } from "@mui/material";
import React from 'react';
import { useState } from 'react';
import { useNotification } from '@/hooks/useNotification';
import { useUser } from '@/contexts/UserContext';

export default function FormLogin(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [logando, setLogando] = useState(false);
    const { showSuccess, showError, showWarning } = useNotification();
    const { login } = useUser();
    
    async function fetchData() {
        try {
            const usuario = await loginUser(email, senha);
            if (usuario) {
                login(usuario);
                showSuccess("Logado com sucesso!");
                // Limpar formulário
                setEmail("");
                setSenha("");
            } else {
                showError('Email ou senha incorretos');
            }
        } catch (error) {
            showError(error.message);
        } finally {
            setLogando(false);
        }
    }

    const efetuarLogin = () => {
        if(!logando){
            setLogando(true);
            if(email.match('@')){
                fetchData();
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
                            onChange={e => setEmail(e.target.value)} value={email}/>
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
                            onChange={e => setSenha(e.target.value)} value={senha}/>
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