/* eslint-disable no-case-declarations */
import { TRPCError } from '@trpc/server';

import { prisma } from '@/server/db';
import { obterMedicaoSchema, obterComparacaoSchema, obterDiaSchema } from '@/server/schemas';
import { createTRPCRouter, publicProcedure } from '@/server/trpc';

// Função para transformar dados do banco no formato do Nivo com escalas separadas
const transformarDadosParaGrafico = (medicoes: any[]) => {
  if (!medicoes || medicoes.length === 0) {
    return [];
  }

  // Agrupar dados por tipo de medição com validação rigorosa
  const dadosNivel = medicoes
    .filter(medicao => 
      medicao.nivelAgua !== null && 
      medicao.nivelAgua !== undefined && 
      medicao.nivelAgua >= 0 && 
      medicao.nivelAgua <= 100 // Assumindo que nível da água não excede 100m
    )
    .map(medicao => ({
      x: `${medicao.hora.toString().padStart(2, '0')}:${medicao.minuto.toString().padStart(2, '0')}`,
      y: parseFloat(medicao.nivelAgua.toFixed(2)) // Precisão de 2 casas decimais
    }))
    .filter(ponto => !isNaN(ponto.y) && ponto.y >= 0);

  const dadosTemperatura = medicoes
    .filter(medicao => 
      medicao.temperaturaAmbiente !== null && 
      medicao.temperaturaAmbiente !== undefined && 
      medicao.temperaturaAmbiente >= -50 && 
      medicao.temperaturaAmbiente <= 100 // Range realista de temperatura
    )
    .map(medicao => ({
      x: `${medicao.hora.toString().padStart(2, '0')}:${medicao.minuto.toString().padStart(2, '0')}`,
      y: parseFloat(medicao.temperaturaAmbiente.toFixed(1)) // Precisão de 1 casa decimal
    }))
    .filter(ponto => !isNaN(ponto.y) && ponto.y >= -50 && ponto.y <= 100);

  const dadosUmidade = medicoes
    .filter(medicao => 
      medicao.umidade !== null && 
      medicao.umidade !== undefined && 
      medicao.umidade >= 0 && 
      medicao.umidade <= 100 // Umidade em porcentagem
    )
    .map(medicao => ({
      x: `${medicao.hora.toString().padStart(2, '0')}:${medicao.minuto.toString().padStart(2, '0')}`,
      y: parseFloat(medicao.umidade.toFixed(1)) // Precisão de 1 casa decimal
    }))
    .filter(ponto => !isNaN(ponto.y) && ponto.y >= 0 && ponto.y <= 100);

  const series = [];

  // Adicionar série de nível da água (eixo Y esquerdo)
  if (dadosNivel.length > 0) {
    series.push({
      id: 'Nível da Água',
      data: dadosNivel,
      yAxis: 'left',
      color: '#1976d2', // Azul primário
      lineWidth: 3,
      pointSize: 8
    });
  }

  // Adicionar série de temperatura (eixo Y direito)
  if (dadosTemperatura.length > 0) {
    series.push({
      id: 'Temperatura',
      data: dadosTemperatura,
      yAxis: 'right',
      color: '#d32f2f', // Vermelho para temperatura
      lineWidth: 2,
      pointSize: 6
    });
  }

  // Adicionar série de umidade (eixo Y direito secundário)
  if (dadosUmidade.length > 0) {
    series.push({
      id: 'Umidade',
      data: dadosUmidade,
      yAxis: 'right2',
      color: '#388e3c', // Verde para umidade
      lineWidth: 2,
      pointSize: 6
    });
  }

  return series;
};

