
import React, { forwardRef, useCallback, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface StableInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: boolean;
}

const StableInput = forwardRef<HTMLInputElement, StableInputProps>(
  ({ className, value, onChange, onBlur, error, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value);
    
    // Sync internal value with external value only when not focused
    useEffect(() => {
      const inputElement = ref && typeof ref === 'object' ? ref.current : null;
      if (document.activeElement !== inputElement) {
        setInternalValue(value);
      }
    }, [value, ref]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange(newValue);
    }, [onChange]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onBlur?.(newValue);
    }, [onBlur]);

    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

StableInput.displayName = "StableInput";

export { StableInput };
