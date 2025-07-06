# TODO - PlaMoNA v3 Frontend

## 📋 Visão Geral do Projeto

O **PlaMoNA** (Plataforma de Monitoramento do Nível das Águas) é uma aplicação Next.js que monitora níveis de água em rios e córregos, fornecendo alertas à população sobre enchentes e inundações. O sistema inclui:

- **Monitoramento em tempo real** de níveis de água
- **Sistema de autenticação** de usuários
- **Alertas por email e SMS**
- **Gráficos interativos** de dados
- **Configuração de sensores**
- **Integração com API de clima**

---

## 🚨 Problemas Críticos (Alta Prioridade)

### 1. **Tratamento de Erros Inadequado**
- [ ] **Problema**: Uso excessivo de `console.log` e `alert()` para debug e feedback
- [ ] **Solução**: Implementar sistema de notificações toast (react-toastify)
- [ ] **Arquivos afetados**: `api/user.js`, `components/form*.jsx`

### 2. **Gerenciamento de Estado Inconsistente**
- [ ] **Problema**: Uso de `localStorage` para estado de usuário sem validação
- [ ] **Solução**: Implementar Context API ou Redux para gerenciamento de estado
- [ ] **Arquivos afetados**: `components/formLogin.jsx`, `components/formDadosUsuario.jsx`

### 3. **Validação de Formulários**
- [ ] **Problema**: Validações básicas com regex e alertas
- [ ] **Solução**: Implementar biblioteca de validação (react-hook-form + yup)
- [ ] **Arquivos afetados**: Todos os formulários

### 4. **Segurança**
- [ ] **Problema**: API key exposta no código (`climaapi.js`)
- [ ] **Solução**: Mover para variáveis de ambiente
- [ ] **Arquivos afetados**: `api/climaapi.js`

---

## ⚠️ Problemas Importantes (Média Prioridade)

### 5. **Performance e UX**
- [ ] **Problema**: Uso de `setTimeout` para operações assíncronas
- [ ] **Solução**: Implementar loading states e feedback visual adequado
- [ ] **Arquivos afetados**: Todos os formulários

### 6. **Responsividade**
- [ ] **Problema**: Layout pode quebrar em dispositivos móveis
- [ ] **Solução**: Melhorar breakpoints e layout responsivo
- [ ] **Arquivos afetados**: `components/Navbar.jsx`, páginas principais

### 7. **Código Duplicado**
- [ ] **Problema**: Lógica de validação repetida em múltiplos componentes
- [ ] **Solução**: Criar hooks customizados e utilitários
- [ ] **Arquivos afetados**: `components/form*.jsx`

### 8. **Configuração de API**
- [ ] **Problema**: URLs hardcoded para localhost
- [ ] **Solução**: Usar variáveis de ambiente para diferentes ambientes
- [ ] **Arquivos afetados**: `api/database.js`, `api/user.js`

---

## 🔧 Melhorias Técnicas (Baixa Prioridade)

### 9. **Estrutura de Código**
- [ ] **Problema**: Mistura de padrões de nomenclatura
- [ ] **Solução**: Padronizar nomenclatura (camelCase para funções, PascalCase para componentes)
- [ ] **Arquivos afetados**: Todo o projeto

### 10. **TypeScript**
- [ ] **Problema**: Projeto em JavaScript puro
- [ ] **Solução**: Migrar para TypeScript para melhor type safety
- [ ] **Arquivos afetados**: Todo o projeto

### 11. **Testes**
- [ ] **Problema**: Ausência de testes automatizados
- [ ] **Solução**: Implementar testes unitários e de integração
- [ ] **Arquivos afetados**: Todo o projeto

### 12. **Documentação**
- [ ] **Problema**: README genérico do Next.js
- [ ] **Solução**: Criar documentação específica do projeto
- [ ] **Arquivos afetados**: `README.md`

---

## 🎨 Melhorias de UI/UX

### 13. **Design System**
- [ ] **Problema**: Tema inconsistente entre componentes
- [ ] **Solução**: Criar design system consistente
- [ ] **Arquivos afetados**: `app/theme.js`, todos os componentes

### 14. **Acessibilidade**
- [ ] **Problema**: Falta de atributos de acessibilidade
- [ ] **Solução**: Implementar ARIA labels e navegação por teclado
- [ ] **Arquivos afetados**: Todos os componentes

### 15. **Feedback Visual**
- [ ] **Problema**: Falta de indicadores de loading e sucesso
- [ ] **Solução**: Implementar skeleton loaders e feedback visual
- [ ] **Arquivos afetados**: Todos os formulários

---

## 📊 Funcionalidades Futuras

### 16. **Recursos Avançados**
- [ ] **Dashboard administrativo** para gestão de sensores
- [ ] **Histórico de alertas** para usuários
- [ ] **Notificações push** em tempo real
- [ ] **Exportação de dados** em diferentes formatos
- [ ] **Múltiplos idiomas** (i18n)

### 17. **Integrações**
- [ ] **WebSocket** para atualizações em tempo real
- [ ] **PWA** para funcionamento offline
- [ ] **Integração com mapas** para visualização geográfica
- [ ] **API de previsão meteorológica** mais robusta

---

## 🛠️ Ferramentas Recomendadas

### Para implementar as melhorias:
- **Gerenciamento de estado**: Zustand ou Redux Toolkit
- **Validação**: React Hook Form + Yup
- **Notificações**: React Toastify
- **Testes**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **TypeScript**: Para type safety
- **Storybook**: Para documentação de componentes

---

## 📝 Notas de Implementação

### Prioridade de Implementação:
1. **Crítico**: Itens 1-4 (Segurança e UX básica)
2. **Importante**: Itens 5-8 (Performance e manutenibilidade)
3. **Melhoria**: Itens 9-15 (Qualidade de código e UX avançada)
4. **Futuro**: Itens 16-17 (Novas funcionalidades)

### Estimativa de Tempo:
- **Crítico**: 2-3 semanas
- **Importante**: 3-4 semanas
- **Melhoria**: 4-6 semanas
- **Futuro**: 8-12 semanas

---

*Última atualização: $(date)* 