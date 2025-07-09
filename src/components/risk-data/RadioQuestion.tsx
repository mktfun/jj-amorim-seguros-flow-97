
import React, { memo } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RadioQuestionProps {
  title: string;
  field: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isOptional?: boolean;
  options?: { value: string; label: string }[];
}

const RadioQuestion: React.FC<RadioQuestionProps> = memo(({ 
  title, 
  field, 
  value,
  onChange,
  error,
  isOptional = false,
  options = [{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }] 
}) => (
  <div>
    <Label className="text-sm font-medium jj-blue-dark mb-3 block">
      {title}{isOptional ? '' : ' *'}
    </Label>
    <RadioGroup 
      value={value} 
      onValueChange={onChange}
      className="flex space-x-6"
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem 
            value={option.value} 
            id={`${field}-${option.value}`}
            className="border-2 border-primary"
          />
          <Label 
            htmlFor={`${field}-${option.value}`} 
            className="cursor-pointer text-muted-foreground hover:jj-blue-dark"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
    {error && (
      <p className="text-sm text-red-500 mt-1">{error}</p>
    )}
  </div>
));

RadioQuestion.displayName = 'RadioQuestion';

export default RadioQuestion;
