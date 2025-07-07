
import { useState } from 'react';

export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  customValidator?: (value: string) => boolean;
  message: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

// Função para validar CPF com lógica completa dos dígitos verificadores
export const validateCPF = (cpf: string): boolean => {
  // Remove pontos e traços
  const cleanCpf = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cleanCpf.length !== 11) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais (CPFs inválidos)
  if (/^(\d)\1{10}$/.test(cleanCpf)) {
    return false;
  }
  
  // Calcula o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;
  
  // Verifica o primeiro dígito verificador
  if (parseInt(cleanCpf.charAt(9)) !== firstDigit) {
    return false;
  }
  
  // Calcula o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;
  
  // Verifica o segundo dígito verificador
  return parseInt(cleanCpf.charAt(10)) === secondDigit;
};

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

    // Nova validação customizada para CPF
    if (rule.customValidator && value && !rule.customValidator(value)) {
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
      } else if (rule.customValidator && value && !rule.customValidator(value)) {
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
