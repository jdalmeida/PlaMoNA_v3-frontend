import { initTRPC, TRPCError } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { prisma } from '@/server/db';
import { verify } from 'jsonwebtoken';

interface CreateContextOptions {
  session: any | null;
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
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
    session,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: {
    serialize: (object) => JSON.parse(JSON.stringify(object)),
    deserialize: (object) => object,
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed); 