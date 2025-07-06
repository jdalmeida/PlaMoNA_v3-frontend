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
- [x] Migração do componente de recuperação de senha
- [x] Migração do componente de validação de código
- [x] Migração do componente de configuração de sensor
- [x] Migração do componente WeatherDisplay
- [x] Migração do componente GraficoComp

## 🔄 Em Progresso
- [ ] Migração dos demais componentes de gráficos
- [ ] Migração do componente de dados do usuário
- [ ] Atualização do UserContext
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