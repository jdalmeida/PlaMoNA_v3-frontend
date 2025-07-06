import { validateCPF, loginSchema, cadastroSchema } from '@/utils/validations';

describe('Validations', () => {
  describe('validateCPF', () => {
    it('should return true for valid CPF', () => {
      const validCPFs = ['123.456.789-09', '111.444.777-35', '12345678909'];

      validCPFs.forEach(cpf => {
        expect(validateCPF(cpf)).toBe(true);
      });
    });

    it('should return false for invalid CPF', () => {
      const invalidCPFs = [
        '123.456.789-10',
        '111.111.111-11',
        '000.000.000-00',
        '123',
        'abc.def.ghi-jk',
        ''
      ];

      invalidCPFs.forEach(cpf => {
        expect(validateCPF(cpf)).toBe(false);
      });
    });
  });

  describe('loginSchema', () => {
    it('should validate correct login data', async () => {
      const validData = {
        email: 'test@example.com',
        senha: 'Test123!'
      };

      await expect(loginSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should reject invalid email', async () => {
      const invalidData = {
        email: 'invalid-email',
        senha: 'Test123!'
      };

      await expect(loginSchema.validate(invalidData)).rejects.toThrow();
    });

    it('should reject short password', async () => {
      const invalidData = {
        email: 'test@example.com',
        senha: '123'
      };

      await expect(loginSchema.validate(invalidData)).rejects.toThrow();
    });
  });

  describe('cadastroSchema', () => {
    it('should validate correct registration data', async () => {
      const validData = {
        nome: 'João Silva',
        cpf: '123.456.789-09',
        endereco: 'Rua das Flores, 123',
        email: 'joao@example.com',
        telefone: '(11) 99999-9999',
        senha: 'Test123!',
        confirmarSenha: 'Test123!'
      };

      await expect(cadastroSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should reject mismatched passwords', async () => {
      const invalidData = {
        nome: 'João Silva',
        cpf: '123.456.789-09',
        endereco: 'Rua das Flores, 123',
        email: 'joao@example.com',
        telefone: '(11) 99999-9999',
        senha: 'Test123!',
        confirmarSenha: 'Different123!'
      };

      await expect(cadastroSchema.validate(invalidData)).rejects.toThrow();
    });
  });
});
