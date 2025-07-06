# Padrões de Código - PlaMoNA v3

Este documento define os padrões de nomenclatura e convenções de código para o projeto PlaMoNA v3.

## 📝 Nomenclatura

### Componentes React
- **PascalCase** para componentes
- **camelCase** para props e variáveis
- **kebab-case** para classes CSS

```javascript
// ✅ Correto
export default function UserProfile({ userName, userEmail }) {
  const [isLoading, setIsLoading] = useState(false);
  
  return <div className="user-profile">...</div>;
}

// ❌ Incorreto
export default function userprofile({ user_name, user_email }) {
  const [loading, setLoading] = useState(false);
  
  return <div className="userProfile">...</div>;
}
```

### Funções
- **camelCase** para funções regulares
- **camelCase** para funções assíncronas
- **camelCase** para handlers de eventos

```javascript
// ✅ Correto
const handleUserLogin = async (userData) => {
  const result = await loginUser(userData);
  return result;
};

const fetchWeatherData = async () => {
  const data = await getWeatherData();
  return data;
};

// ❌ Incorreto
const HandleUserLogin = async (user_data) => {
  const result = await login_user(user_data);
  return result;
};
```

### Variáveis e Constantes
- **camelCase** para variáveis
- **UPPER_SNAKE_CASE** para constantes globais
- **camelCase** para constantes locais

```javascript
// ✅ Correto
const API_BASE_URL = 'https://api.plamona.com';
const MAX_RETRY_ATTEMPTS = 3;

const userName = 'João';
const userEmail = 'joao@example.com';
const isLoading = false;

// ❌ Incorreto
const api_base_url = 'https://api.plamona.com';
const UserName = 'João';
const user_email = 'joao@example.com';
```

### Arquivos e Pastas
- **kebab-case** para arquivos e pastas
- **PascalCase** para componentes React
- **camelCase** para utilitários

```
// ✅ Correto
components/
  user-profile.jsx
  weather-display.jsx
  FormField.jsx
  useNotification.js

utils/
  validations.js
  date-helpers.js

// ❌ Incorreto
components/
  userProfile.jsx
  WeatherDisplay.jsx
  form-field.jsx
```

## 🎨 Formatação

### Indentação
- 2 espaços para indentação
- Sem tabs

### Aspas
- Aspas simples para strings
- Aspas duplas para JSX

```javascript
// ✅ Correto
const message = 'Hello World';
const element = <div className="container">Hello</div>;

// ❌ Incorreto
const message = "Hello World";
const element = <div className='container'>Hello</div>;
```

### Ponto e vírgula
- Sempre usar ponto e vírgula no final das declarações

```javascript
// ✅ Correto
const name = 'João';
const age = 25;

// ❌ Incorreto
const name = 'João'
const age = 25
```

### Imports
- Ordenar imports por tipo
- Separar grupos com linha em branco

```javascript
// ✅ Correto
import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

import { useUser } from '@/contexts/UserContext';
import { useNotification } from '@/hooks/useNotification';

import { validateEmail } from '@/utils/validations';

// ❌ Incorreto
import { useNotification } from '@/hooks/useNotification';
import React, { useState, useEffect } from 'react';
import { validateEmail } from '@/utils/validations';
import { Box, Button } from '@mui/material';
```

## 🔧 Estrutura de Arquivos

### Componentes
```javascript
// 1. Imports
import React from 'react';
import { Box } from '@mui/material';

// 2. Imports locais
import { useUser } from '@/contexts/UserContext';

// 3. Componente
export default function ComponentName({ prop1, prop2 }) {
  // 4. Hooks
  const { user } = useUser();
  const [state, setState] = useState(initialValue);

  // 5. Funções auxiliares
  const handleClick = () => {
    // lógica
  };

  // 6. Effects
  useEffect(() => {
    // lógica
  }, [dependencies]);

  // 7. Render
  return (
    <Box>
      {/* JSX */}
    </Box>
  );
}
```

### Hooks Customizados
```javascript
// 1. Imports
import { useState, useCallback } from 'react';

// 2. Hook
export const useCustomHook = (initialValue) => {
  // 3. Estado
  const [value, setValue] = useState(initialValue);

  // 4. Funções
  const updateValue = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  // 5. Retorno
  return {
    value,
    updateValue
  };
};
```

## 🚨 Regras Importantes

### Não usar
- `console.log` (exceto para debug temporário)
- `alert()` ou `confirm()`
- `var` (usar `const` ou `let`)
- Underscores em nomes de variáveis
- Nomes de variáveis muito curtos (exceto em loops)

### Sempre usar
- `const` por padrão, `let` quando necessário
- Arrow functions para callbacks
- Template literals para strings complexas
- Destructuring quando possível

## 🛠️ Ferramentas

### ESLint
- Configurado para aplicar estas regras
- Executar: `npm run lint`

### Prettier
- Formatação automática
- Executar: `npm run format`

### Scripts disponíveis
```bash
npm run lint          # Verificar código
npm run lint:fix      # Corrigir problemas automaticamente
npm run format        # Formatar código
npm run format:check  # Verificar formatação
```

## 📋 Checklist

Antes de fazer commit, verificar:
- [ ] Código segue padrões de nomenclatura
- [ ] Formatação está correta
- [ ] Não há console.log ou alert
- [ ] Imports estão ordenados
- [ ] Componentes seguem estrutura padrão
- [ ] ESLint não mostra erros
- [ ] Prettier foi executado 