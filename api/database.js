'use server'
import axios from 'axios';
import { config } from '@/config/env';

// Função para receber dados por período
export const obterMedicao = async (periodo) => {
    try {
        const response = await axios.post(`${config.backend.url}/medicoes`, { periodo });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        throw new Error('Não foi possível obter os dados de medição. Tente novamente mais tarde.');
    }
};

//Função para obter dados de comparação
export const obterComparacao = async (periodo, comp1, comp2) => {
  try {
    const response = await axios.post(`${config.backend.url}/comparacao`, {
        "periodo": periodo, 
        "comp_1": comp1, 
        "comp_2": comp2
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados de comparação:', error);
    throw new Error('Não foi possível obter dados de comparação. Tente novamente mais tarde.');
  }
};

//Função para obter dia 
//Periodo pode ser "dia" ou "diaEsp" <- "dia" pega do dia atual, e "diaEsp" pega de qualquer dia (usado no gráfico com flechinha)
export const obterDia = async (periodo, comp1) => {
  try {
    const response = await axios.post(`${config.backend.url}/comparacao`, {
        "periodo": periodo, 
        "comp_1": comp1
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados do dia:', error);
    throw new Error('Não foi possível obter dados do dia. Tente novamente mais tarde.');
  }
};
