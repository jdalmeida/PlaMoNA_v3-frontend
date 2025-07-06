import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const useFormValidation = (schema, defaultValues = {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
    getValues
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues
  });

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    reset,
    setValue,
    watch,
    getValues
  };
};
