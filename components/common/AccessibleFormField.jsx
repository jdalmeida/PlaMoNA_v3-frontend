import { Box, TextField, FormHelperText, FormControl, InputLabel, Select } from '@mui/material';
import React from 'react';

const AccessibleFormField = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  placeholder,
  maxLength,
  minLength,
  pattern,
  ariaLabel,
  ariaDescribedBy,
  ariaRequired,
  ...props
}) => {
  const fieldId = `${name}-field`;
  const errorId = `${name}-error`;
  const helperId = `${name}-helper`;

  const ariaProps = {
    'aria-label': ariaLabel || label,
    'aria-describedby': error ? errorId : helperText ? helperId : ariaDescribedBy,
    'aria-required': ariaRequired || required,
    'aria-invalid': !!error
  };

  if (type === 'select') {
    return (
      <FormControl
        fullWidth
        error={!!error}
        disabled={disabled}
        required={required}
        sx={{ mb: 2 }}
      >
        <InputLabel id={`${fieldId}-label`}>{label}</InputLabel>
        <Select
          labelId={`${fieldId}-label`}
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          label={label}
          {...ariaProps}
          {...props}
        >
          {props.children}
        </Select>
        {error && (
          <FormHelperText id={errorId} error>
            {error}
          </FormHelperText>
        )}
        {helperText && !error && (
          <FormHelperText id={helperId}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        type={type}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={!!error}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        inputProps={{
          maxLength,
          minLength,
          pattern,
          ...ariaProps
        }}
        fullWidth
        {...props}
      />
      {error && (
        <FormHelperText id={errorId} error>
          {error}
        </FormHelperText>
      )}
      {helperText && !error && (
        <FormHelperText id={helperId}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default AccessibleFormField; 