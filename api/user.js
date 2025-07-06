'use server'
import axios from 'axios';
import { config } from '@/config/env';

// Função para enviar os dados de registro para o servidor
export const registerUser = async(nome, cpf, endereco, email, telefone, alerta_sms, alerta_email, senha ) =>{
    try {
      const response = await axios.post(`${config.backend.url}/api/register`, { 
        nome, cpf, endereco, email, telefone, alerta_sms, alerta_email, senha 
      });
      return response.data.loginState;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw new Error('Erro ao realizar cadastro. Tente novamente mais tarde.');
    }
};

export const loginUser = async ( email, senha ) => {
    try {
      const response = await axios.post(`${config.backend.url}/api/login`, { email, senha });
      
      if(response.data.loginState==1){
          const user = response.data.usuario;
          return user;
      }else{
        return null;
      }
      
    } catch (error) {
      console.error('Erro durante o login:', error);
      throw new Error('Erro ao realizar login. Verifique suas credenciais e tente novamente.');
    }
};

export const recuperarSenha = async ( email ) => {
    try {
      const response = await axios.post(`${config.backend.url}/email`, { email });
      return response.data.message;
    }catch(error){
      console.error('Erro durante o envio do email:', error);
      throw new Error('Erro ao enviar email de recuperação. Tente novamente mais tarde.');
    }
};

export const enviaNovaSenha = async( codigo, novaSenha) => {
    try{
      const response = await axios.post(`${config.backend.url}/novaSenha`, { codigo, novaSenha });
      return response.data.message;
    } catch(error){
      console.error('Erro ao alterar senha:', error);
      throw new Error('Erro ao alterar senha. Verifique o código e tente novamente.');
    }
}

export const atualizaConfSensor = async (idSensor, descricao, nvlMin, 
  nvlMax, envMin, envMax, msgMin, msgMax) => {
    try{
      const response = await axios.post(`${config.backend.url}/atualizaSensor`, {
        idSensor, descricao, nvlMin, nvlMax, envMin, envMax, msgMin, msgMax
      });
      return response.data.message;
    } catch(error){
      console.error('Erro ao atualizar configurações do sensor:', error);
      throw new Error('Erro ao atualizar configurações do sensor. Tente novamente mais tarde.');
    }
}

export const pesquisaSensores = async (idSensor) => {
    try{
      const response = await axios.post(`${config.backend.url}/getSensores`, {idSensor} );
      
      if(response.data.state==0){
        return response.data.resultado.data;
      }else{
        throw new Error(response.data.message || 'Erro ao pesquisar sensores');
      }
    } catch(error){
      console.error('Erro ao pesquisar sensores:', error);
      throw new Error('Erro ao pesquisar sensores. Tente novamente mais tarde.');
    }
}
