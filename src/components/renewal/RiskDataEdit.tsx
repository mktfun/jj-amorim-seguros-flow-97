
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, MapPin } from 'lucide-react';
import InputMask from 'react-input-mask';
import { cn } from '@/lib/utils';
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

interface RiskDataEditProps {
  data: RiskData;
  onChange: (field: keyof RiskData, value: string) => void;
}

const RiskDataEdit: React.FC<RiskDataEditProps> = ({ 
  data, 
  onChange
}) => {
  const { fetchAddress, loading, error } = useViaCEP();

  const handleCEPBlur = async (cep: string) => {
    if (cep.replace(/\D/g, '').length === 8) {
      const addressData = await fetchAddress(cep);
      if (addressData) {
        onChange('logradouro', addressData.logradouro);
        onChange('bairro', addressData.bairro);
        onChange('localidade', addressData.localidade);
        onChange('uf', addressData.uf);
      }
    }
  };

  const RadioQuestion = ({ 
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
      <Label className="text-base font-semibold text-gray-700 mb-4 block">
        {title}
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
              id={`edit-${field}-${option.value}`}
              className="border-2 border-blue-500 w-5 h-5"
            />
            <Label 
              htmlFor={`edit-${field}-${option.value}`} 
              className="cursor-pointer text-gray-700 font-medium text-base"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  return (
    <Card className="border-2 border-blue-100 shadow-lg rounded-2xl">
      <CardContent className="p-8 space-y-8">
        {/* CEP */}
        <div>
          <Label htmlFor="edit-cep" className="text-base font-semibold text-gray-700 mb-3 block">
            CEP de pernoite do veículo
          </Label>
          <div className="relative">
            <InputMask
              mask="99999-999"
              value={data.cep}
              onChange={(e) => onChange('cep', e.target.value)}
              onBlur={(e) => handleCEPBlur(e.target.value)}
              maskChar={null}
              alwaysShowMask={false}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  id="edit-cep"
                  type="text"
                  className={cn(
                    "flex h-12 w-full rounded-xl border-2 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
                    "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                  )}
                  placeholder="00000-000"
                />
              )}
            </InputMask>
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              </div>
            )}
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          <p className="text-gray-600 text-sm mt-2">
            Local onde o veículo fica durante a noite
          </p>
        </div>

        {/* Endereço automático */}
        {(data.logradouro || data.bairro || data.localidade) && (
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Endereço encontrado:</span>
            </div>
            <p className="text-gray-700">
              {data.logradouro && `${data.logradouro}, `}
              {data.bairro && `${data.bairro}, `}
              {data.localidade && `${data.localidade}`}
              {data.uf && ` - ${data.uf}`}
            </p>
          </div>
        )}

        {/* Tipo de Garagem */}
        <RadioQuestion
          field="garageType"
          title="Tipo de portão/garagem onde o veículo pernoita:"
          value={data.garageType}
          onValueChange={(value) => onChange('garageType', value)}
          options={[
            { value: 'garagem-fechada', label: 'Garagem fechada' },
            { value: 'garagem-aberta', label: 'Garagem aberta' },
            { value: 'na-rua', label: 'Na rua' }
          ]}
        />

        {/* Tipo de Residência */}
        <RadioQuestion
          field="residenceType"
          title="Tipo de residência:"
          value={data.residenceType}
          onValueChange={(value) => onChange('residenceType', value)}
          options={[
            { value: 'casa', label: 'Casa' },
            { value: 'apartamento', label: 'Apartamento' },
            { value: 'condominio', label: 'Condomínio' }
          ]}
        />

        {/* Usa para trabalho */}
        <RadioQuestion
          field="usesForWork"
          title="Usa o veículo para trabalho?"
          value={data.usesForWork}
          onValueChange={(value) => onChange('usesForWork', value)}
        />

        {/* Estacionamento do trabalho */}
        {data.usesForWork === 'sim' && (
          <RadioQuestion
            field="workParking"
            title="Tipo de estacionamento no trabalho:"
            value={data.workParking}
            onValueChange={(value) => onChange('workParking', value)}
            options={[
              { value: 'garagem-fechada', label: 'Garagem fechada' },
              { value: 'estacionamento', label: 'Estacionamento' },
              { value: 'na-rua', label: 'Na rua' }
            ]}
          />
        )}

        {/* Jovens residentes */}
        <RadioQuestion
          field="youngResidents"
          title="Reside com jovens de 18 a 24 anos que dirigem?"
          value={data.youngResidents}
          onValueChange={(value) => onChange('youngResidents', value)}
        />

        {/* Trabalho por aplicativo */}
        <RadioQuestion
          field="rideshareWork"
          title="Trabalha com transporte por aplicativo (Uber, 99, etc)?"
          value={data.rideshareWork}
          onValueChange={(value) => onChange('rideshareWork', value)}
        />
      </CardContent>
    </Card>
  );
};

export default RiskDataEdit;
