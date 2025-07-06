import { climaRouter } from './clima';
import { medicaoRouter } from './medicao';
import { sensorRouter } from './sensor';
import { userRouter } from './user';

import { createTRPCRouter } from '@/server/trpc';

export const appRouter = createTRPCRouter({
  user: userRouter,
  sensor: sensorRouter,
  medicao: medicaoRouter,
  clima: climaRouter
});

export type AppRouter = typeof appRouter; 