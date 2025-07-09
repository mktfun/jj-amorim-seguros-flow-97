
import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { StableFormField } from '@/components/ui/stable-form-field';

interface ContactData {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
}

interface InitialContactStepProps {
  data: ContactData;
  onChange: (field: keyof ContactData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const InitialContactStep: React.FC<InitialContactStepProps> = memo(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur 
}) => {
  const handleFieldChange = (field: keyof ContactData) => {
    return (value: string) => onChange(field, value);
  };

  const handleFieldBlur = (field: string) => {
    return (value: string) => onFieldBlur(field, value);
  };

  return (
    <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-6">
        <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          Renovação de Seguro Auto
        </CardTitle>
        <p className="text-gray-600 text-lg mt-2 ml-16">
          Para iniciarmos sua renovação, precisamos confirmar seus dados de contato.
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          <StableFormField
            id="fullName"
            label="Nome Completo"
            value={data.fullName}
            onChange={handleFieldChange('fullName')}
            onBlur={handleFieldBlur('fullName')}
            error={errors.fullName}
            placeholder="Seu nome completo"
            required={true}
          />

          <div className="grid gap-8 md:grid-cols-2">
            <StableFormField
              id="cpf"
              label="CPF"
              value={data.cpf}
              onChange={handleFieldChange('cpf')}
              onBlur={handleFieldBlur('cpf')}
              error={errors.cpf}
              placeholder="000.000.000-00"
              mask="999.999.999-99"
              required={true}
            />

            <StableFormField
              id="phone"
              label="Telefone (WhatsApp)"
              value={data.phone}
              onChange={handleFieldChange('phone')}
              onBlur={handleFieldBlur('phone')}
              error={errors.phone}
              placeholder="(00) 00000-0000"
              mask="(99) 99999-9999"
              required={true}
            />
          </div>

          <StableFormField
            id="email"
            label="Email"
            value={data.email}
            onChange={handleFieldChange('email')}
            onBlur={handleFieldBlur('email')}
            error={errors.email}
            placeholder="seu@email.com"
            type="email"
            required={true}
          />

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm">
              <span className="font-medium text-blue-700">Próxima etapa:</span> Vamos verificar se houve alterações nos seus dados desde a última renovação.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

InitialContactStep.displayName = 'InitialContactStep';

export default InitialContactStep;
