
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const PersonalDataSection: React.FC<PersonalDataSectionProps> = ({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur,
  isOptional = false
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

  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
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

  const handleDateChange = (value: string) => {
    const formatted = formatDate(value);
    onChange('birthDate', formatted);
  };

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
              className={`mt-1 ${errors.fullName ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}
              placeholder={isOptional ? "Apenas se mudou" : "Seu nome completo"}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cpf" className="text-sm font-medium jj-blue-dark">
              CPF{requiredLabel}
            </Label>
            <Input
              id="cpf"
              type="text"
              value={data.cpf}
              onChange={(e) => handleCpfChange(e.target.value)}
              onBlur={(e) => onFieldBlur('cpf', e.target.value)}
              className={`mt-1 ${errors.cpf ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}
              placeholder="000.000.000-00"
              maxLength={14}
            />
            {errors.cpf && (
              <p className="text-sm text-red-500 mt-1">{errors.cpf}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="birthDate" className="text-sm font-medium jj-blue-dark">
              Data de Nascimento{requiredLabel}
            </Label>
            <Input
              id="birthDate"
              type="text"
              value={data.birthDate}
              onChange={(e) => handleDateChange(e.target.value)}
              onBlur={(e) => onFieldBlur('birthDate', e.target.value)}
              className={`mt-1 ${errors.birthDate ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}
              placeholder="DD/MM/AAAA"
              maxLength={10}
            />
            {errors.birthDate && (
              <p className="text-sm text-red-500 mt-1">{errors.birthDate}</p>
            )}
          </div>

          <div>
            <Label htmlFor="maritalStatus" className="text-sm font-medium jj-blue-dark">
              Estado Civil{requiredLabel}
            </Label>
            <Select value={data.maritalStatus} onValueChange={(value) => onChange('maritalStatus', value)}>
              <SelectTrigger className={`mt-1 ${errors.maritalStatus ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}>
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
              <p className="text-sm text-red-500 mt-1">{errors.maritalStatus}</p>
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
              className={`mt-1 ${errors.email ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}
              placeholder={isOptional ? "Apenas se mudou" : "seu@email.com"}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium jj-blue-dark">
              Telefone (WhatsApp){requiredLabel}
            </Label>
            <Input
              id="phone"
              type="text"
              value={data.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={(e) => onFieldBlur('phone', e.target.value)}
              className={`mt-1 ${errors.phone ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalDataSection;
