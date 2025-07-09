
import React, { memo, useCallback } from 'react';
import InputMask from 'react-input-mask';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const requiredLabel = isOptional ? '' : ' *';

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e.target.value);
  }, [onBlur]);

  return (
    <div>
      <Label htmlFor="cep" className="text-sm font-medium jj-blue-dark">
        CEP de pernoite do veículo{requiredLabel}
      </Label>
      <div className="relative">
        <InputMask
          mask="99999-999"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          maskChar={null}
          alwaysShowMask={false}
        >
          {(inputProps: any) => (
            <input
              {...inputProps}
              id="cep"
              type="text"
              className={cn(
                "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1",
                error ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'
              )}
              placeholder="00000-000"
              autoComplete="postal-code"
            />
          )}
        </InputMask>
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
