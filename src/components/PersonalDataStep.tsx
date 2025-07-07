
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Lightbulb } from 'lucide-react';

interface PersonalData {
  fullName: string;
  cpf: string;
  birthDate: string;
  maritalStatus: string;
  email: string;
  phone: string;
}

interface PersonalDataStepProps {
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const PersonalDataStep: React.FC<PersonalDataStepProps> = ({ 
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
      if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
    }
    return value;
  };

  const handleCPFChange = (value: string) => {
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
            <User className="h-6 w-6 text-white" />
          </div>
          Dados Pessoais do Principal Condutor
        </CardTitle>
        <p className="text-gray-600 text-lg mt-2 ml-16">
          Informações pessoais para identificação do segurado
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
              placeholder="Digite seu nome completo"
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
                onChange={(e) => handleCPFChange(e.target.value)}
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

            {/* Data de Nascimento */}
            <div>
              <Label htmlFor="birthDate" className="text-base font-semibold text-gray-700 mb-2 block">
                Data de Nascimento <span className="text-blue-600">*</span>
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={data.birthDate}
                onChange={(e) => onChange('birthDate', e.target.value)}
                onBlur={(e) => onFieldBlur('birthDate', e.target.value)}
                className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                  errors.birthDate 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                  {errors.birthDate}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Estado Civil */}
            <div>
              <Label className="text-base font-semibold text-gray-700 mb-2 block">
                Estado Civil <span className="text-blue-600">*</span>
              </Label>
              <Select 
                value={data.maritalStatus} 
                onValueChange={(value) => onChange('maritalStatus', value)}
              >
                <SelectTrigger className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                  errors.maritalStatus 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}>
                  <SelectValue placeholder="Selecione seu estado civil" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50 border-2 border-gray-200 rounded-xl shadow-xl">
                  <SelectItem value="solteiro" className="text-base py-3 hover:bg-blue-50 rounded-lg">Solteiro</SelectItem>
                  <SelectItem value="casado" className="text-base py-3 hover:bg-blue-50 rounded-lg">Casado</SelectItem>
                  <SelectItem value="divorciado" className="text-base py-3 hover:bg-blue-50 rounded-lg">Divorciado</SelectItem>
                  <SelectItem value="viuvo" className="text-base py-3 hover:bg-blue-50 rounded-lg">Viúvo</SelectItem>
                  <SelectItem value="outro" className="text-base py-3 hover:bg-blue-50 rounded-lg">Outro</SelectItem>
                </SelectContent>
              </Select>
              {errors.maritalStatus && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                  {errors.maritalStatus}
                </p>
              )}
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
              placeholder="(11) 99999-9999"
              maxLength={15}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Dica */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Lightbulb className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-gray-700 font-medium">Dica Importante</p>
                <p className="text-gray-600 text-sm mt-1">
                  Para agilizar seu orçamento, você pode enviar uma foto da CNH e documento do veículo diretamente para o WhatsApp da corretora após finalizar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalDataStep;
