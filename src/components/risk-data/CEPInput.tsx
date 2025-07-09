
import React, { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useInputMask, cepMask } from '@/hooks/useInputMask';

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
  const cepInput = useInputMask(
    value,
    onChange,
    {
      mask: cepMask,
      placeholder: '00000-000',
      maxLength: 9
    },
    onBlur
  );

  const requiredLabel = isOptional ? '' : ' *';

  return (
    <div>
      <Label htmlFor="cep" className="text-sm font-medium jj-blue-dark">
        CEP de pernoite do veículo{requiredLabel}
      </Label>
      <div className="relative">
        <Input
          ref={cepInput.inputRef}
          id="cep"
          type="text"
          value={cepInput.value}
          onChange={cepInput.onChange}
          onBlur={cepInput.onBlur}
          className={`mt-1 ${error ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}
          placeholder={cepInput.placeholder}
          maxLength={cepInput.maxLength}
          autoComplete="postal-code"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
      <p className="text-xs text-muted-foreground mt-1">
        Local onde o veículo fica durante a noite
      </p>
    </div>
  );
});

CEPInput.displayName = 'CEPInput';

export default CEPInput;