export const medicaoRouter = createTRPCRouter({
  // Endpoint de teste
  test: publicProcedure
    .query(async () => {
      return {
        success: true,
        message: 'tRPC está funcionando!',
        timestamp: new Date().toISOString()
      };
    }),

  // Obter medições por período
  obterMedicao: publicProcedure
    .input(obterMedicaoSchema)
    .query(async () => {
      try {
        // Implementação simplificada para teste
        const medicoes = await prisma.medicoes.findMany({
          take: 10,
          orderBy: [
            { ano: 'desc' },
            { mes: 'desc' },
            { dia: 'desc' },
            { hora: 'desc' },
            { minuto: 'desc' }
          ]
        });

        // Transformar dados para o formato do Nivo
        const dadosFormatados = transformarDadosParaGrafico(medicoes);

        return {
          success: true,
          data: dadosFormatados
        };
      } catch (error) {
        console.error('Erro no obterMedicao:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao obter medições'
        });
      }
    }),

  // Obter dados de comparação
  obterComparacao: publicProcedure
    .input(obterComparacaoSchema)
    .query(async ({ input }) => {
      try {
        // Implementação para comparação entre dois períodos
        const now = new Date();
        let periodo1Where = {};
        let periodo2Where = {};

        // Definir períodos baseados em comp1 e comp2
        if (input.comp1 === 'hoje' && input.comp2 === 'ontem') {
          const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          
          periodo1Where = {
            ano: now.getFullYear(),
            mes: now.getMonth() + 1,
            dia: now.getDate()
          };
          
          periodo2Where = {
            ano: yesterday.getFullYear(),
            mes: yesterday.getMonth() + 1,
            dia: yesterday.getDate()
          };
        } else if (input.comp1.includes('/') && input.comp2.includes('/')) {
          // Comparação entre duas datas específicas (formato YYYY/MM/DD)
          const data1 = new Date(input.comp1.replace(/\//g, '-'));
          const data2 = new Date(input.comp2.replace(/\//g, '-'));
          
          periodo1Where = {
            ano: data1.getFullYear(),
            mes: data1.getMonth() + 1,
            dia: data1.getDate()
          };
          
          periodo2Where = {
            ano: data2.getFullYear(),
            mes: data2.getMonth() + 1,
            dia: data2.getDate()
          };
        } else {
          // Implementação genérica para outros tipos de comparação
          periodo1Where = { ano: now.getFullYear() };
          periodo2Where = { ano: now.getFullYear() - 1 };
        }

        const [dados1, dados2] = await Promise.all([
          prisma.medicoes.findMany({
            where: periodo1Where,
            orderBy: [
              { ano: 'asc' },
              { mes: 'asc' },
              { dia: 'asc' },
              { hora: 'asc' }
            ]
          }),
          prisma.medicoes.findMany({
            where: periodo2Where,
            orderBy: [
              { ano: 'asc' },
              { mes: 'asc' },
              { dia: 'asc' },
              { hora: 'asc' }
            ]
          })
        ]);

        // Transformar dados para o formato do Nivo
        const dadosFormatados1 = transformarDadosParaGrafico(dados1);
        const dadosFormatados2 = transformarDadosParaGrafico(dados2);

        return {
          success: true,
          data: {
            periodo1: dadosFormatados1,
            periodo2: dadosFormatados2
          }
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao obter dados de comparação'
        });
      }
    }),

  // Obter dados do dia
  obterDia: publicProcedure
    .input(obterDiaSchema)
    .query(async ({ input }) => {
      try {
        const now = new Date();
        let whereClause = {};

        if (input.periodo === 'dia') {
          // Dados do dia atual
          whereClause = {
            ano: now.getFullYear(),
            mes: now.getMonth() + 1,
            dia: now.getDate()
          };
        } else if (input.periodo === 'diaEsp') {
          // Dados de um dia específico
          // input.comp1 deve estar no formato YYYY-MM-DD
          const dataEspecifica = new Date(input.comp1);
          whereClause = {
            ano: dataEspecifica.getFullYear(),
            mes: dataEspecifica.getMonth() + 1,
            dia: dataEspecifica.getDate()
          };
        }

        const medicoes = await prisma.medicoes.findMany({
          where: whereClause,
          orderBy: [
            { hora: 'asc' },
            { minuto: 'asc' }
          ]
        });

        // Transformar dados para o formato do Nivo
        const dadosFormatados = transformarDadosParaGrafico(medicoes);

        return {
          success: true,
          data: dadosFormatados
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao obter dados do dia'
        });
      }
    }),

  // Obter estatísticas
  getEstatisticas: publicProcedure
    .query(async () => {
      try {
        const totalMedicoes = await prisma.medicoes.count();
        const hoje = new Date();
        const medicoesHoje = await prisma.medicoes.count({
          where: {
            ano: hoje.getFullYear(),
            mes: hoje.getMonth() + 1,
            dia: hoje.getDate()
          }
        });

        return {
          success: true,
          data: {
            total: totalMedicoes,
            hoje: medicoesHoje
          }
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao obter estatísticas'
        });
      }
    })
});
