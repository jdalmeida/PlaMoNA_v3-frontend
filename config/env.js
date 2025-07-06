// Configuração centralizada de variáveis de ambiente
export const config = {
    weather: {
        apiKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        baseUrl: 'https://api.weatherapi.com/v1'
    },
    backend: {
        url: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:4000'
    },
    app: {
        name: 'PlaMoNA',
        version: '3.0.0',
        environment: process.env.NODE_ENV || 'development'
    }
};

// Validação de configuração obrigatória
export function validateConfig() {
    const requiredVars = [
        { key: 'NEXT_PUBLIC_WEATHER_API_KEY', value: config.weather.apiKey },
        { key: 'NEXT_PUBLIC_BACKEND_URL', value: config.backend.url }
    ];

    const missing = requiredVars.filter(v => !v.value);
    
    if (missing.length > 0) {
        throw new Error(
            `Variáveis de ambiente obrigatórias não configuradas: ${missing.map(v => v.key).join(', ')}. ` +
            'Configure estas variáveis no arquivo .env.local'
        );
    }
} 