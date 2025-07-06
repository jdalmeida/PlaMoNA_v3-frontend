import { initTRPC, TRPCError } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { verify } from 'jsonwebtoken';

import { prisma } from '@/server/db';

interface CreateContextOptions {
  session: any | null;
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma
  };
};

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const { req } = opts;

  // Extrair token do header Authorization
  const authHeader = req.headers.get('authorization');
  let session = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const decoded = verify(token, process.env.JWT_SECRET || 'fallback-secret');
      session = { user: decoded };
    } catch (error) {
      // Token inválido, mas não vamos falhar aqui
      console.warn('Token inválido:', error);
    }
  }

  return createInnerTRPCContext({
    session
  });
};

const trpc = initTRPC.context<typeof createTRPCContext>().create();

export const createTRPCRouter = trpc.router;
export const publicProcedure = trpc.procedure;

const enforceUserIsAuthed = trpc.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});

export const protectedProcedure = trpc.procedure.use(enforceUserIsAuthed);
