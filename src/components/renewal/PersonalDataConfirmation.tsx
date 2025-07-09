
import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';
import { StableFormField } from '@/components/ui/stable-form-field';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PersonalData {
  fullName: string;
  cpf: string;
  birthDate: string;
  maritalStatus: string;
  email: string;
  phone: string;
  profession: string;
}

interface PersonalDataConfirmationProps {
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const PersonalDataConfirmation: React.FC<PersonalDataConfirmationProps> = memo(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur 
}) => {
  const handleFieldChange = (field: keyof PersonalData) => {
    return (value: string) => onChange(field, value);
  };

  const handleFieldBlur = (field: string) => {
    return (value: string) => onFieldBlur(field, value);
  };

  const handleMaritalStatusChange = (value: string) => {
    onChange('maritalStatus', value);
  };

  return (
    <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 pb-8">
        <CardTitle className="text-4xl font-bold text-gray-800 flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
            <UserCheck className="h-8 w-8 text-white" />
          </div>
          <div>
            <div>Confirme seus Dados Pessoais</div>
            <p className="text-lg font-normal text-gray-600 mt-2">
              Verifique e confirme todas as suas informações pessoais para a renovação.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10">
        <div className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
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
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <StableFormField
              id="birthDate"
              label="Data de Nascimento"
              value={data.birthDate}
              onChange={handleFieldChange('birthDate')}
              onBlur={handleFieldBlur('birthDate')}
              error={errors.birthDate}
              placeholder="DD/MM/AAAA"
              mask="99/99/9999"
              required={true}
              className="space-y-3"
            />

            <div className="space-y-3">
              <Label htmlFor="maritalStatus" className="text-sm font-medium text-gray-700 mb-2 block">
                Estado Civil
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select value={data.maritalStatus} onValueChange={handleMaritalStatusChange}>
                <SelectTrigger className="h-12 border-2 rounded-xl transition-all duration-300 border-gray-200 focus:border-blue-500 hover:border-gray-300">
                  <SelectValue placeholder="Selecione o estado civil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                  <SelectItem value="casado">Casado(a)</SelectItem>
                  <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                  <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {errors.maritalStatus && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                  {errors.maritalStatus}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <StableFormField
              id="profession"
              label="Profissão"
              value={data.profession}
              onChange={handleFieldChange('profession')}
              onBlur={handleFieldBlur('profession')}
              error={errors.profession}
              placeholder="Digite sua profissão"
              required={true}
              className="space-y-3"
            />

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
          </div>

          <div className="grid gap-8 md:grid-cols-1">
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

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-l-4 border-yellow-500 shadow-sm">
            <h4 className="font-semibold text-yellow-800 text-lg mb-2">📋 Dica Importante</h4>
            <p className="text-yellow-700">
              Certifique-se de que todos os dados estejam atualizados e corretos. 
              Informações incorretas podem afetar sua apólice de seguro.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-blue-700">Próxima etapa:</span> Vamos confirmar os dados do seu veículo.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PersonalDataConfirmation.displayName = 'PersonalDataConfirmation';

export default PersonalDataConfirmation;
