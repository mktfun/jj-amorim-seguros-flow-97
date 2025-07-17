
import React from 'react';
import { Card } from '@/components/ui/card';
import { StableFormField } from '@/components/ui/stable-form-field';
import { useViaCEP } from '@/hooks/useViaCEP';

interface AddressStepProps {
  data: {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    numero: string;
    complemento: string;
  };
  onChange: (field: string, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const AddressStep: React.FC<AddressStepProps> = ({
  data,
  onChange,
  errors,
  onFieldBlur
}) => {
  const { fetchAddress } = useViaCEP();

  const handleCEPChange = async (cep: string) => {
    onChange('cep', cep);
    
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

  return (
    <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Qual é o CEP de Pernoite do veículo?
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <StableFormField
          id="cep"
          label="CEP"
          value={data.cep}
          onChange={handleCEPChange}
          onBlur={(value) => onFieldBlur('cep', value)}
          error={errors.cep}
          mask="99999-999"
          placeholder="00000-000"
          required
          className="md:col-span-2"
        />

        <StableFormField
          id="logradouro"
          label="Logradouro"
          value={data.logradouro}
          onChange={() => {}} // Read-only
          error=""
          placeholder="Será preenchido automaticamente"
          className="md:col-span-2"
        />

        <StableFormField
          id="bairro"
          label="Bairro"
          value={data.bairro}
          onChange={() => {}} // Read-only
          error=""
          placeholder="Será preenchido automaticamente"
        />

        <StableFormField
          id="localidade"
          label="Cidade"
          value={data.localidade}
          onChange={() => {}} // Read-only
          error=""
          placeholder="Será preenchido automaticamente"
        />

        <StableFormField
          id="uf"
          label="Estado"
          value={data.uf}
          onChange={() => {}} // Read-only
          error=""
          placeholder="Será preenchido automaticamente"
        />

        <StableFormField
          id="numero"
          label="Número"
          value={data.numero}
          onChange={(value) => onChange('numero', value)}
          onBlur={(value) => onFieldBlur('numero', value)}
          error={errors.numero}
          placeholder="Digite o número"
          required
        />

        <StableFormField
          id="complemento"
          label="Complemento"
          value={data.complemento}
          onChange={(value) => onChange('complemento', value)}
          error=""
          placeholder="Apartamento, bloco, etc. (opcional)"
          className="md:col-span-2"
        />
      </div>
    </Card>
  );
};

export default AddressStep;
