# TODO - Migração para tRPC

## ✅ Concluído
- [x] Análise da estrutura atual do projeto
- [x] Identificação das dependências necessárias
- [x] Instalação das dependências do tRPC
- [x] Configuração do servidor tRPC
- [x] Criação dos routers para usuários
- [x] Criação dos routers para sensores
- [x] Criação dos routers para medições
- [x] Criação dos routers para clima
- [x] Configuração do cliente tRPC
- [x] Migração das funções de API existentes
- [x] Criação de hooks customizados para tRPC
- [x] Migração do componente de login
- [x] Migração do componente de cadastro

## 🔄 Em Progresso
- [ ] Migração dos demais componentes
- [ ] Atualização dos hooks customizados existentes
- [ ] Testes das funcionalidades

## 📋 Pendente
- [ ] Migração do sistema de autenticação
- [ ] Migração das funções de recuperação de senha
- [ ] Migração das configurações de sensor
- [ ] Testes de integração
- [ ] Documentação das mudanças

## 🐛 Problemas Identificados
- Necessário manter compatibilidade com o schema existente do banco
- Migração gradual para não quebrar funcionalidades existentes

## 📝 Notas
- Manter o schema do banco de dados inalterado
- Usar Prisma Client para conexão direta com o banco
- Implementar validação de dados com Zod
- Manter a estrutura de autenticação existente 