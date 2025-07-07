import { useState } from 'react';

export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  message: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (name: string, value: string): boolean => {
    const rule = rules[name];
    if (!rule) return true;

    if (rule.required && (!value || value.trim() === '')) {
      setErrors(prev => ({ ...prev, [name]: rule.message }));
      return false;
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      setErrors(prev => ({ ...prev, [name]: rule.message }));
      return false;
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  };

  const validateAll = (data: { [key: string]: string }): boolean => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    Object.keys(rules).forEach(fieldName => {
      const rule = rules[fieldName];
      const value = data[fieldName] || '';

      if (rule.required && (!value || value.trim() === '')) {
        newErrors[fieldName] = rule.message;
        isValid = false;
      } else if (rule.pattern && value && !rule.pattern.test(value)) {
        newErrors[fieldName] = rule.message;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const clearError = (name: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validate,
    validateAll,
    clearError,
    clearAllErrors
  };
};

export const validationPatterns = {
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  plate: /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/,
  cep: /^\d{5}-?\d{3}$/
};
