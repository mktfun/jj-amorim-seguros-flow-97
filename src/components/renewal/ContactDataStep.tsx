
import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import InputMask from 'react-input-mask';
import { cn } from '@/lib/utils';

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
          {/* Nome Completo */}
          <div>
            <Label htmlFor="fullName" className="text-lg font-semibold text-gray-700 mb-3 block">
              Nome Completo <span className="text-blue-600">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              value={data.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              onBlur={(e) => onFieldBlur('fullName', e.target.value)}
              className={cn(
                "h-14 text-lg border-2 rounded-2xl transition-all duration-300 focus:shadow-lg",
                errors.fullName 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              )}
              placeholder="Digite seu nome completo"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-3 flex items-center">
                <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* CPF */}
            <div>
              <Label htmlFor="cpf" className="text-lg font-semibold text-gray-700 mb-3 block">
                CPF <span className="text-blue-600">*</span>
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
                      "flex h-14 w-full rounded-2xl border-2 bg-background px-4 py-3 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 focus:shadow-lg",
                      errors.cpf 
                        ? 'border-red-400 focus:border-red-500 bg-red-50' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                    )}
                    placeholder="000.000.000-00"
                  />
                )}
              </InputMask>
              {errors.cpf && (
                <p className="text-red-500 text-sm mt-3 flex items-center">
                  <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                  {errors.cpf}
                </p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <Label htmlFor="phone" className="text-lg font-semibold text-gray-700 mb-3 block">
                Telefone (WhatsApp) <span className="text-blue-600">*</span>
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
                      "flex h-14 w-full rounded-2xl border-2 bg-background px-4 py-3 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 focus:shadow-lg",
                      errors.phone 
                        ? 'border-red-400 focus:border-red-500 bg-red-50' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                    )}
                    placeholder="(00) 00000-0000"
                  />
                )}
              </InputMask>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-3 flex items-center">
                  <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-lg font-semibold text-gray-700 mb-3 block">
              Email <span className="text-blue-600">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              onBlur={(e) => onFieldBlur('email', e.target.value)}
              className={cn(
                "h-14 text-lg border-2 rounded-2xl transition-all duration-300 focus:shadow-lg",
                errors.email 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              )}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-3 flex items-center">
                <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Texto informativo */}
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
