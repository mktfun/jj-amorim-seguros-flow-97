
import React, { memo } from 'react';
import { StableFormField } from '@/components/ui/stable-form-field';
import { Loader2 } from 'lucide-react';

interface CEPInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
  error?: string;
  loading?: boolean;
  isOptional?: boolean;
}

const CEPInput: React.FC<CEPInputProps> = memo(({ 
  value, 
  onChange, 
  onBlur, 
  error, 
  loading = false,
  isOptional = false 
}) => {
  return (
    <div className="relative">
      <StableFormField
        id="cep"
        label="CEP de pernoite do veículo"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        placeholder="00000-000"
        mask="99999-999"
        required={!isOptional}
      />
      {loading && (
        <div className="absolute right-3 top-12 transform -translate-y-1/2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </div>
      )}
      <p className="text-xs text-muted-foreground mt-1">
        Local onde o veículo fica durante a noite
      </p>
    </div>
  );
});

CEPInput.displayName = 'CEPInput';

export default CEPInput;
