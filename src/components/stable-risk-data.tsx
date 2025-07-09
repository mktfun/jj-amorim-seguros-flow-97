
import React, { memo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, MapPin } from 'lucide-react';
import { StableFormField } from '@/components/ui/stable-form-field';
import { useViaCEP } from '@/hooks/useViaCEP';

interface RiskData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
  complemento: string;
  garageType: string;
  residenceType: string;
  usesForWork: string;
  workParking: string;
  youngResidents: string;
  youngDriversUseVehicle: string;
  youngDriverAge: string;
  youngDriverGender: string;
  rideshareWork: string;
}

interface StableRiskDataProps {
  data: RiskData;
  onChange: (field: keyof RiskData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
  isOptional?: boolean;
}

const StableRiskData = memo<StableRiskDataProps>(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur,
  isOptional = false
}) => {
  const { fetchAddress, loading, error: cepError, clearError } = useViaCEP();

  const handleFieldChange = useCallback((field: keyof RiskData) => {
    return (value: string) => onChange(field, value);
  }, [onChange]);

  const handleFieldBlur = useCallback((field: string) => {
    return (value: string) => onFieldBlur(field, value);
  }, [onFieldBlur]);

  const handleCepChange = useCallback((value: string) => {
    onChange('cep', value);
    clearError();
    
    const cleanCep = value.replace(/\D/g, '');
    if (cleanCep.length < 8) {
      onChange('logradouro', '');
      onChange('bairro', '');
      onChange('localidade', '');
      onChange('uf', '');
    }
  }, [onChange, clearError]);

  const handleCepBlur = useCallback(async (value: string) => {
    onFieldBlur('cep', value);
    
    const cleanCep = value.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      const addressData = await fetchAddress(cleanCep);
      if (addressData) {
        onChange('logradouro', addressData.logradouro);
        onChange('bairro', addressData.bairro);
        onChange('localidade', addressData.localidade);
        onChange('uf', addressData.uf);
      } else {
        onChange('logradouro', '');
        onChange('bairro', '');
        onChange('localidade', '');
        onChange('uf', '');
      }
    }
  }, [onFieldBlur, fetchAddress, onChange]);

  const RadioQuestion = memo(({ 
    field, 
    title, 
    value, 
    onValueChange,
    options = [{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }]
  }: {
    field: string;
    title: string;
    value: string;
    onValueChange: (value: string) => void;
    options?: { value: string; label: string }[];
  }) => (
    <div>
      <Label className="text-sm font-medium text-gray-700 mb-4 block">
        {title}
        {!isOptional && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <RadioGroup 
        value={value} 
        onValueChange={onValueChange}
        className="flex flex-wrap gap-6"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-3">
            <RadioGroupItem 
              value={option.value} 
              id={`${field}-${option.value}`}
              className="border-2 border-blue-500 w-5 h-5"
            />
            <Label 
              htmlFor={`${field}-${option.value}`} 
              className="cursor-pointer text-gray-700 font-medium text-base"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
          {errors[field]}
        </p>
      )}
    </div>
  ));

  return (
    <Card className="border-2 border-blue-100 shadow-lg rounded-2xl">
      <CardContent className="p-8 space-y-8">
        <div className="relative">
          <Label htmlFor="cep" className="text-sm font-medium text-gray-700 mb-2 block">
            CEP de pernoite do veículo
            {!isOptional && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <div className="relative">
            <StableFormField
              id="cep"
              label=""
              value={data.cep}
              onChange={handleCepChange}
              onBlur={handleCepBlur}
              error={errors.cep || cepError}
              placeholder="00000-000"
              mask="99999-999"
              className="mb-0"
            />
            {loading && (
              <div className="absolute right-3 top-2 transform translate-y-1/2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              </div>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Local onde o veículo fica durante a noite
          </p>
        </div>

        {(data.logradouro || data.bairro || data.localidade) && (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Endereço encontrado:</span>
            </div>
            <p className="text-gray-700 mb-4">
              {data.logradouro && `${data.logradouro}, `}
              {data.bairro && `${data.bairro}, `}
              {data.localidade && `${data.localidade}`}
              {data.uf && ` - ${data.uf}`}
            </p>
            
            {/* Novos campos de endereço */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StableFormField
                id="numero"
                label="Número"
                value={data.numero}
                onChange={handleFieldChange('numero')}
                onBlur={handleFieldBlur('numero')}
                error={errors.numero}
                placeholder="123"
                required={!isOptional}
              />
              
              <StableFormField
                id="complemento"
                label="Complemento (opcional)"
                value={data.complemento}
                onChange={handleFieldChange('complemento')}
                onBlur={handleFieldBlur('complemento')}
                error={errors.complemento}
                placeholder="Apto 45, Bloco B..."
                required={false}
              />
            </div>
          </div>
        )}

        <RadioQuestion
          field="garageType"
          title="Tipo de portão/garagem onde o veículo pernoita:"
          value={data.garageType}
          onValueChange={handleFieldChange('garageType')}
          options={[
            { value: 'garagem-fechada', label: 'Garagem fechada' },
            { value: 'garagem-aberta', label: 'Garagem aberta' },
            { value: 'na-rua', label: 'Na rua' }
          ]}
        />

        <RadioQuestion
          field="residenceType"
          title="Tipo de residência:"
          value={data.residenceType}
          onValueChange={handleFieldChange('residenceType')}
          options={[
            { value: 'casa', label: 'Casa' },
            { value: 'apartamento', label: 'Apartamento' },
            { value: 'condominio', label: 'Condomínio' }
          ]}
        />

        <RadioQuestion
          field="usesForWork"
          title="Usa o veículo para trabalho?"
          value={data.usesForWork}
          onValueChange={handleFieldChange('usesForWork')}
        />

        {data.usesForWork === 'sim' && (
          <div className="ml-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <RadioQuestion
              field="workParking"
              title="Tipo de estacionamento no trabalho:"
              value={data.workParking}
              onValueChange={handleFieldChange('workParking')}
              options={[
                { value: 'garagem-fechada', label: 'Garagem fechada' },
                { value: 'estacionamento', label: 'Estacionamento' },
                { value: 'na-rua', label: 'Na rua' }
              ]}
            />
          </div>
        )}

        <RadioQuestion
          field="youngResidents"
          title="Reside com jovens de 18 a 24 anos que dirigem?"
          value={data.youngResidents}
          onValueChange={handleFieldChange('youngResidents')}
        />

        {data.youngResidents === 'sim' && (
          <div className="ml-6 p-6 bg-green-50 rounded-lg border border-green-200">
            <RadioQuestion
              field="youngDriversUseVehicle"
              title="Essa(s) pessoa(s) utiliza(m) o veículo?"
              value={data.youngDriversUseVehicle}
              onValueChange={handleFieldChange('youngDriversUseVehicle')}
            />
            
            {data.youngDriversUseVehicle === 'sim' && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StableFormField
                    id="youngDriverAge"
                    label="Idade do jovem condutor"
                    value={data.youngDriverAge}
                    onChange={handleFieldChange('youngDriverAge')}
                    onBlur={handleFieldBlur('youngDriverAge')}
                    error={errors.youngDriverAge}
                    placeholder="Ex: 20"
                    type="number"
                    required={!isOptional}
                  />
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-4 block">
                      Sexo do jovem condutor
                      {!isOptional && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <RadioGroup 
                      value={data.youngDriverGender} 
                      onValueChange={handleFieldChange('youngDriverGender')}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value="masculino" 
                          id="gender-masculino"
                          className="border-2 border-blue-500 w-5 h-5"
                        />
                        <Label 
                          htmlFor="gender-masculino" 
                          className="cursor-pointer text-gray-700 font-medium text-base"
                        >
                          Masculino
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value="feminino" 
                          id="gender-feminino"
                          className="border-2 border-blue-500 w-5 h-5"
                        />
                        <Label 
                          htmlFor="gender-feminino" 
                          className="cursor-pointer text-gray-700 font-medium text-base"
                        >
                          Feminino
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.youngDriverGender && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                        {errors.youngDriverGender}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <RadioQuestion
          field="rideshareWork"
          title="Trabalha com transporte por aplicativo (Uber, 99, etc)?"
          value={data.rideshareWork}
          onValueChange={handleFieldChange('rideshareWork')}
        />
      </CardContent>
    </Card>
  );
});

StableRiskData.displayName = 'StableRiskData';

export default StableRiskData;
