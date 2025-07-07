
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';

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

const InitialContactStep: React.FC<InitialContactStepProps> = ({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur 
}) => {
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleCpfChange = (value: string) => {
    const formatted = formatCPF(value);
    onChange('cpf', formatted);
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    onChange('phone', formatted);
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
          {/* Nome Completo */}
          <div>
            <Label htmlFor="fullName" className="text-base font-semibold text-gray-700 mb-2 block">
              Nome Completo <span className="text-blue-600">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              value={data.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              onBlur={(e) => onFieldBlur('fullName', e.target.value)}
              className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                errors.fullName 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
              placeholder="Seu nome completo"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* CPF */}
            <div>
              <Label htmlFor="cpf" className="text-base font-semibold text-gray-700 mb-2 block">
                CPF <span className="text-blue-600">*</span>
              </Label>
              <Input
                id="cpf"
                type="text"
                value={data.cpf}
                onChange={(e) => handleCpfChange(e.target.value)}
                onBlur={(e) => onFieldBlur('cpf', e.target.value)}
                className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                  errors.cpf 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
                placeholder="000.000.000-00"
                maxLength={14}
              />
              {errors.cpf && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                  {errors.cpf}
                </p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <Label htmlFor="phone" className="text-base font-semibold text-gray-700 mb-2 block">
                Telefone (WhatsApp) <span className="text-blue-600">*</span>
              </Label>
              <Input
                id="phone"
                type="text"
                value={data.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onBlur={(e) => onFieldBlur('phone', e.target.value)}
                className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                  errors.phone 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-base font-semibold text-gray-700 mb-2 block">
              Email <span className="text-blue-600">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              onBlur={(e) => onFieldBlur('email', e.target.value)}
              className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Texto informativo */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm">
              <span className="font-medium text-blue-700">Próxima etapa:</span> Vamos verificar se houve alterações nos seus dados desde a última renovação.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InitialContactStep;
