import { Box, Typography, CircularProgress } from '@mui/material';
import React from 'react';

import { tokens } from '@/app/theme';
import { useGetClima } from '@/hooks/useTRPC';

const findIconByCode = (code, isDay) => {
  const iconMap = {
    1000: isDay ? '☀️' : '🌙', // Clear
    1003: isDay ? '⛅' : '☁️', // Partly cloudy
    1006: '☁️', // Cloudy
    1009: '☁️', // Overcast
    1030: '🌫️', // Mist
    1063: '🌦️', // Patchy rain
    1066: '🌨️', // Patchy snow
    1069: '🌨️', // Patchy sleet
    1087: '⛈️', // Thundery outbreaks
    1114: '🌨️', // Blowing snow
    1117: '❄️', // Blizzard
    1135: '🌫️', // Fog
    1147: '🌫️', // Freezing fog
    1150: '🌦️', // Patchy light drizzle
    1153: '🌦️', // Light drizzle
    1168: '🌧️', // Freezing drizzle
    1171: '🌧️', // Heavy freezing drizzle
    1180: '🌦️', // Slight rain showers
    1183: '🌧️', // Light rain
    1186: '🌧️', // Moderate rain at times
    1189: '🌧️', // Moderate rain
    1192: '🌧️', // Moderate or heavy rain shower
    1195: '🌧️', // Heavy rain
    1198: '🌧️', // Light freezing rain
    1201: '🌧️', // Moderate or heavy freezing rain
    1204: '🌨️', // Light sleet
    1207: '🌨️', // Moderate or heavy sleet
    1210: '🌨️', // Patchy light snow
    1213: '🌨️', // Light snow
    1216: '🌨️', // Patchy moderate snow
    1219: '🌨️', // Moderate snow
    1222: '❄️', // Patchy heavy snow
    1225: '❄️', // Heavy snow
    1237: '🧊', // Ice pellets
    1240: '🌦️', // Light rain shower
    1243: '🌧️', // Moderate or heavy rain shower
    1246: '🌧️', // Torrential rain shower
    1249: '🌨️', // Light sleet showers
    1252: '🌨️', // Moderate or heavy sleet showers
    1255: '🌨️', // Light snow showers
    1258: '🌨️', // Moderate or heavy snow showers
    1261: '🧊', // Light showers of ice pellets
    1264: '🧊', // Moderate or heavy showers of ice pellets
    1273: '⛈️', // Patchy light rain with thunder
    1276: '⛈️' // Moderate or heavy rain with thunder
  };
  return iconMap[code] || '🌤️';
};

const WeatherDisplay = () => {
  const { data: weatherData, isLoading: loading } = useGetClima();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
          backgroundColor: tokens.background.paper,
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!weatherData?.data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
          backgroundColor: tokens.background.paper,
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant='body1' color={tokens.text.secondary}>
          Dados do clima não disponíveis
        </Typography>
      </Box>
    );
  }

  const current = weatherData.data;
  const location = { name: 'Venâncio Aires', region: 'RS', country: 'Brasil' };

  return (
    <Box
      sx={{
        backgroundColor: tokens.background.paper,
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: `1px solid ${tokens.grey[200]}`,
        maxWidth: '400px',
        margin: '0 auto'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: `1px solid ${tokens.grey[200]}`
        }}
      >
        <Box>
          <Typography variant='h6' color={tokens.text.primary} sx={{ fontWeight: 600 }}>
            {location.name}
          </Typography>
          <Typography variant='body2' color={tokens.text.secondary}>
            {location.region}, {location.country}
          </Typography>
        </Box>
        <Typography
          variant='h3'
          sx={{
            fontSize: '3rem',
            color: tokens.primary[600],
            lineHeight: 1
          }}
        >
          {findIconByCode(current.condition.code, current.is_day === 1)}
        </Typography>
      </Box>

      {/* Current Weather */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}
      >
        <Box>
          <Typography variant='h4' color={tokens.text.primary} sx={{ fontWeight: 700 }}>
            {Math.round(current.temp_c)}°C
          </Typography>
          <Typography variant='body1' color={tokens.text.secondary}>
            {current.condition.text}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant='body2' color={tokens.text.secondary}>
            Sensação: {Math.round(current.feelslike_c)}°C
          </Typography>
          <Typography variant='body2' color={tokens.text.secondary}>
            Umidade: {current.humidity}%
          </Typography>
        </Box>
      </Box>

      {/* Weather Details */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          paddingTop: '16px',
          borderTop: `1px solid ${tokens.grey[200]}`
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='body2' color={tokens.text.secondary} sx={{ marginBottom: '4px' }}>
            Vento
          </Typography>
          <Typography variant='body1' color={tokens.text.primary} sx={{ fontWeight: 500 }}>
            {Math.round(current.wind_kph)} km/h
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='body2' color={tokens.text.secondary} sx={{ marginBottom: '4px' }}>
            Pressão
          </Typography>
          <Typography variant='body1' color={tokens.text.primary} sx={{ fontWeight: 500 }}>
            {current.pressure_mb} mb
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='body2' color={tokens.text.secondary} sx={{ marginBottom: '4px' }}>
            Visibilidade
          </Typography>
          <Typography variant='body1' color={tokens.text.primary} sx={{ fontWeight: 500 }}>
            {current.vis_km} km
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherDisplay;
