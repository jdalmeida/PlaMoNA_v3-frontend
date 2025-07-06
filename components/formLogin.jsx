import { loginUser } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button, Input, CircularProgress, FormHelperText } from "@mui/material";
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotification } from '@/hooks/useNotification';
import { useUser } from '@/contexts/UserContext';
import { loginSchema } from '@/utils/validations';

export default function FormLogin(){
    const [logando, setLogando] = useState(false);
    const { showSuccess, showError, showWarning } = useNotification();
    const { login } = useUser();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onChange'
    });
    
    async function fetchData(data) {
        try {
            const usuario = await loginUser(data.email, data.senha);
            if (usuario) {
                login(usuario);
                showSuccess("Logado com sucesso!");
                // Limpar formulário
                reset();
            } else {
                showError('Email ou senha incorretos');
            }
        } catch (error) {
            showError(error.message);
        } finally {
            setLogando(false);
        }
    }

    const efetuarLogin = (data) => {
        if(!logando){
            setLogando(true);
            fetchData(data);
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
                        <form onSubmit={handleSubmit(efetuarLogin)}>
                            <Box sx={{
                                padding: '.5em',
                                margin: '1em',
                                borderRadius: '2em',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}>
                                <label margin='1px'>
                                E-mail: <br/>
                                <Input 
                                    name='email' 
                                    id='emailID' 
                                    {...register('email')}
                                    error={!!errors.email}
                                />
                                {errors.email && (
                                    <FormHelperText error>
                                        {errors.email.message}
                                    </FormHelperText>
                                )}
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
                                Senha: <br/>
                                <Input 
                                    name='senha' 
                                    id='senhaID' 
                                    type='password'
                                    {...register('senha')}
                                    error={!!errors.senha}
                                />
                                {errors.senha && (
                                    <FormHelperText error>
                                        {errors.senha.message}
                                    </FormHelperText>
                                )}
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
                                <Button 
                                    type="submit"
                                    variant='contained' 
                                    disabled={logando}
                                >
                                    {logando ? <CircularProgress size={20} /> : 'Entrar'}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
        </>
    );
}