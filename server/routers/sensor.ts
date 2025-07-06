import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/server/db';
import { configuracaoSensorSchema, pesquisaSensoresSchema } from '@/server/schemas';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/server/trpc';

export const sensorRouter = createTRPCRouter({
  // Pesquisar sensores
  pesquisaSensores: publicProcedure.input(pesquisaSensoresSchema).query(async ({ input }) => {
    try {
      const whereClause = input.idSensor ? { id_sensor: input.idSensor } : {};

      const sensores = await prisma.sensor.findMany({
        where: whereClause,
        include: {
          rio_alvo: {
            include: {
              cid_alvo: true
            }
          },
          cad_niveis: true,
          usuario: {
            select: {
              id_usuario: true,
              nome: true,
              email: true
            }
          }
        }
      });

      return {
        success: true,
        data: sensores
      };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao pesquisar sensores'
      });
    }
  }),

  // Atualizar configuração do sensor
  atualizaConfSensor: protectedProcedure
    .input(configuracaoSensorSchema)
    .mutation(async ({ input }) => {
      try {
        // Verificar se o sensor existe
        const sensor = await prisma.sensor.findUnique({
          where: { id_sensor: input.idSensor }
        });

        if (!sensor) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Sensor não encontrado'
          });
        }

        // Atualizar ou criar configuração do sensor
        const configuracao = await prisma.conf_sensor.upsert({
          where: { idSensor: input.idSensor },
          update: {
            descricao_conf: input.descricao,
            nivelMin: input.nvlMin,
            alertarMin: input.envMin,
            nivelMax: input.nvlMax,
            alertarMax: input.envMax,
            msgMin: input.msgMin,
            msgMax: input.msgMax
          },
          create: {
            idSensor: input.idSensor,
            descricao_conf: input.descricao,
            nivelMin: input.nvlMin,
            alertarMin: input.envMin,
            nivelMax: input.nvlMax,
            alertarMax: input.envMax,
            msgMin: input.msgMin,
            msgMax: input.msgMax
          }
        });

        return {
          success: true,
          message: 'Configuração do sensor atualizada com sucesso',
          data: configuracao
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao atualizar configuração do sensor'
        });
      }
    }),

  // Obter configuração do sensor
  getConfiguracaoSensor: publicProcedure
    .input(z.object({ idSensor: z.number().int().positive() }))
    .query(async ({ input }) => {
      try {
        const configuracao = await prisma.conf_sensor.findUnique({
          where: { idSensor: input.idSensor }
        });

        return {
          success: true,
          data: configuracao
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao buscar configuração do sensor'
        });
      }
    }),

  // Obter níveis de alerta do sensor
  getNiveisAlerta: publicProcedure
    .input(z.object({ idSensor: z.number().int().positive() }))
    .query(async ({ input }) => {
      try {
        const niveis = await prisma.cad_niveis.findMany({
          where: { sensor_id_sensor: input.idSensor },
          orderBy: { nivel_inicial: 'asc' }
        });

        return {
          success: true,
          data: niveis
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao buscar níveis de alerta'
        });
      }
    })
});
