
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StableFormField } from '@/components/ui/stable-form-field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PersonalDataStepProps {
  data: {
    personType?: string;
    fullName: string;
    cpf: string;
    birthDate: string;
    maritalStatus: string;
    email: string;
    phone: string;
    profession: string;
  };
  mainDriverData: {
    isDifferentFromInsured: string;
    fullName: string;
    cpf: string;
    birthDate: string;
    maritalStatus: string;
    email: string;
    phone: string;
    profession: string;
  };
  onChange: (field: string, value: string) => void;
  onMainDriverChange: (field: string, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const PersonalDataStep: React.FC<PersonalDataStepProps> = ({
  data,
  onChange,
  errors,
  onFieldBlur
}) => {
  const personType = data.personType || '';
  
  const getDocumentMask = () => {
    return personType === 'juridica' ? '99.999.999/9999-99' : '999.999.999-99';
  };

  const getDocumentLabel = () => {
    return personType === 'juridica' ? 'CNPJ' : 'CPF';
  };

  const getDocumentPlaceholder = () => {
    return personType === 'juridica' ? '00.000.000/0000-00' : '000.000.000-00';
  };

  const getNameLabel = () => {
    return personType === 'juridica' ? 'Razão Social' : 'Nome Completo';
  };

  const getNamePlaceholder = () => {
    return personType === 'juridica' ? 'Informe a razão social da empresa' : 'Informe seu nome completo';
  };

  return (
    <div className="space-y-8">
      <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
            DADOS DO PRINCIPAL CONDUTOR
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tipo de Pessoa */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700 block">
              Tipo de Pessoa
              <span className="text-red-500 ml-1">*</span>
            </Label>
            
            <RadioGroup
              value={personType}
              onValueChange={(value) => onChange('personType', value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <label className={`
                  flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${personType === 'fisica' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }
                `}>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="fisica" id="fisica" />
                    <div>
                      <div className="font-semibold">Pessoa Física</div>
                      <div className="text-sm text-gray-500">CPF</div>
                    </div>
                  </div>
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className={`
                  flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${personType === 'juridica' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }
                `}>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="juridica" id="juridica" />
                    <div>
                      <div className="font-semibold">Pessoa Jurídica</div>
                      <div className="text-sm text-gray-500">CNPJ</div>
                    </div>
                  </div>
                </label>
              </div>
            </RadioGroup>
            
            {errors.personType && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.personType}
              </p>
            )}
          </div>

          {/* Formulário de Dados Básicos */}
          {personType && (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalDataStep;
