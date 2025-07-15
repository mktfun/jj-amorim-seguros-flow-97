
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Car } from 'lucide-react';
import InputMask from 'react-input-mask';
import { cn } from '@/lib/utils';

interface VehicleDetailsData {
  model: string;
  plate: string;
  year: string;
  isFinanced: string;
}

interface VehicleDetailsStepProps {
  data: VehicleDetailsData;
  onChange: (field: keyof VehicleDetailsData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const VehicleDetailsStep: React.FC<VehicleDetailsStepProps> = ({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur 
}) => {
  const currentYear = new Date().getFullYear();

  const CustomRadioOption = ({ value, label }: { value: string; label: string }) => (
    <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
      <RadioGroupItem 
        value={value} 
        id={`financed-${value}`}
        className="w-5 h-5 border-2 border-blue-500 text-blue-600"
      />
      <Label 
        htmlFor={`financed-${value}`} 
        className="cursor-pointer text-gray-700 font-medium flex-1 text-lg"
      >
        {label}
      </Label>
    </div>
  );

  return (
    <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-6">
        <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
            <Car className="h-6 w-6 text-white" />
          </div>
          Detalhes do Veículo
        </CardTitle>
        <p className="text-gray-600 text-lg mt-2 ml-16">
          Agora precisamos de informações específicas sobre seu veículo
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Modelo */}
          <div>
            <Label htmlFor="model" className="text-base font-semibold text-gray-700 mb-2 block">
              Qual é o Modelo do Veículo? <span className="text-blue-600">*</span>
            </Label>
            <Input
              id="model"
              type="text"
              value={data.model}
              onChange={(e) => onChange('model', e.target.value)}
              onBlur={(e) => onFieldBlur('model', e.target.value)}
              className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                errors.model 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
              placeholder="Ex: Honda Civic, Toyota Corolla, Chevrolet Onix"
            />
            {errors.model && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.model}
              </p>
            )}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Placa */}
            <div>
              <Label htmlFor="plate" className="text-base font-semibold text-gray-700 mb-2 block">
                Placa <span className="text-blue-600">*</span>
              </Label>
              <InputMask
                mask="aaa-9999"
                value={data.plate}
                onChange={(e) => onChange('plate', e.target.value.toUpperCase())}
                onBlur={(e) => onFieldBlur('plate', e.target.value)}
                maskChar={null}
                alwaysShowMask={false}
              >
                {(inputProps: any) => (
                  <input
                    {...inputProps}
                    id="plate"
                    type="text"
                    className={cn(
                      "flex h-12 w-full rounded-xl border-2 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-base transition-all duration-200",
                      errors.plate 
                        ? 'border-red-400 focus:border-red-500 bg-red-50' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                    )}
                    placeholder="ABC-1234"
                  />
                )}
              </InputMask>
              {errors.plate && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                  {errors.plate}
                </p>
              )}
            </div>

            {/* Ano */}
            <div>
              <Label htmlFor="year" className="text-base font-semibold text-gray-700 mb-2 block">
                Ano/Modelo <span className="text-blue-600">*</span>
              </Label>
              <Input
                id="year"
                type="number"
                value={data.year}
                onChange={(e) => onChange('year', e.target.value)}
                onBlur={(e) => onFieldBlur('year', e.target.value)}
                className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                  errors.year 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
                placeholder={`Ex: ${currentYear}`}
                min="1990"
                max={currentYear + 1}
              />
              {errors.year && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                  {errors.year}
                </p>
              )}
            </div>
          </div>

          {/* Financiado */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Está financiado?
            </h3>
            <RadioGroup 
              value={data.isFinanced} 
              onValueChange={(value) => onChange('isFinanced', value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <CustomRadioOption value="sim" label="Sim" />
              <CustomRadioOption value="nao" label="Não" />
            </RadioGroup>
            {errors.isFinanced && (
              <p className="text-red-500 text-sm mt-4 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.isFinanced}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleDetailsStep;
