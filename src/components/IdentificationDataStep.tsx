
import React from 'react';
import { Card } from '@/components/ui/card';
import { StableFormField } from '@/components/ui/stable-form-field';

interface IdentificationDataStepProps {
  data: {
    personType: string;
    fullName: string;
    cpf: string;
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const IdentificationDataStep: React.FC<IdentificationDataStepProps> = ({
  data,
  onChange,
  errors,
  onFieldBlur
}) => {
  const isCNPJ = data.personType === 'juridica';
  const documentLabel = isCNPJ ? 'CNPJ' : 'CPF';
  const documentMask = isCNPJ ? '99.999.999/9999-99' : '999.999.999-99';
  const documentPlaceholder = isCNPJ ? '00.000.000/0000-00' : '000.000.000-00';

  return (
    <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Seus Dados de Identificação
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <StableFormField
          id="fullName"
          label={isCNPJ ? 'Razão Social' : 'Nome Completo'}
          value={data.fullName}
          onChange={(value) => onChange('fullName', value)}
          onBlur={(value) => onFieldBlur('fullName', value)}
          error={errors.fullName}
          placeholder={isCNPJ ? 'Digite a razão social' : 'Digite seu nome completo'}
          required
          className="md:col-span-2"
        />

        <StableFormField
          id="cpf"
          label={documentLabel}
          value={data.cpf}
          onChange={(value) => onChange('cpf', value)}
          onBlur={(value) => onFieldBlur('cpf', value)}
          error={errors.cpf}
          mask={documentMask}
          placeholder={documentPlaceholder}
          required
        />

        <StableFormField
          id="email"
          label="E-mail"
          value={data.email}
          onChange={(value) => onChange('email', value)}
          onBlur={(value) => onFieldBlur('email', value)}
          error={errors.email}
          placeholder="Digite seu e-mail"
          type="email"
          required
        />

        <StableFormField
          id="phone"
          label="Celular"
          value={data.phone}
          onChange={(value) => onChange('phone', value)}
          onBlur={(value) => onFieldBlur('phone', value)}
          error={errors.phone}
          mask="(99) 99999-9999"
          placeholder="(00) 00000-0000"
          required
          className="md:col-span-2"
        />
      </div>
    </Card>
  );
};

export default IdentificationDataStep;
