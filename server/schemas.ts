import { z } from 'zod';

// Schemas para usuários
export const registerUserSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(11, 'CPF deve ter pelo menos 11 dígitos'),
  endereco: z.string().optional(),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
  alertaSMS: z.string().optional(),
  alertaEmail: z.string().min(1, 'Alerta de email é obrigatório'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
});

export const loginUserSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Senha é obrigatória')
});

export const recuperarSenhaSchema = z.object({
  email: z.string().email('Email inválido')
});

export const novaSenhaSchema = z.object({
  codigo: z.string().min(1, 'Código é obrigatório'),
  novaSenha: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres')
});

// Schemas para sensores
export const configuracaoSensorSchema = z.object({
  idSensor: z.number().int().positive(),
  descricao: z.string().optional(),
  nvlMin: z.number().optional(),
  nvlMax: z.number().optional(),
  envMin: z.boolean().optional(),
  envMax: z.boolean().optional(),
  msgMin: z.string().optional(),
  msgMax: z.string().optional()
});

export const pesquisaSensoresSchema = z.object({
  idSensor: z.number().int().positive().optional()
});

// Schemas para validação de código
export const validateCodigoSchema = z.object({
  codigo: z.string().min(1, 'Código é obrigatório')
});

// Tipos derivados dos schemas
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type RecuperarSenhaInput = z.infer<typeof recuperarSenhaSchema>;
export type NovaSenhaInput = z.infer<typeof novaSenhaSchema>;
export type ConfiguracaoSensorInput = z.infer<typeof configuracaoSensorSchema>;
export type PesquisaSensoresInput = z.infer<typeof pesquisaSensoresSchema>;
export type ValidateCodigoInput = z.infer<typeof validateCodigoSchema>; 