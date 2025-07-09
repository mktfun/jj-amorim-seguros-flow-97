
import { useCallback, useRef } from 'react';

interface MaskOptions {
  mask: (value: string) => string;
  placeholder?: string;
  maxLength?: number;
}

interface UseInputMaskReturn {
  inputRef: React.RefObject<HTMLInputElement>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
}

export const useInputMask = (
  value: string,
  onValueChange: (value: string) => void,
  options: MaskOptions,
  onBlur?: (value: string) => void
): UseInputMaskReturn => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPos = input.selectionStart || 0;
    const rawValue = e.target.value;
    
    // Apply mask
    const maskedValue = options.mask(rawValue);
    
    // Calculate new cursor position
    const oldLength = value.length;
    const newLength = maskedValue.length;
    const lengthDiff = newLength - oldLength;
    let newCursorPos = cursorPos + lengthDiff;
    
    // Ensure cursor position is within bounds
    newCursorPos = Math.max(0, Math.min(newCursorPos, maskedValue.length));
    
    // Update value
    onValueChange(maskedValue);
    
    // Restore cursor position after React re-render
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  }, [value, onValueChange, options.mask]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e.target.value);
    }
  }, [onBlur]);

  return {
    inputRef,
    value,
    onChange: handleChange,
    onBlur: onBlur ? handleBlur : undefined,
    placeholder: options.placeholder,
    maxLength: options.maxLength,
  };
};

// Mask functions
export const cepMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 8) {
    if (numbers.length > 5) {
      return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
    }
    return numbers;
  }
  return value;
};

export const cpfMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return value;
};

export const phoneMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  }
  return value;
};

export const dateMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 8) {
    return numbers.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  }
  return value;
};

export const plateMask = (value: string): string => {
  const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (cleaned.length <= 7) {
    if (cleaned.length === 7) {
      if (/^[A-Z]{3}[\dA-Z]\d{2}$/.test(cleaned)) {
        // New format ABC1D23
        return cleaned.replace(/^([A-Z]{3})(\d)([A-Z])(\d{2})$/, '$1$2$3$4');
      } else {
        // Old format ABC1234
        return cleaned.replace(/^([A-Z]{3})(\d{4})$/, '$1-$2');
      }
    }
    return cleaned;
  }
  return value;
};
