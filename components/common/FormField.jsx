import React from 'react';
import { Box, Input, FormHelperText, FormControlLabel, Checkbox } from '@mui/material';

export const FormField = ({ 
    label, 
    name, 
    register, 
    error, 
    type = 'text', 
    placeholder = '', 
    maxLength = null,
    multiline = false,
    rows = 1,
    ...props 
}) => {
    return (
        <Box sx={{
            padding: '.5em',
            margin: '1em',
            borderRadius: '2em',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }}>
            <label>
                {label}: <br/>
                <Input 
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    multiline={multiline}
                    rows={rows}
                    {...register(name)}
                    error={!!error}
                    {...props}
                />
                {error && (
                    <FormHelperText error>
                        {error.message}
                    </FormHelperText>
                )}
            </label>
        </Box>
    );
};

export const CheckboxField = ({ 
    label, 
    name, 
    register, 
    checked, 
    onChange,
    ...props 
}) => {
    return (
        <Box sx={{
            padding: '.5em',
            margin: '1em',
            borderRadius: '2em',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={onChange}
                        color="primary"
                        {...register(name)}
                        {...props}
                    />
                }
                label={label}
            />
        </Box>
    );
}; 