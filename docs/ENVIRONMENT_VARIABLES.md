# Variáveis de Ambiente

Este documento descreve as variáveis de ambiente necessárias para executar o projeto PlaMoNA v3.

## Configuração Inicial

1. Copie o arquivo `.env.example` para `.env.local`
2. Configure as variáveis obrigatórias
3. Reinicie o servidor de desenvolvimento

## Variáveis Obrigatórias

### Backend

- `NEXT_PUBLIC_BACKEND_URL`: URL do backend (ex: `http://127.0.0.1:4000`)

### API de Clima

- `NEXT_PUBLIC_WEATHER_API_KEY`: Chave da API WeatherAPI.com

## Variáveis Opcionais

### URLs por Ambiente

- `NEXT_PUBLIC_PRODUCTION_BACKEND_URL`: URL do backend em produção
- `NEXT_PUBLIC_STAGING_BACKEND_URL`: URL do backend em staging

### Analytics

- `NEXT_PUBLIC_ANALYTICS_ID`: ID do Google Analytics

### Debug

- `NEXT_PUBLIC_DEBUG_MODE`: Habilita modo debug (true/false)

## Exemplo de Configuração

```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:4000
NEXT_PUBLIC_WEATHER_API_KEY=sua_chave_api_aqui
NODE_ENV=development
NEXT_PUBLIC_DEBUG_MODE=true
```

## Validação

O sistema valida automaticamente as variáveis obrigatórias na inicialização. Se alguma variável estiver faltando, um erro será exibido no console (desenvolvimento) ou a aplicação falhará (produção).

## Ambientes Suportados

- **development**: Ambiente de desenvolvimento local
- **staging**: Ambiente de testes
- **production**: Ambiente de produção

## Segurança

⚠️ **Importante**: Nunca commite o arquivo `.env.local` no repositório. Ele contém informações sensíveis.
