import { recuperarSenha } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button, Input, CircularProgress } from "@mui/material";
import React from 'react';
import { useState } from 'react';
import { useNotification } from '@/hooks/useNotification';

export default function FormRecuperar(){
    const [email, setEmail] = useState("");
    const [confEmail, setConfEmail] = useState("");
    const [enviando, setEnviando] = useState(false);
    const { showSuccess, showError, showWarning } = useNotification();

    async function fetchData() {
        try {
            const resultado = await recuperarSenha(email);
            showSuccess(resultado);
        } catch (error) {
            showError(error.message);
        } finally {
            setEnviando(false);
        }
    }

    const efetuarRecuperacao = () => {
        if(email.match('@') && email==confEmail){
            setEnviando(true);
            fetchData();
        }else{
            showWarning("Email inválido ou não compatível");
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
                            <label>
                            E-mail: <br/>
                            <Input  
                                name='email' 
                                pattern="email" 
                                placeholder='exemplo@exemplo.com'
                                onChange={e => setEmail(e.target.value)} value={email}
                            />
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
                            Confirmar E-mail: <br/>
                            <Input  
                                name='confEmail' 
                                pattern="email" 
                                placeholder='exemplo@exemplo.com'
                                onChange={e => setConfEmail(e.target.value)} value={confEmail}
                            />
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
                            <Button variant='contained' onClick={efetuarRecuperacao} disabled={enviando}>
                                {enviando ? <CircularProgress size={20} /> : 'Enviar Email de Recuperação'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
        </>
    );
}