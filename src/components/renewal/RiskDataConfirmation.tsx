
import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import StableRiskData from '@/components/stable-risk-data';

interface RiskData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
  complemento: string;
  garageType: string;
  residenceType: string;
  usesForWork: string;
  workParking: string;
  youngResidents: string;
  youngDriversUseVehicle: string;
  youngDriverAge: string;
  youngDriverGender: string;
  rideshareWork: string;
}

interface RiskDataConfirmationProps {
  data: RiskData;
  onChange: (field: keyof RiskData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const RiskDataConfirmation: React.FC<RiskDataConfirmationProps> = memo(({ 
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
            <div>Confirme o Questionário de Risco</div>
            <p className="text-lg font-normal text-gray-600 mt-2">
              Verifique e confirme todas as informações de risco do seu seguro.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10">
        <div className="space-y-8">
          <StableRiskData
            data={data}
            onChange={onChange}
            errors={errors}
            onFieldBlur={onFieldBlur}
            isOptional={false}
          />

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-blue-700">Próxima etapa:</span> Revisão final dos dados e confirmação da renovação.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

RiskDataConfirmation.displayName = 'RiskDataConfirmation';

export default RiskDataConfirmation;
