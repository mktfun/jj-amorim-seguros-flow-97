
import React, { forwardRef, useCallback, useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { cn } from '@/lib/utils';

export interface StableMaskedInputProps {
  mask: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
}

const StableMaskedInput = forwardRef<HTMLInputElement, StableMaskedInputProps>(
  ({ mask, value, onChange, onBlur, error, placeholder, className, id }, ref) => {
    const [internalValue, setInternalValue] = useState(value);
    
    // Sync internal value with external value only when not focused
    useEffect(() => {
      if (document.activeElement !== ref && typeof ref === 'object' && ref?.current) {
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
      <InputMask
        mask={mask}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        maskChar={null}
        alwaysShowMask={false}
      >
        {(inputProps: any) => (
          <input
            {...inputProps}
            ref={ref}
            id={id}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            placeholder={placeholder}
          />
        )}
      </InputMask>
    );
  }
);

StableMaskedInput.displayName = "StableMaskedInput";

export { StableMaskedInput };
