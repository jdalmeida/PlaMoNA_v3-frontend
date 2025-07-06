import { sensorRouter } from './sensor';
import { userRouter } from './user';

import { createTRPCRouter } from '@/server/trpc';

export const appRouter = createTRPCRouter({
  user: userRouter,
  sensor: sensorRouter
});

export type AppRouter = typeof appRouter; 