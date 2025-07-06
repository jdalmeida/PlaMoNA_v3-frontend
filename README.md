# PlaMoNA v3 - Frontend

**Plataforma de Monitoramento do Nível das Águas**

Sistema de monitoramento em tempo real de níveis de água em rios e córregos, fornecendo alertas à população sobre enchentes e inundações.

## 🚀 Funcionalidades

- **Monitoramento em tempo real** de níveis de água
- **Sistema de autenticação** completo (login, cadastro, recuperação de senha)
- **Alertas por email e SMS** para população sobre enchentes
- **Gráficos interativos** usando Nivo para visualização de dados
- **Configuração de sensores** remotos
- **Integração com API de clima** (WeatherAPI)
- **Interface responsiva** com Material-UI e Tailwind CSS

## 🛠️ Tecnologias

- **Next.js 13** - Framework React
- **Material-UI** - Componentes de UI
- **Tailwind CSS** - Estilização
- **Nivo** - Gráficos interativos
- **Axios** - Requisições HTTP
- **React Animated Weather** - Animações de clima

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend PlaMoNA rodando na porta 4000

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd PlaMoNA_v3-frontend
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Keys
NEXT_PUBLIC_WEATHER_API_KEY=sua_chave_api_weather_aqui

# Backend URLs
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:4000

# Environment
NODE_ENV=development
```

**⚠️ Importante:**

- Obtenha sua API key gratuita em [WeatherAPI.com](https://www.weatherapi.com/)
- Nunca commite o arquivo `.env.local` no repositório
- O arquivo `.env.local` já está no `.gitignore`

### 4. Execute o projeto

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
PlaMoNA_v3-frontend/
├── api/                    # APIs e configurações
│   ├── climaapi.js        # API de clima
│   ├── database.js        # API de dados
│   └── user.js           # API de usuários
├── app/                   # Páginas Next.js 13
│   ├── login/            # Página de login
│   ├── cadastro/         # Página de cadastro
│   ├── monitoramento/    # Página de monitoramento
│   └── ...
├── components/           # Componentes React
│   ├── Navbar.jsx       # Navegação
│   ├── Grafico.jsx      # Gráficos
│   └── ...
├── config/              # Configurações
│   └── env.js          # Variáveis de ambiente
└── public/             # Arquivos estáticos
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linter

## 🚨 Problemas Conhecidos

Veja o arquivo [Todo.md](./Todo.md) para uma lista completa de melhorias planejadas.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato com a equipe de desenvolvimento do PlaMoNA.

---

**Desenvolvido com ❤️ pela equipe PlaMoNA**
