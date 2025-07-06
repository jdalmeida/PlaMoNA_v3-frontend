import React from 'react';
import { Button } from '@mui/material';

const AccessibleButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  ariaLabel,
  ariaDescribedBy,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (!disabled && !loading && onClick) {
            onClick(event);
          }
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AccessibleButton; 