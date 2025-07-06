import { TRPCError } from '@trpc/server';

import {
  obterMedicaoSchema,
  obterComparacaoSchema,
  obterDiaSchema
} from '@/server/schemas';
import { createTRPCRouter, publicProcedure } from '@/server/trpc';
import { prisma } from '@/server/db';

export const medicaoRouter = createTRPCRouter({
  // Obter medições por período
  obterMedicao: publicProcedure
    .input(obterMedicaoSchema)
    .query(async ({ input }) => {
      try {
        // Implementação baseada no período
        let whereClause = {};
        const now = new Date();

        switch (input.periodo) {
          case 'hoje':
            whereClause = {
              ano: now.getFullYear(),
              mes: now.getMonth() + 1,
              dia: now.getDate()
            };
            break;
          case 'semana':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            whereClause = {
              AND: [
                {
                  OR: [
                    {
                      AND: [
                        { ano: weekAgo.getFullYear() },
                        { mes: weekAgo.getMonth() + 1 },
                        { dia: { gte: weekAgo.getDate() } }
                      ]
                    },
                    {
                      AND: [
                        { ano: now.getFullYear() },
                        { mes: now.getMonth() + 1 },
                        { dia: { lte: now.getDate() } }
                      ]
                    }
                  ]
                }
              ]
            };
            break;
          case 'mes':
            whereClause = {
              ano: now.getFullYear(),
              mes: now.getMonth() + 1
            };
            break;
          case 'ano':
            whereClause = {
              ano: now.getFullYear()
            };
            break;
          default:
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: 'Período inválido'
            });
        }

        const medicoes = await prisma.medicoes.findMany({
          where: whereClause,
          orderBy: [
            { ano: 'asc' },
            { mes: 'asc' },
            { dia: 'asc' },
            { hora: 'asc' },
            { minuto: 'asc' }
          ]
        });

        return {
          success: true,
          data: medicoes
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
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
        // Esta é uma implementação simplificada - pode ser expandida conforme necessário
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

        return {
          success: true,
          data: {
            periodo1: dados1,
            periodo2: dados2
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
          // Dados de um dia específico (implementação simplificada)
          // Aqui você pode implementar lógica para buscar por data específica
          whereClause = {
            ano: now.getFullYear(),
            mes: now.getMonth() + 1,
            dia: now.getDate()
          };
        }

        const medicoes = await prisma.medicoes.findMany({
          where: whereClause,
          orderBy: [
            { hora: 'asc' },
            { minuto: 'asc' }
          ]
        });

        return {
          success: true,
          data: medicoes
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao obter dados do dia'
        });
      }
    }),

  // Obter estatísticas das medições
  getEstatisticas: publicProcedure
    .query(async () => {
      try {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Última medição
        const ultimaMedicao = await prisma.medicoes.findFirst({
          orderBy: [
            { ano: 'desc' },
            { mes: 'desc' },
            { dia: 'desc' },
            { hora: 'desc' },
            { minuto: 'desc' }
          ]
        });

        // Medições de hoje
        const medicoesHoje = await prisma.medicoes.count({
          where: {
            ano: now.getFullYear(),
            mes: now.getMonth() + 1,
            dia: now.getDate()
          }
        });

        // Total de medições
        const totalMedicoes = await prisma.medicoes.count();

        return {
          success: true,
          data: {
            ultimaMedicao,
            medicoesHoje,
            totalMedicoes
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