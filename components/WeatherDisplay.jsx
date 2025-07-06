import { WbSunny, Opacity, Air, Visibility as VisibilityIcon } from '@mui/icons-material';
import { Box, Typography, CircularProgress, Grid, Paper } from '@mui/material';
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
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          gap: 2
        }}
      >
        <CircularProgress size={40} sx={{ color: tokens.primary[600] }} />
        <Typography variant='body2' color={tokens.text.secondary}>
          Carregando dados do clima...
        </Typography>
      </Box>
    );
  }

  if (!weatherData?.data) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          gap: 2,
          color: tokens.text.secondary
        }}
      >
        <WbSunny sx={{ fontSize: 48, opacity: 0.5 }} />
        <Typography variant='body1' sx={{ textAlign: 'center' }}>
          Dados do clima não disponíveis
        </Typography>
        <Typography variant='body2' sx={{ opacity: 0.7 }}>
          Tente novamente em alguns instantes
        </Typography>
      </Box>
    );
  }

  const current = weatherData.data;
  const location = { name: 'Venâncio Aires', region: 'RS', country: 'Brasil' };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Current Weather Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${tokens.primary[50]} 0%, ${tokens.primary[100]} 100%)`,
          border: `1px solid ${tokens.primary[200]}`,
          mb: 3
        }}
      >
        {/* Location and Icon */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3
          }}
        >
          <Box>
            <Typography variant='h6' sx={{ fontWeight: 600, color: tokens.text.primary, mb: 0.5 }}>
              {location.name}
            </Typography>
            <Typography variant='body2' color={tokens.text.secondary}>
              {location.region}, {location.country}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '3.5rem',
              lineHeight: 1,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}
          >
            {findIconByCode(current.condition.code, current.is_day === 1)}
          </Typography>
        </Box>

        {/* Temperature and Description */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography 
            variant='h2' 
            sx={{ 
              fontWeight: 700, 
              color: tokens.text.primary,
              fontSize: { xs: '2.5rem', sm: '3rem' },
              mb: 1
            }}
          >
            {Math.round(current.temp_c)}°C
          </Typography>
          <Typography 
            variant='h6' 
            sx={{ 
              color: tokens.text.secondary,
              fontWeight: 500,
              textTransform: 'capitalize'
            }}
          >
            {current.condition.text}
          </Typography>
        </Box>

        {/* Feels Like */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.5)'
          }}
        >
          <Typography variant='body2' color={tokens.text.secondary}>
            Sensação térmica:
          </Typography>
          <Typography variant='body1' sx={{ fontWeight: 600, color: tokens.text.primary }}>
            {Math.round(current.feelslike_c)}°C
          </Typography>
        </Box>
      </Paper>

      {/* Weather Details Grid */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.8)',
              border: `1px solid ${tokens.grey[200]}`,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <Opacity sx={{ fontSize: 32, color: tokens.primary[600], mb: 1 }} />
            <Typography variant='body2' color={tokens.text.secondary} sx={{ mb: 0.5 }}>
              Umidade
            </Typography>
            <Typography variant='h6' sx={{ fontWeight: 600, color: tokens.text.primary }}>
              {current.humidity}%
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.8)',
              border: `1px solid ${tokens.grey[200]}`,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <Air sx={{ fontSize: 32, color: tokens.secondary[600], mb: 1 }} />
            <Typography variant='body2' color={tokens.text.secondary} sx={{ mb: 0.5 }}>
              Vento
            </Typography>
            <Typography variant='h6' sx={{ fontWeight: 600, color: tokens.text.primary }}>
              {Math.round(current.wind_kph)} km/h
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.8)',
              border: `1px solid ${tokens.grey[200]}`,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <WbSunny sx={{ fontSize: 32, color: tokens.warning[600], mb: 1 }} />
            <Typography variant='body2' color={tokens.text.secondary} sx={{ mb: 0.5 }}>
              Pressão
            </Typography>
            <Typography variant='h6' sx={{ fontWeight: 600, color: tokens.text.primary }}>
              {current.pressure_mb} mb
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.8)',
              border: `1px solid ${tokens.grey[200]}`,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <VisibilityIcon sx={{ fontSize: 32, color: tokens.grey[600], mb: 1 }} />
            <Typography variant='body2' color={tokens.text.secondary} sx={{ mb: 0.5 }}>
              Visibilidade
            </Typography>
            <Typography variant='h6' sx={{ fontWeight: 600, color: tokens.text.primary }}>
              {current.vis_km} km
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeatherDisplay;
