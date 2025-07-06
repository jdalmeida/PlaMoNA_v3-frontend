// Configuração centralizada de variáveis de ambiente
const getEnvironment = () => {
  return process.env.NODE_ENV || 'development';
};

const getBackendUrl = () => {
  // Prioridade: variável de ambiente > configuração baseada no ambiente > fallback
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }

  const env = getEnvironment();
  switch (env) {
  case 'production':
    return process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL || 'https://plamona-q3aj.onrender.com';
  case 'staging':
    return process.env.NEXT_PUBLIC_STAGING_BACKEND_URL || 'https://plamona-q3aj.onrender.com';
  case 'development':
  default:
    return 'https://plamona-q3aj.onrender.com';
  }
};

const getWeatherApiKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  if (!apiKey) {
    console.warn(
      'Weather API key não configurada. Configure NEXT_PUBLIC_WEATHER_API_KEY no arquivo .env.local'
    );
  }
  return apiKey;
};

export const config = {
  weather: {
    apiKey: getWeatherApiKey(),
    baseUrl: 'https://api.weatherapi.com/v1',
    defaultLocation: 'Venâncio',
    defaultLanguage: 'pt'
  },
  backend: {
    url: getBackendUrl(),
    timeout: 10000, // 10 segundos
    retries: 3
  },
  app: {
    name: 'PlaMoNA',
    version: '3.0.0',
    environment: getEnvironment(),
    isDevelopment: getEnvironment() === 'development',
    isProduction: getEnvironment() === 'production',
    isStaging: getEnvironment() === 'staging'
  },
  features: {
    enableNotifications: true,
    enableAnalytics: process.env.NODE_ENV === 'production',
    enableDebugMode: process.env.NODE_ENV === 'development'
  }
};

// Validação de configuração obrigatória
export const validateConfig = () => {
  const requiredVars = [
    { key: 'NEXT_PUBLIC_WEATHER_API_KEY', value: config.weather.apiKey },
    { key: 'NEXT_PUBLIC_BACKEND_URL', value: config.backend.url }
  ];

  const missing = requiredVars.filter(variable => !variable.value);

  if (missing.length > 0) {
    const errorMessage =
      `Variáveis de ambiente obrigatórias não configuradas: ${missing.map(variable => variable.key).join(', ')}. ` +
      'Configure estas variáveis no arquivo .env.local';

    if (config.app.isDevelopment) {
      console.error(errorMessage);
    } else {
      throw new Error(errorMessage);
    }
  }
};

// Função para debug da configuração (apenas em desenvolvimento)
export const debugConfig = () => {
  if (config.app.isDevelopment) {
    // eslint-disable-next-line no-console
    console.log('🔧 Configuração atual:', {
      environment: config.app.environment,
      backendUrl: config.backend.url,
      weatherApiConfigured: !!config.weather.apiKey,
      features: config.features
    });
  }
};
