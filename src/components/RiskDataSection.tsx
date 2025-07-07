import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, MapPin } from 'lucide-react';
import { useViaCEP } from '@/hooks/useViaCEP';

interface RiskData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
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
  const { fetchAddress, loading, error: cepError, clearError } = useViaCEP();

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
    clearError();
  };

  const handleCepBlur = async (value: string) => {
    onFieldBlur('cep', value);
    
    // Only fetch address if CEP is complete (8 digits)
    const cleanCep = value.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      const addressData = await fetchAddress(cleanCep);
      if (addressData) {
        onChange('logradouro', addressData.logradouro);
        onChange('bairro', addressData.bairro);
        onChange('localidade', addressData.localidade);
        onChange('uf', addressData.uf);
      } else {
        // Clear address fields if CEP is invalid
        onChange('logradouro', '');
        onChange('bairro', '');
        onChange('localidade', '');
        onChange('uf', '');
      }
    }
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
          <div className="relative">
            <Input
              id="cep"
              type="text"
              value={data.cep}
              onChange={(e) => handleCepChange(e.target.value)}
              onBlur={(e) => handleCepBlur(e.target.value)}
              className={`mt-1 ${(errors.cep || cepError) ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}
              placeholder="00000-000"
              maxLength={9}
            />
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              </div>
            )}
          </div>
          {(errors.cep || cepError) && (
            <p className="text-sm text-red-500 mt-1">{errors.cep || cepError}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Local onde o veículo fica durante a noite
          </p>
        </div>

        {/* Campos de Endereço */}
        <div className="bg-accent p-4 rounded-lg border border-jj-cyan-border">
          <div className="flex items-center mb-3">
            <MapPin className="h-4 w-4 text-primary mr-2" />
            <h4 className="text-sm font-medium jj-blue-dark">Endereço Completo</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logradouro" className="text-xs font-medium text-muted-foreground mb-1 block">
                Logradouro (Rua)
              </Label>
              <Input
                id="logradouro"
                type="text"
                value={data.logradouro}
                onChange={(e) => onChange('logradouro', e.target.value)}
                className="h-8 text-xs bg-white"
                placeholder="Rua, Avenida..."
                readOnly
              />
            </div>

            <div>
              <Label htmlFor="bairro" className="text-xs font-medium text-muted-foreground mb-1 block">
                Bairro
              </Label>
              <Input
                id="bairro"
                type="text"
                value={data.bairro}
                onChange={(e) => onChange('bairro', e.target.value)}
                className="h-8 text-xs bg-white"
                placeholder="Bairro"
                readOnly
              />
            </div>

            <div>
              <Label htmlFor="localidade" className="text-xs font-medium text-muted-foreground mb-1 block">
                Cidade
              </Label>
              <Input
                id="localidade"
                type="text"
                value={data.localidade}
                onChange={(e) => onChange('localidade', e.target.value)}
                className="h-8 text-xs bg-white"
                placeholder="Cidade"
                readOnly
              />
            </div>

            <div>
              <Label htmlFor="uf" className="text-xs font-medium text-muted-foreground mb-1 block">
                Estado (UF)
              </Label>
              <Input
                id="uf"
                type="text"
                value={data.uf}
                onChange={(e) => onChange('uf', e.target.value)}
                className="h-8 text-xs bg-white"
                placeholder="UF"
                readOnly
              />
            </div>
          </div>
          
          <p className="text-muted-foreground text-xs mt-2">
            📍 Endereço preenchido automaticamente com base no CEP
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
