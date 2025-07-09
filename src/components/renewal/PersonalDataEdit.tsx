
import React from 'react';
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

interface PersonalDataEditProps {
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
}

const PersonalDataEdit: React.FC<PersonalDataEditProps> = ({ 
  data, 
  onChange
}) => {
  return (
    <Card className="border-2 border-blue-100 shadow-lg rounded-2xl">
      <CardContent className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label htmlFor="edit-fullName" className="text-base font-semibold text-gray-700 mb-3 block">
              Nome Completo
            </Label>
            <Input
              id="edit-fullName"
              type="text"
              value={data.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              className="h-12 text-base border-2 rounded-xl transition-all duration-300 border-gray-200 focus:border-blue-500 hover:border-gray-300"
              placeholder="Digite o nome completo"
            />
          </div>

          <div>
            <Label htmlFor="edit-cpf" className="text-base font-semibold text-gray-700 mb-3 block">
              CPF
            </Label>
            <InputMask
              mask="999.999.999-99"
              value={data.cpf}
              onChange={(e) => onChange('cpf', e.target.value)}
              maskChar={null}
              alwaysShowMask={false}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  id="edit-cpf"
                  type="text"
                  className={cn(
                    "flex h-12 w-full rounded-xl border-2 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
                    "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                  )}
                  placeholder="000.000.000-00"
                />
              )}
            </InputMask>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label htmlFor="edit-birthDate" className="text-base font-semibold text-gray-700 mb-3 block">
              Data de Nascimento
            </Label>
            <InputMask
              mask="99/99/9999"
              value={data.birthDate}
              onChange={(e) => onChange('birthDate', e.target.value)}
              maskChar={null}
              alwaysShowMask={false}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  id="edit-birthDate"
                  type="text"
                  className={cn(
                    "flex h-12 w-full rounded-xl border-2 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
                    "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                  )}
                  placeholder="DD/MM/AAAA"
                />
              )}
            </InputMask>
          </div>

          <div>
            <Label htmlFor="edit-maritalStatus" className="text-base font-semibold text-gray-700 mb-3 block">
              Estado Civil
            </Label>
            <Select value={data.maritalStatus} onValueChange={(value) => onChange('maritalStatus', value)}>
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label htmlFor="edit-email" className="text-base font-semibold text-gray-700 mb-3 block">
              Email
            </Label>
            <Input
              id="edit-email"
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="h-12 text-base border-2 rounded-xl transition-all duration-300 border-gray-200 focus:border-blue-500 hover:border-gray-300"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <Label htmlFor="edit-phone" className="text-base font-semibold text-gray-700 mb-3 block">
              Telefone (WhatsApp)
            </Label>
            <InputMask
              mask="(99) 99999-9999"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              maskChar={null}
              alwaysShowMask={false}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  id="edit-phone"
                  type="text"
                  className={cn(
                    "flex h-12 w-full rounded-xl border-2 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
                    "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                  )}
                  placeholder="(00) 00000-0000"
                />
              )}
            </InputMask>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalDataEdit;
