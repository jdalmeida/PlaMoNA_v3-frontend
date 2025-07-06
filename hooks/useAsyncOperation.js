import { useState, useCallback } from 'react';
import { useNotification } from './useNotification';

export const useAsyncOperation = () => {
    const [loading, setLoading] = useState(false);
    const { showSuccess, showError, showWarning } = useNotification();

    const executeOperation = useCallback(async (operation, successMessage = null, errorMessage = null) => {
        try {
            setLoading(true);
            const result = await operation();
            
            if (successMessage) {
                showSuccess(successMessage);
            }
            
            return result;
        } catch (error) {
            const message = errorMessage || error.message || 'Operação falhou';
            showError(message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [showSuccess, showError]);

    const executeWithWarning = useCallback(async (operation, warningMessage, successMessage = null, errorMessage = null) => {
        try {
            setLoading(true);
            const result = await operation();
            
            if (successMessage) {
                showSuccess(successMessage);
            }
            
            return result;
        } catch (error) {
            if (error.message === warningMessage) {
                showWarning(warningMessage);
            } else {
                const message = errorMessage || error.message || 'Operação falhou';
                showError(message);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    }, [showSuccess, showError, showWarning]);

    return {
        loading,
        setLoading,
        executeOperation,
        executeWithWarning
    };
}; 