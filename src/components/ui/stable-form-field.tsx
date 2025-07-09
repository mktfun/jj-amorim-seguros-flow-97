
import React, { memo } from 'react';
import { Label } from '@/components/ui/label';
import { StableInput } from './stable-input';
import { StableMaskedInput } from './stable-masked-input';

interface StableFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: string;
  placeholder?: string;
  mask?: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
  className?: string;
}

const StableFormField = memo<StableFormFieldProps>(({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  mask,
  required,
  type = 'text',
  maxLength,
  className
}) => {
  return (
    <div className={className}>
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 mb-2 block">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {mask ? (
        <StableMaskedInput
          id={id}
          mask={mask}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          placeholder={placeholder}
        />
      ) : (
        <StableInput
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
      
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
          {error}
        </p>
      )}
    </div>
  );
});

StableFormField.displayName = 'StableFormField';

export { StableFormField };
