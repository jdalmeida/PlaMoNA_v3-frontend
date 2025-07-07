import { 
  CheckCircle, 
  Warning, 
  Error, 
  Info
} from '@mui/icons-material';
import { 
  Box, 
  Chip, 
  Typography, 
  Tooltip,
  Fade
} from '@mui/material';
import { useState, useEffect } from 'react';

import { tokens } from '@/app/theme';

const SystemStatus = () => {
  const [status, setStatus] = useState({
    sensor: 'online',
    database: 'online',
    alerts: 0,
    lastUpdate: new Date()
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simular dados de status do sistema
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        lastUpdate: new Date(),
        alerts: Math.floor(Math.random() * 5)
      }));
    }, 30000); // Atualizar a cada 30 segundos

    // Mostrar componente após 1 segundo
    const timer = setTimeout(() => setIsVisible(true), 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const getStatusIcon = (type) => {
    switch (type) {
      case 'online':
        return <CheckCircle sx={{ fontSize: 16, color: tokens.success[600] }} />;
      case 'warning':
        return <Warning sx={{ fontSize: 16, color: tokens.warning[600] }} />;
      case 'error':
        return <Error sx={{ fontSize: 16, color: tokens.error[600] }} />;
      default:
        return <Info sx={{ fontSize: 16, color: tokens.primary[600] }} />;
    }
  };

  const getStatusColor = (type) => {
    switch (type) {
      case 'online':
        return tokens.success[600];
      case 'warning':
        return tokens.warning[600];
      case 'error':
        return tokens.error[600];
      default:
        return tokens.primary[600];
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isVisible) return null;

  return (
    <Fade in={isVisible} timeout={800}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1,
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          border: `1px solid ${tokens.grey[200]}`,
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Status do Sensor */}
        <Tooltip title="Status do sensor" arrow>
          <Chip
            icon={getStatusIcon(status.sensor)}
            label="Sensor"
            size="small"
            sx={{
              backgroundColor: `${getStatusColor(status.sensor)}10`,
              color: getStatusColor(status.sensor),
              border: `1px solid ${getStatusColor(status.sensor)}30`,
              fontWeight: 500,
              '& .MuiChip-icon': {
                color: getStatusColor(status.sensor)
              }
            }}
          />
        </Tooltip>

        {/* Status do Banco de Dados */}
        <Tooltip title="Status do banco de dados" arrow>
          <Chip
            icon={getStatusIcon(status.database)}
            label="DB"
            size="small"
            sx={{
              backgroundColor: `${getStatusColor(status.database)}10`,
              color: getStatusColor(status.database),
              border: `1px solid ${getStatusColor(status.database)}30`,
              fontWeight: 500,
              '& .MuiChip-icon': {
                color: getStatusColor(status.database)
              }
            }}
          />
        </Tooltip>

        {/* Alertas Ativos */}
        {status.alerts > 0 && (
          <Tooltip title={`${status.alerts} alerta(s) ativo(s)`} arrow>
            <Chip
              icon={<Warning sx={{ fontSize: 16 }} />}
              label={status.alerts}
              size="small"
              color="warning"
              sx={{
                fontWeight: 600,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: '0 0 0 0 rgba(255, 193, 7, 0.7)'
                  },
                  '70%': {
                    boxShadow: '0 0 0 10px rgba(255, 193, 7, 0)'
                  },
                  '100%': {
                    boxShadow: '0 0 0 0 rgba(255, 193, 7, 0)'
                  }
                }
              }}
            />
          </Tooltip>
        )}

        {/* Última Atualização */}
        <Tooltip title="Última atualização" arrow>
          <Typography
            variant="caption"
            sx={{
              color: tokens.text.secondary,
              fontWeight: 500,
              fontSize: '0.7rem'
            }}
          >
            {formatTime(status.lastUpdate)}
          </Typography>
        </Tooltip>
      </Box>
    </Fade>
  );
};

export default SystemStatus; 