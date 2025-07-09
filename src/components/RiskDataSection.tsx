
import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useViaCEP } from '@/hooks/useViaCEP';
import RadioQuestion from './risk-data/RadioQuestion';
import AddressDisplay from './risk-data/AddressDisplay';
import CEPInput from './risk-data/CEPInput';

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

const RiskDataSection: React.FC<RiskDataSectionProps> = memo(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur,
  isOptional = false
}) => {
  const { fetchAddress, loading, error: cepError, clearError } = useViaCEP();

  const handleCepChange = (value: string) => {
    onChange('cep', value);
    clearError();
    
    // Limpa o endereço se o CEP estiver incompleto
    const cleanCep = value.replace(/\D/g, '');
    if (cleanCep.length < 8) {
      onChange('logradouro', '');
      onChange('bairro', '');
      onChange('localidade', '');
      onChange('uf', '');
    }
  };

  const handleCepBlur = async (value: string) => {
    onFieldBlur('cep', value);
    
    // Only fetch address if CEP is complete (8 digits)
    const cleanCep = value.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      console.log('Buscando endereço para CEP:', cleanCep);
      const addressData = await fetchAddress(cleanCep);
      if (addressData) {
        console.log('Endereço encontrado:', addressData);
        onChange('logradouro', addressData.logradouro);
        onChange('bairro', addressData.bairro);
        onChange('localidade', addressData.localidade);
        onChange('uf', addressData.uf);
      } else {
        console.log('CEP não encontrado, limpando campos de endereço');
        onChange('logradouro', '');
        onChange('bairro', '');
        onChange('localidade', '');
        onChange('uf', '');
      }
    }
  };

  return (
    <Card className="border-jj-cyan-border">
      <CardContent className="p-6 space-y-8">
        <CEPInput
          value={data.cep}
          onChange={handleCepChange}
          onBlur={handleCepBlur}
          error={errors.cep || cepError}
          loading={loading}
          isOptional={isOptional}
        />

        <AddressDisplay
          data={{
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf
          }}
          onChange={onChange}
        />

        <RadioQuestion
          title="Na garagem, o portão é automático ou manual?"
          field="garageType"
          value={data.garageType}
          onChange={(value) => onChange('garageType', value)}
          error={errors.garageType}
          isOptional={isOptional}
          options={[
            { value: 'automatico', label: 'Automático' },
            { value: 'manual', label: 'Manual' }
          ]}
        />

        <RadioQuestion
          title="Reside em casa ou apto?"
          field="residenceType"
          value={data.residenceType}
          onChange={(value) => onChange('residenceType', value)}
          error={errors.residenceType}
          isOptional={isOptional}
          options={[
            { value: 'casa', label: 'Casa' },
            { value: 'apto', label: 'Apartamento' }
          ]}
        />

        <div>
          <RadioQuestion
            title="Utiliza o veículo para ir ao trabalho?"
            field="usesForWork"
            value={data.usesForWork}
            onChange={(value) => onChange('usesForWork', value)}
            error={errors.usesForWork}
            isOptional={isOptional}
          />
          
          {data.usesForWork === 'sim' && (
            <div className="mt-6 ml-6 p-4 bg-accent rounded-lg border border-jj-cyan-border">
              <RadioQuestion
                title="Se sim, ele fica em estacionamento fechado e exclusivo?"
                field="workParking"
                value={data.workParking}
                onChange={(value) => onChange('workParking', value)}
                error={errors.workParking}
                isOptional={isOptional}
              />
            </div>
          )}
        </div>

        <RadioQuestion
          title="Reside com pessoas entre 18 a 24 anos?"
          field="youngResidents"
          value={data.youngResidents}
          onChange={(value) => onChange('youngResidents', value)}
          error={errors.youngResidents}
          isOptional={isOptional}
        />

        <RadioQuestion
          title="Utiliza o veículo para trabalhar em transporte de passageiros por App (Uber e similares)?"
          field="rideshareWork"
          value={data.rideshareWork}
          onChange={(value) => onChange('rideshareWork', value)}
          error={errors.rideshareWork}
          isOptional={isOptional}
        />
      </CardContent>
    </Card>
  );
});

RiskDataSection.displayName = 'RiskDataSection';

export default RiskDataSection;
