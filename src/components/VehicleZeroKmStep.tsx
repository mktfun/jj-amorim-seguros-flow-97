
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Car } from 'lucide-react';

interface VehicleZeroKmStepProps {
  isZeroKm: string;
  onChange: (value: string) => void;
  error?: string;
}

const VehicleZeroKmStep: React.FC<VehicleZeroKmStepProps> = ({ 
  isZeroKm, 
  onChange,
  error 
}) => {
  const CustomRadioOption = ({ value, label }: { value: string; label: string }) => (
    <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
      <RadioGroupItem 
        value={value} 
        id={`zero-km-${value}`}
        className="w-5 h-5 border-2 border-blue-500 text-blue-600"
      />
      <Label 
        htmlFor={`zero-km-${value}`} 
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
          DADOS DO VEÍCULO
        </CardTitle>
        <p className="text-gray-600 text-lg mt-2 ml-16">
          Vamos começar com algumas informações básicas sobre seu veículo
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              O veículo é Zero Km?
            </h3>
            <RadioGroup 
              value={isZeroKm} 
              onValueChange={onChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <CustomRadioOption value="sim" label="Sim" />
              <CustomRadioOption value="nao" label="Não" />
            </RadioGroup>
            {error && (
              <p className="text-red-500 text-sm mt-4 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {error}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleZeroKmStep;
