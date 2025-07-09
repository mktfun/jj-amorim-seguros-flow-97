
import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputMask from 'react-input-mask';
import { cn } from '@/lib/utils';

interface PersonalData {
  fullName: string;
  cpf: string;
  birthDate: string;
  maritalStatus: string;
  email: string;
  phone: string;
}

interface PersonalDataSectionProps {
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
  isOptional?: boolean;
}

const PersonalDataSection: React.FC<PersonalDataSectionProps> = memo(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur,
  isOptional = false
}) => {
  const requiredLabel = isOptional ? '' : ' *';

  return (
    <Card className="border-jj-cyan-border">
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium jj-blue-dark">
              Nome Completo{requiredLabel}
            </Label>
            <Input
              id="fullName"
              type="text"
              value={data.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              onBlur={(e) => onFieldBlur('fullName', e.target.value)}
              className={`mt-1 transition-all duration-200 ${
                errors.fullName 
                  ? 'border-red-500 bg-red-50 focus:border-red-500' 
                  : 'border-jj-cyan-border focus:border-primary hover:border-gray-300'
              }`}
              placeholder={isOptional ? "Apenas se mudou" : "Seu nome completo"}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="cpf" className="text-sm font-medium jj-blue-dark">
              CPF{requiredLabel}
            </Label>
            <InputMask
              mask="999.999.999-99"
              value={data.cpf}
              onChange={(e) => onChange('cpf', e.target.value)}
              onBlur={(e) => onFieldBlur('cpf', e.target.value)}
              maskChar={null}
              alwaysShowMask={false}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  id="cpf"
                  type="text"
                  className={cn(
                    "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1 transition-all duration-200",
                    errors.cpf 
                      ? 'border-red-500 bg-red-50 focus:border-red-500' 
                      : 'border-jj-cyan-border focus:border-primary hover:border-gray-300'
                  )}
                  placeholder="000.000.000-00"
                />
              )}
            </InputMask>
            {errors.cpf && (
              <p className="text-sm text-red-500 mt-1 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.cpf}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="birthDate" className="text-sm font-medium jj-blue-dark">
              Data de Nascimento{requiredLabel}
            </Label>
            <InputMask
              mask="99/99/9999"
              value={data.birthDate}
              onChange={(e) => onChange('birthDate', e.target.value)}
              onBlur={(e) => onFieldBlur('birthDate', e.target.value)}
              maskChar={null}
              alwaysShowMask={false}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  id="birthDate"
                  type="text"
                  className={cn(
                    "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1 transition-all duration-200",
                    errors.birthDate 
                      ? 'border-red-500 bg-red-50 focus:border-red-500' 
                      : 'border-jj-cyan-border focus:border-primary hover:border-gray-300'
                  )}
                  placeholder="DD/MM/AAAA"
                />
              )}
            </InputMask>
            {errors.birthDate && (
              <p className="text-sm text-red-500 mt-1 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.birthDate}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="maritalStatus" className="text-sm font-medium jj-blue-dark">
              Estado Civil{requiredLabel}
            </Label>
            <Select value={data.maritalStatus} onValueChange={(value) => onChange('maritalStatus', value)}>
              <SelectTrigger className={`mt-1 transition-all duration-200 ${
                errors.maritalStatus 
                  ? 'border-red-500 bg-red-50 focus:border-red-500' 
                  : 'border-jj-cyan-border focus:border-primary hover:border-gray-300'
              }`}>
                <SelectValue placeholder={isOptional ? "Apenas se mudou" : "Selecione"} />
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
              <p className="text-sm text-red-500 mt-1 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.maritalStatus}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email" className="text-sm font-medium jj-blue-dark">
              Email{requiredLabel}
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              onBlur={(e) => onFieldBlur('email', e.target.value)}
              className={`mt-1 transition-all duration-200 ${
                errors.email 
                  ? 'border-red-500 bg-red-50 focus:border-red-500' 
                  : 'border-jj-cyan-border focus:border-primary hover:border-gray-300'
              }`}
              placeholder={isOptional ? "Apenas se mudou" : "seu@email.com"}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium jj-blue-dark">
              Telefone (WhatsApp){requiredLabel}
            </Label>
            <InputMask
              mask="(99) 99999-9999"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              onBlur={(e) => onFieldBlur('phone', e.target.value)}
              maskChar={null}
              alwaysShowMask={false}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  id="phone"
                  type="text"
                  className={cn(
                    "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1 transition-all duration-200",
                    errors.phone 
                      ? 'border-red-500 bg-red-50 focus:border-red-500' 
                      : 'border-jj-cyan-border focus:border-primary hover:border-gray-300'
                  )}
                  placeholder="(00) 00000-0000"
                />
              )}
            </InputMask>
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PersonalDataSection.displayName = 'PersonalDataSection';

export default PersonalDataSection;
