import { ZoomIn, ZoomOut, RestartAlt } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { useAccessibility } from '@/hooks/useAccessibility';

const AccessibilityControls = () => {
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    announceToScreenReader
  } = useAccessibility();

  const handleIncreaseFont = () => {
    increaseFontSize();
    announceToScreenReader('Tamanho da fonte aumentado');
  };

  const handleDecreaseFont = () => {
    decreaseFontSize();
    announceToScreenReader('Tamanho da fonte diminuído');
  };

  const handleResetFont = () => {
    resetFontSize();
    announceToScreenReader('Tamanho da fonte redefinido');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: 'background.paper',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        border: '1px solid',
        borderColor: 'divider'
      }}
      role="toolbar"
      aria-label="Controles de acessibilidade"
    >
      <Typography variant="caption" sx={{ fontWeight: 600, textAlign: 'center' }}>
        Acessibilidade
      </Typography>
      
      <Box sx={{ display: 'flex', gap: '4px' }}>
        <Tooltip title="Diminuir fonte" placement="top">
          <IconButton
            size="small"
            onClick={handleDecreaseFont}
            aria-label="Diminuir tamanho da fonte"
            disabled={fontSize === 'small'}
          >
            <ZoomOut fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Aumentar fonte" placement="top">
          <IconButton
            size="small"
            onClick={handleIncreaseFont}
            aria-label="Aumentar tamanho da fonte"
            disabled={fontSize === 'x-large'}
          >
            <ZoomIn fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Redefinir fonte" placement="top">
          <IconButton
            size="small"
            onClick={handleResetFont}
            aria-label="Redefinir tamanho da fonte"
            disabled={fontSize === 'medium'}
          >
            <RestartAlt fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Typography variant="caption" sx={{ textAlign: 'center', color: 'text.secondary' }}>
        {fontSize === 'small' && 'Pequeno'}
        {fontSize === 'medium' && 'Médio'}
        {fontSize === 'large' && 'Grande'}
        {fontSize === 'x-large' && 'Muito grande'}
      </Typography>
    </Box>
  );
};

export default AccessibilityControls; 