
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RiskData {
  cep: string;
  garageType: string;
  residenceType: string;
  usesForWork: string;
  workParking: string;
  youngResidents: string;
  rideshareWork: string;
}

interface RiskDataSectionProps {
  data: RiskData;
  onChange: (field: keyof RiskData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
  isOptional?: boolean;
}

const RiskDataSection: React.FC<RiskDataSectionProps> = ({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur,
  isOptional = false
}) => {
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return value;
  };

  const handleCepChange = (value: string) => {
    const formatted = formatCEP(value);
    onChange('cep', formatted);
  };

  const RadioQuestion = ({ 
    title, 
    field, 
    options = [{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }] 
  }: { 
    title: string; 
    field: keyof RiskData; 
    options?: { value: string; label: string }[] 
  }) => (
    <div>
      <Label className="text-sm font-medium jj-blue-dark mb-3 block">
        {title}{isOptional ? '' : ' *'}
      </Label>
      <RadioGroup 
        value={data[field]} 
        onValueChange={(value) => onChange(field, value)}
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
      {errors[field] && (
        <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const requiredLabel = isOptional ? '' : ' *';

  return (
    <Card className="border-jj-cyan-border">
      <CardContent className="p-6 space-y-8">
        <div>
          <Label htmlFor="cep" className="text-sm font-medium jj-blue-dark">
            CEP de pernoite do veículo{requiredLabel}
          </Label>
          <Input
            id="cep"
            type="text"
            value={data.cep}
            onChange={(e) => handleCepChange(e.target.value)}
            onBlur={(e) => onFieldBlur('cep', e.target.value)}
            className={`mt-1 ${errors.cep ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}
            placeholder="00000-000"
            maxLength={9}
          />
          {errors.cep && (
            <p className="text-sm text-red-500 mt-1">{errors.cep}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Local onde o veículo fica durante a noite
          </p>
        </div>

        <RadioQuestion
          title="Na garagem, o portão é automático ou manual?"
          field="garageType"
          options={[
            { value: 'automatico', label: 'Automático' },
            { value: 'manual', label: 'Manual' }
          ]}
        />

        <RadioQuestion
          title="Reside em casa ou apto?"
          field="residenceType"
          options={[
            { value: 'casa', label: 'Casa' },
            { value: 'apto', label: 'Apartamento' }
          ]}
        />

        <div>
          <RadioQuestion
            title="Utiliza o veículo para ir ao trabalho?"
            field="usesForWork"
          />
          
          {data.usesForWork === 'sim' && (
            <div className="mt-6 ml-6 p-4 bg-accent rounded-lg border border-jj-cyan-border">
              <RadioQuestion
                title="Se sim, ele fica em estacionamento fechado e exclusivo?"
                field="workParking"
              />
            </div>
          )}
        </div>

        <RadioQuestion
          title="Reside com pessoas entre 18 a 24 anos?"
          field="youngResidents"
        />

        <RadioQuestion
          title="Utiliza o veículo para trabalhar em transporte de passageiros por App (Uber e similares)?"
          field="rideshareWork"
        />
      </CardContent>
    </Card>
  );
};

export default RiskDataSection;
