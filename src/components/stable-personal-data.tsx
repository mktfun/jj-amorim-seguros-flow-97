
import React, { memo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { StableFormField } from '@/components/ui/stable-form-field';

interface PersonalData {
  fullName: string;
  cpf: string;
  birthDate: string;
  maritalStatus: string;
  email: string;
  phone: string;
}

interface StablePersonalDataProps {
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
  isOptional?: boolean;
}

const StablePersonalData = memo<StablePersonalDataProps>(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur,
  isOptional = false
}) => {
  const handleFieldChange = useCallback((field: keyof PersonalData) => {
    return (value: string) => onChange(field, value);
  }, [onChange]);

  const handleFieldBlur = useCallback((field: string) => {
    return (value: string) => onFieldBlur(field, value);
  }, [onFieldBlur]);

  const handleMaritalStatusChange = useCallback((value: string) => {
    onChange('maritalStatus', value);
  }, [onChange]);

  return (
    <Card className="border-2 border-blue-100 shadow-lg rounded-2xl">
      <CardContent className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StableFormField
            id="fullName"
            label="Nome Completo"
            value={data.fullName}
            onChange={handleFieldChange('fullName')}
            onBlur={handleFieldBlur('fullName')}
            error={errors.fullName}
            placeholder="Digite seu nome completo"
            required={!isOptional}
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
            required={!isOptional}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StableFormField
            id="birthDate"
            label="Data de Nascimento"
            value={data.birthDate}
            onChange={handleFieldChange('birthDate')}
            onBlur={handleFieldBlur('birthDate')}
            error={errors.birthDate}
            placeholder="DD/MM/AAAA"
            mask="99/99/9999"
            required={!isOptional}
          />

          <div>
            <Label htmlFor="maritalStatus" className="text-sm font-medium text-gray-700 mb-2 block">
              Estado Civil
              {!isOptional && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select value={data.maritalStatus} onValueChange={handleMaritalStatusChange}>
              <SelectTrigger className="h-10 border-2 rounded-md transition-all duration-300 border-gray-200 focus:border-blue-500 hover:border-gray-300">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StableFormField
            id="email"
            label="Email"
            value={data.email}
            onChange={handleFieldChange('email')}
            onBlur={handleFieldBlur('email')}
            error={errors.email}
            placeholder="seu@email.com"
            type="email"
            required={!isOptional}
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
            required={!isOptional}
          />
        </div>
      </CardContent>
    </Card>
  );
});

StablePersonalData.displayName = 'StablePersonalData';

export default StablePersonalData;
