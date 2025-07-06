import { renderHook } from '@testing-library/react';

import { useNotification } from '@/hooks/useNotification';

// Mock do react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn()
  }
}));

describe('useNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return notification functions', () => {
    const { result } = renderHook(() => useNotification());

    expect(result.current).toHaveProperty('showSuccess');
    expect(result.current).toHaveProperty('showError');
    expect(result.current).toHaveProperty('showWarning');
    expect(result.current).toHaveProperty('showInfo');
  });

  it('should call toast.success when showSuccess is called', () => {
    const { result } = renderHook(() => useNotification());
    const { toast } = require('react-toastify');

    result.current.showSuccess('Success message');

    expect(toast.success).toHaveBeenCalledWith('Success message');
  });

  it('should call toast.error when showError is called', () => {
    const { result } = renderHook(() => useNotification());
    const { toast } = require('react-toastify');

    result.current.showError('Error message');

    expect(toast.error).toHaveBeenCalledWith('Error message');
  });

  it('should call toast.warning when showWarning is called', () => {
    const { result } = renderHook(() => useNotification());
    const { toast } = require('react-toastify');

    result.current.showWarning('Warning message');

    expect(toast.warning).toHaveBeenCalledWith('Warning message');
  });

  it('should call toast.info when showInfo is called', () => {
    const { result } = renderHook(() => useNotification());
    const { toast } = require('react-toastify');

    result.current.showInfo('Info message');

    expect(toast.info).toHaveBeenCalledWith('Info message');
  });
}); 