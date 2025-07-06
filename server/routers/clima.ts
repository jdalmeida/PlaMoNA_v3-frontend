import { TRPCError } from '@trpc/server';
import axios from 'axios';

import { createTRPCRouter, publicProcedure } from '@/server/trpc';

export const climaRouter = createTRPCRouter({
  // Obter dados do clima
  getClima: publicProcedure
    .query(async () => {
      try {
        // Validar configuração
        const apiKey = process.env.WEATHER_API_KEY;
        const baseUrl = process.env.WEATHER_BASE_URL || 'http://api.weatherapi.com/v1';

        if (!apiKey) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Chave da API de clima não configurada'
          });
        }

        const clima = await axios.get(
          `${baseUrl}/current.json?key=${apiKey}&q=Venâncio&lang=pt`
        );

        return {
          success: true,
          data: clima.data.current
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error('Erro ao obter dados do clima:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Não foi possível obter dados do clima. Tente novamente mais tarde.'
        });
      }
    }),

  // Obter previsão do tempo
  getPrevisao: publicProcedure
    .query(async () => {
      try {
        const apiKey = process.env.WEATHER_API_KEY;
        const baseUrl = process.env.WEATHER_BASE_URL || 'http://api.weatherapi.com/v1';

        if (!apiKey) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Chave da API de clima não configurada'
          });
        }

        const previsao = await axios.get(
          `${baseUrl}/forecast.json?key=${apiKey}&q=Venâncio&lang=pt&days=7`
        );

        return {
          success: true,
          data: previsao.data.forecast
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error('Erro ao obter previsão do tempo:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Não foi possível obter previsão do tempo. Tente novamente mais tarde.'
        });
      }
    })
}); 