
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const getDocumentMask = () => {
    return data.personType === 'juridica' ? '99.999.999/9999-99' : '999.999.999-99';
  };

  const getDocumentLabel = () => {
    return data.personType === 'juridica' ? 'CNPJ' : 'CPF';
  };

  const getDocumentPlaceholder = () => {
    return data.personType === 'juridica' ? '00.000.000/0000-00' : '000.000.000-00';
  };

  const getNameLabel = () => {
    return data.personType === 'juridica' ? 'Razão Social' : 'Nome Completo';
  };

  const getNamePlaceholder = () => {
    return data.personType === 'juridica' ? 'Informe a razão social da empresa' : 'Informe seu nome completo';
  };

  return (
    <div className="space-y-8">
      <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
            Seus Dados de Identificação
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome/Razão Social */}
            <StableFormField
              id="fullName"
              label={getNameLabel()}
              value={data.fullName}
              onChange={(value) => onChange('fullName', value)}
              onBlur={(value) => onFieldBlur('fullName', value)}
              error={errors.fullName}
              placeholder={getNamePlaceholder()}
              required
              className="md:col-span-2"
            />

            {/* CPF/CNPJ */}
            <StableFormField
              id="cpf"
              label={getDocumentLabel()}
              value={data.cpf}
              onChange={(value) => onChange('cpf', value)}
              onBlur={(value) => onFieldBlur('cpf', value)}
              error={errors.cpf}
              placeholder={getDocumentPlaceholder()}
              mask={getDocumentMask()}
              required
            />

            {/* Email */}
            <StableFormField
              id="email"
              label="Email"
              type="email"
              value={data.email}
              onChange={(value) => onChange('email', value)}
              onBlur={(value) => onFieldBlur('email', value)}
              error={errors.email}
              placeholder="exemplo@email.com"
              required
            />

            {/* Celular */}
            <StableFormField
              id="phone"
              label="Celular"
              value={data.phone}
              onChange={(value) => onChange('phone', value)}
              onBlur={(value) => onFieldBlur('phone', value)}
              error={errors.phone}
              placeholder="(00) 00000-0000"
              mask="(99) 99999-9999"
              required
              className="md:col-span-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IdentificationDataStep;
