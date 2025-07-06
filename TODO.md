# TODO - Migração para tRPC

## ✅ Concluído
- [x] Análise da estrutura atual do projeto
- [x] Identificação das dependências necessárias

## 🔄 Em Progresso
- [x] Instalação das dependências do tRPC
- [x] Configuração do servidor tRPC
- [x] Criação dos routers para usuários
- [x] Criação dos routers para sensores
- [ ] Criação dos routers para medições
- [ ] Migração das funções de API existentes
- [ ] Atualização dos componentes para usar tRPC
- [ ] Testes das funcionalidades

## 📋 Pendente
- [x] Configuração do cliente tRPC
- [ ] Migração do sistema de autenticação
- [ ] Migração das funções de recuperação de senha
- [ ] Migração das configurações de sensor
- [ ] Atualização dos hooks customizados
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