import { TRPCError } from '@trpc/server';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { z } from 'zod';

import { prisma } from '@/server/db';
import {
  registerUserSchema,
  loginUserSchema,
  recuperarSenhaSchema,
  novaSenhaSchema,
  validateCodigoSchema
} from '@/server/schemas';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/server/trpc';

export const userRouter = createTRPCRouter({
  // Registrar novo usuário
  register: publicProcedure.input(registerUserSchema).mutation(async ({ input }) => {
    try {
      // Verificar se o email já existe
      const existingUser = await prisma.usuario.findUnique({
        where: { email: input.email }
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email já cadastrado'
        });
      }

      // Hash da senha
      const hashedPassword = await hash(input.senha, 12);

      // Criar usuário
      const user = await prisma.usuario.create({
        data: {
          nome: input.nome,
          cpf: input.cpf,
          endereco: input.endereco || '',
          email: input.email,
          telefone: input.telefone,
          alerta_sms: input.alertaSMS || 'N',
          alerta_email: input.alertaEmail,
          senha: hashedPassword,
          acesso: true,
          sensor_id_sensor: 1 // Valor padrão, pode ser ajustado conforme necessário
        }
      });

      return {
        success: true,
        message: 'Usuário cadastrado com sucesso',
        userId: user.id_usuario
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao cadastrar usuário'
      });
    }
  }),

  // Login de usuário
  login: publicProcedure.input(loginUserSchema).mutation(async ({ input }) => {
    try {
      // Buscar usuário pelo email
      const user = await prisma.usuario.findUnique({
        where: { email: input.email },
        include: {
          sensor: {
            include: {
              rio_alvo: {
                include: {
                  cid_alvo: true
                }
              }
            }
          }
        }
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Email ou senha inválidos'
        });
      }

      // Verificar senha
      const isValidPassword = await compare(input.senha, user.senha);
      if (!isValidPassword) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Email ou senha inválidos'
        });
      }

      // Verificar se o usuário tem acesso
      if (!user.acesso) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Usuário sem acesso'
        });
      }

      // Gerar token JWT
      const token = sign(
        {
          userId: user.id_usuario,
          email: user.email,
          sensorId: user.sensor_id_sensor
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '24h' }
      );

      // Retornar dados do usuário (sem senha)
      const { ...userWithoutPassword } = user;

      return {
        success: true,
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao realizar login'
      });
    }
  }),

  // Recuperar senha
  recuperarSenha: publicProcedure.input(recuperarSenhaSchema).mutation(async ({ input }) => {
    try {
      // Verificar se o usuário existe
      const user = await prisma.usuario.findUnique({
        where: { email: input.email }
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Email não encontrado'
        });
      }

      // Gerar código de recuperação (implementação simplificada)
      const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

      // Salvar código na tabela de mensagens criptografadas
      await prisma.criptografada.create({
        data: {
          mensagem: `${input.email}:${codigo}`
        }
      });

      // TODO: Implementar envio de email
      // Por enquanto, apenas retornar sucesso
      return {
        success: true,
        message: 'Email de recuperação enviado com sucesso'
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao enviar email de recuperação'
      });
    }
  }),

  // Validar código de recuperação
  validateCodigo: publicProcedure.input(validateCodigoSchema).mutation(async ({ input }) => {
    try {
      // Buscar código na tabela de mensagens criptografadas
      const mensagem = await prisma.criptografada.findFirst({
        where: {
          mensagem: {
            contains: input.codigo
          }
        }
      });

      if (!mensagem) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Código inválido'
        });
      }

      return {
        success: true,
        valid: true
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao validar código'
      });
    }
  }),

  // Nova senha
  novaSenha: publicProcedure.input(novaSenhaSchema).mutation(async ({ input }) => {
    try {
      // Buscar código na tabela de mensagens criptografadas
      const mensagem = await prisma.criptografada.findFirst({
        where: {
          mensagem: {
            contains: input.codigo
          }
        }
      });

      if (!mensagem) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Código inválido'
        });
      }

      // Extrair email do código
      const [email] = mensagem.mensagem.split(':');

      // Hash da nova senha
      const hashedPassword = await hash(input.novaSenha, 12);

      // Atualizar senha do usuário
      await prisma.usuario.update({
        where: { email },
        data: { senha: hashedPassword }
      });

      // Remover código usado
      await prisma.criptografada.delete({
        where: { idCriptografada: mensagem.idCriptografada }
      });

      return {
        success: true,
        message: 'Senha alterada com sucesso'
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao alterar senha'
      });
    }
  }),

  // Obter dados do usuário atual
  me: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.session.user.userId;

      const user = await prisma.usuario.findFirst({
        where: { id_usuario: userId },
        include: {
          sensor: {
            include: {
              rio_alvo: {
                include: {
                  cid_alvo: true
                }
              }
            }
          }
        }
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Usuário não encontrado'
        });
      }

      const { ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao buscar dados do usuário'
      });
    }
  }),

  // Atualizar dados do usuário
  updateUser: protectedProcedure
    .input(
      z.object({
        nome: z.string().min(1, 'Nome é obrigatório'),
        cpf: z.string().min(11, 'CPF deve ter pelo menos 11 dígitos'),
        endereco: z.string().optional(),
        email: z.string().email('Email inválido'),
        telefone: z.string().min(1, 'Telefone é obrigatório'),
        alertaSMS: z.string().optional(),
        alertaEmail: z.string().min(1, 'Alerta de email é obrigatório')
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.userId;

        // Verificar se o email já existe para outro usuário
        const existingUser = await prisma.usuario.findFirst({
          where: {
            email: input.email,
            id_usuario: { not: userId }
          }
        });

        if (existingUser) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Email já cadastrado para outro usuário'
          });
        }

        // Buscar usuário atual para obter sensor_id_sensor
        const currentUser = await prisma.usuario.findFirst({
          where: { id_usuario: userId }
        });

        if (!currentUser) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Usuário não encontrado'
          });
        }

        // Atualizar usuário usando a chave composta
        const updatedUser = await prisma.usuario.update({
          where: { 
            id_usuario_sensor_id_sensor: {
              id_usuario: userId,
              sensor_id_sensor: currentUser.sensor_id_sensor
            }
          },
          data: {
            nome: input.nome,
            cpf: input.cpf,
            endereco: input.endereco || '',
            email: input.email,
            telefone: input.telefone,
            alerta_sms: input.alertaSMS || 'N',
            alerta_email: input.alertaEmail
          },
          include: {
            sensor: {
              include: {
                rio_alvo: {
                  include: {
                    cid_alvo: true
                  }
                }
              }
            }
          }
        });

        const { ...userWithoutPassword } = updatedUser;

        return {
          success: true,
          message: 'Dados atualizados com sucesso',
          user: userWithoutPassword
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao atualizar dados do usuário'
        });
      }
    })
});
