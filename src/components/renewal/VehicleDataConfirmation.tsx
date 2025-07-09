
import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Car } from 'lucide-react';
import { StableFormField } from '@/components/ui/stable-form-field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface VehicleData {
  model: string;
  plate: string;
  year: string;
  isFinanced: string;
}

interface VehicleDataConfirmationProps {
  data: VehicleData;
  onChange: (field: keyof VehicleData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const VehicleDataConfirmation: React.FC<VehicleDataConfirmationProps> = memo(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur 
}) => {
  const handleFieldChange = (field: keyof VehicleData) => {
    return (value: string) => onChange(field, value);
  };

  const handleFieldBlur = (field: string) => {
    return (value: string) => onFieldBlur(field, value);
  };

  const handlePlateChange = (value: string) => {
    onChange('plate', value.toUpperCase());
  };

  const handleFinancedChange = (value: string) => {
    onChange('isFinanced', value);
  };

  return (
    <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 pb-8">
        <CardTitle className="text-4xl font-bold text-gray-800 flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
            <Car className="h-8 w-8 text-white" />
          </div>
          <div>
            <div>Confirme os Dados do Veículo</div>
            <p className="text-lg font-normal text-gray-600 mt-2">
              Verifique e confirme todas as informações do seu veículo.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10">
        <div className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <StableFormField
              id="model"
              label="Modelo do Veículo"
              value={data.model}
              onChange={handleFieldChange('model')}
              onBlur={handleFieldBlur('model')}
              error={errors.model}
              placeholder="Ex: Honda Civic 2020"
              required={true}
              className="space-y-3"
            />

            <StableFormField
              id="plate"
              label="Placa"
              value={data.plate}
              onChange={handlePlateChange}
              onBlur={handleFieldBlur('plate')}
              error={errors.plate}
              placeholder="ABC-1234"
              mask="aaa-9999"
              required={true}
              className="space-y-3"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-1">
            <StableFormField
              id="year"
              label="Ano/Modelo"
              value={data.year}
              onChange={handleFieldChange('year')}
              onBlur={handleFieldBlur('year')}
              error={errors.year}
              placeholder="2020/2021"
              maxLength={9}
              required={true}
              className="space-y-3"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700 mb-4 block">
              O veículo está financiado?
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <RadioGroup 
              value={data.isFinanced} 
              onValueChange={handleFinancedChange}
              className="flex space-x-8"
            >
              <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <RadioGroupItem 
                  value="sim" 
                  id="financed-sim"
                  className="border-2 border-blue-500 w-5 h-5"
                />
                <Label 
                  htmlFor="financed-sim" 
                  className="cursor-pointer text-gray-700 font-medium text-base"
                >
                  Sim
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <RadioGroupItem 
                  value="nao" 
                  id="financed-nao"
                  className="border-2 border-blue-500 w-5 h-5"
                />
                <Label 
                  htmlFor="financed-nao" 
                  className="cursor-pointer text-gray-700 font-medium text-base"
                >
                  Não
                </Label>
              </div>
            </RadioGroup>
            {errors.isFinanced && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.isFinanced}
              </p>
            )}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-blue-700">Próxima etapa:</span> Vamos confirmar o questionário de risco.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

VehicleDataConfirmation.displayName = 'VehicleDataConfirmation';

export default VehicleDataConfirmation;
