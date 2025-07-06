import { registerUser } from "@/api/user";
import { tokens } from "@/app/theme";
import { Box, Button, Input, CircularProgress, FormControlLabel, Checkbox } from "@mui/material";
import React from 'react';
import { useState } from 'react';
import { useNotification } from '@/hooks/useNotification';

function testaCPF(cpf){
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    return result;
}

export default function DadosUsuario(){
    const [nome, setNome] = useState(localStorage.getItem("userName") || "");
    const [cpf, setCPF] = useState(localStorage.getItem("userCPF") || "");
    const [email, setEmail] = useState(localStorage.getItem("userMail") || "");
    const [telefone, setTelefone] = useState(localStorage.getItem("userTelefone") || "");
    const [alerta_email, setAlertaEmail] = useState(localStorage.getItem("userAlertaEmail") === "1");
    const [alerta_sms, setAlertaSMS] = useState(localStorage.getItem("userAlertaSms") === "1");
    const [endereco, setEndereco] = useState(localStorage.getItem("userEndereco") || "");
    const [resposta, setResposta] = useState(0);
    const [atualizando, setAtualizando] = useState(false);
    const { showSuccess, showError, showWarning } = useNotification();

    async function fetchData() {
        try {
            // TODO: Implementar função de atualização de dados do usuário
            // const resposta = await updateUserData(nome, cpf, endereco, email, telefone, alerta_sms ? 1 : 0, alerta_email ? 1 : 0);
            // setResposta(resposta);
            
            if(resposta==0){
                showError("Erro ao atualizar os dados!");
            }else if(resposta==1){
                showSuccess("Dados atualizados com sucesso!");
                // Atualizar localStorage
                localStorage.setItem("userName", nome);
                localStorage.setItem("userMail", email);
                localStorage.setItem("userCPF", cpf);
                localStorage.setItem("userEndereco", endereco);
                localStorage.setItem("userTelefone", telefone);
                localStorage.setItem("userAlertaSms", alerta_sms ? "1" : "0");
                localStorage.setItem("userAlertaEmail", alerta_email ? "1" : "0");
            }
        } catch (error) {
            showError(error.message);
        } finally {
            setAtualizando(false);
        }
    }

    const efetuarAlteracao = () => {
        if(email=="" | nome=="" | cpf=="" | endereco=="" | telefone==""){
            showWarning("Por favor, preencher todos os campos");
        }else {
            const telefoneAlterado = telefone.replace(/\D/g,'');
            
            if(telefoneAlterado.length >= 10 && telefoneAlterado.length <= 11){
                if(testaCPF(cpf)){
                    if(email.match('@')){
                        setAtualizando(true);
                        fetchData();
                    }else{
                        showWarning("E-mail inválido");
                    }
                }else{
                    showWarning("CPF inválido");
                }
            }else{
                showWarning("Telefone inválido");
            } 
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
                            Nome: <br/><Input name='nome' id='nomeID' 
                            onChange={e => setNome(e.target.value)} value={nome}/>
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
                        Endereco: <br/>
                        <Input placeholder="Rua, Nº, Bairro"
                        onChange={e => setEndereco(e.target.value)} value={endereco}/>
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
                        CPF: <br/><Input name='cpf' id='cpfID' maxLength="14"
                        onChange={e => setCPF(e.target.value)} value={cpf}/>
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
                        Telefone: <br/>
                        <Input placeholder="(00) 00000-0000"
                        onChange={e => setTelefone(e.target.value)} value={telefone}/>
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={alerta_email}
                                        onChange={(e) => setAlertaEmail(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Receber alertas por email"
                            />
                        </Box>
                        
                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={alerta_sms}
                                        onChange={(e) => setAlertaSMS(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Receber alertas por SMS"
                            />
                        </Box>
                        
                        <Box sx={{
                            padding: '.5em',
                            margin: '1em',
                            borderRadius: '2em',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                            <Button variant='contained' onClick={efetuarAlteracao} disabled={atualizando}>
                                {atualizando ? <CircularProgress size={20} /> : 'Atualizar Dados'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
        </>
    );
}