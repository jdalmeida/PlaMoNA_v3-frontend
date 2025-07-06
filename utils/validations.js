import * as yup from 'yup';

// Função para validar CPF
export const validateCPF = cpf => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  var result = true;
  [9, 10].forEach(function (j) {
    var soma = 0,
      r;
    cpf
      .split(/(?=)/)
      .splice(0, j)
      .forEach(function (e, i) {
        soma += parseInt(e) * (j + 2 - (i + 1));
      });
    r = soma % 11;
    r = r < 2 ? 0 : 11 - r;
    if (r != cpf.substring(j, j + 1)) result = false;
  });
  return result;
};

// Schema de validação para login
export const loginSchema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: yup.string().required('Senha é obrigatória').min(1, 'Senha é obrigatória')
});

// Schema de validação para cadastro
export const cadastroSchema = yup.object({
  nome: yup
    .string()
    .required('Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .test('cpf', 'CPF inválido', value => {
      if (!value) return false;
      return validateCPF(value);
    }),
  endereco: yup
    .string()
    .required('Endereço é obrigatório')
    .min(5, 'Endereço deve ter pelo menos 5 caracteres')
    .max(200, 'Endereço deve ter no máximo 200 caracteres'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  telefone: yup
    .string()
    .required('Telefone é obrigatório')
    .test('telefone', 'Telefone inválido', value => {
      if (!value) return false;
      const telefoneLimpo = value.replace(/\D/g, '');
      return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 11;
    }),
  senha: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
      'Senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um símbolo'
    ),
  confSenha: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('senha'), null], 'Senhas devem ser iguais'),
  alerta_email: yup.boolean(),
  alerta_sms: yup.boolean()
});

// Schema de validação para recuperação de senha
export const recuperacaoSchema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  confEmail: yup
    .string()
    .email('E-mail inválido')
    .required('Confirmação de e-mail é obrigatória')
    .oneOf([yup.ref('email'), null], 'E-mails devem ser iguais')
});

// Schema de validação para alteração de senha
export const alterarSenhaSchema = yup.object({
  codigo: yup
    .string()
    .required('Código de recuperação é obrigatório')
    .min(1, 'Código de recuperação é obrigatório'),
  senha: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
      'Senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um símbolo'
    ),
  confSenha: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('senha'), null], 'Senhas devem ser iguais')
});

// Schema de validação para dados do usuário
export const dadosUsuarioSchema = yup.object({
  nome: yup
    .string()
    .required('Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .test('cpf', 'CPF inválido', value => {
      if (!value) return false;
      return validateCPF(value);
    }),
  endereco: yup
    .string()
    .required('Endereço é obrigatório')
    .min(5, 'Endereço deve ter pelo menos 5 caracteres')
    .max(200, 'Endereço deve ter no máximo 200 caracteres'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  telefone: yup
    .string()
    .required('Telefone é obrigatório')
    .test('telefone', 'Telefone inválido', value => {
      if (!value) return false;
      const telefoneLimpo = value.replace(/\D/g, '');
      return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 11;
    }),
  alerta_email: yup.boolean(),
  alerta_sms: yup.boolean()
});

// Schema de validação para configuração de sensor
export const configuracaoSensorSchema = yup.object({
  codValue: yup.number().min(1, 'Selecione um sensor').required('Selecione um sensor'),
  descricao: yup
    .string()
    .required('Descrição é obrigatória')
    .min(3, 'Descrição deve ter pelo menos 3 caracteres')
    .max(200, 'Descrição deve ter no máximo 200 caracteres'),
  nvlMin: yup
    .number()
    .typeError('Nível mínimo deve ser um número')
    .min(0, 'Nível mínimo deve ser maior ou igual a 0'),
  nvlMax: yup
    .number()
    .typeError('Nível máximo deve ser um número')
    .min(0, 'Nível máximo deve ser maior ou igual a 0')
    .test('max-greater-than-min', 'Nível máximo deve ser maior que o mínimo', function (value) {
      const { nvlMin } = this.parent;
      if (value && nvlMin && value <= nvlMin) {
        return false;
      }
      return true;
    }),
  msgMin: yup
    .string()
    .required('Mensagem para nível mínimo é obrigatória')
    .min(5, 'Mensagem deve ter pelo menos 5 caracteres')
    .max(500, 'Mensagem deve ter no máximo 500 caracteres'),
  msgMax: yup
    .string()
    .required('Mensagem para nível máximo é obrigatória')
    .min(5, 'Mensagem deve ter pelo menos 5 caracteres')
    .max(500, 'Mensagem deve ter no máximo 500 caracteres')
});
