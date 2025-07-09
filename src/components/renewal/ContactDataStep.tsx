
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

interface ContactDataStepProps {
  data: ContactData;
  onChange: (field: keyof ContactData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const ContactDataStep: React.FC<ContactDataStepProps> = memo(({ 
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
    <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 pb-8">
        <CardTitle className="text-4xl font-bold text-gray-800 flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <div>Renovação de Seguro Auto</div>
            <p className="text-lg font-normal text-gray-600 mt-2">
              Para iniciarmos sua renovação, precisamos confirmar seus dados de contato.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10">
        <div className="space-y-8">
          <StableFormField
            id="fullName"
            label="Nome Completo"
            value={data.fullName}
            onChange={handleFieldChange('fullName')}
            onBlur={handleFieldBlur('fullName')}
            error={errors.fullName}
            placeholder="Digite seu nome completo"
            required={true}
            className="space-y-3"
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
              className="space-y-3"
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
              className="space-y-3"
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
            className="space-y-3"
          />

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-blue-700">Próxima etapa:</span> Vamos verificar se houve alterações nos seus dados desde a última renovação.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ContactDataStep.displayName = 'ContactDataStep';

export default ContactDataStep;
