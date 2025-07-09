
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import InputMask from 'react-input-mask';
import { cn } from '@/lib/utils';

interface VehicleData {
  model: string;
  plate: string;
  chassis: string;
  year: string;
  isFinanced: string;
}

interface VehicleDataEditProps {
  data: VehicleData;
  onChange: (field: keyof VehicleData, value: string) => void;
}

const VehicleDataEdit: React.FC<VehicleDataEditProps> = ({ 
  data, 
  onChange
}) => {
  return (
    <Card className="border-2 border-blue-100 shadow-lg rounded-2xl">
      <CardContent className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label htmlFor="edit-model" className="text-base font-semibold text-gray-700 mb-3 block">
              Modelo do Veículo
            </Label>
            <Input
              id="edit-model"
              type="text"
              value={data.model}
              onChange={(e) => onChange('model', e.target.value)}
              className="h-12 text-base border-2 rounded-xl transition-all duration-300 border-gray-200 focus:border-blue-500 hover:border-gray-300"
              placeholder="Ex: Honda Civic 2020"
            />
          </div>

          <div>
            <Label htmlFor="edit-plate" className="text-base font-semibold text-gray-700 mb-3 block">
              Placa
            </Label>
            <InputMask
              mask="aaa-9999"
              value={data.plate}
              onChange={(e) => onChange('plate', e.target.value.toUpperCase())}
              maskChar={null}
              alwaysShowMask={false}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  id="edit-plate"
                  type="text"
                  className={cn(
                    "flex h-12 w-full rounded-xl border-2 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
                    "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                  )}
                  placeholder="ABC-1234"
                />
              )}
            </InputMask>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label htmlFor="edit-chassis" className="text-base font-semibold text-gray-700 mb-3 block">
              Chassis
            </Label>
            <Input
              id="edit-chassis"
              type="text"
              value={data.chassis}
              onChange={(e) => onChange('chassis', e.target.value)}
              className="h-12 text-base border-2 rounded-xl transition-all duration-300 border-gray-200 focus:border-blue-500 hover:border-gray-300"
              placeholder="Número do chassis"
              maxLength={17}
            />
          </div>

          <div>
            <Label htmlFor="edit-year" className="text-base font-semibold text-gray-700 mb-3 block">
              Ano/Modelo
            </Label>
            <Input
              id="edit-year"
              type="text"
              value={data.year}
              onChange={(e) => onChange('year', e.target.value)}
              className="h-12 text-base border-2 rounded-xl transition-all duration-300 border-gray-200 focus:border-blue-500 hover:border-gray-300"
              placeholder="2020/2021"
              maxLength={9}
            />
          </div>
        </div>

        <div>
          <Label className="text-base font-semibold text-gray-700 mb-4 block">
            O veículo está financiado?
          </Label>
          <RadioGroup 
            value={data.isFinanced} 
            onValueChange={(value) => onChange('isFinanced', value)}
            className="flex space-x-8"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem 
                value="sim" 
                id="edit-financed-sim"
                className="border-2 border-blue-500 w-5 h-5"
              />
              <Label 
                htmlFor="edit-financed-sim" 
                className="cursor-pointer text-gray-700 font-medium text-base"
              >
                Sim
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem 
                value="nao" 
                id="edit-financed-nao"
                className="border-2 border-blue-500 w-5 h-5"
              />
              <Label 
                htmlFor="edit-financed-nao" 
                className="cursor-pointer text-gray-700 font-medium text-base"
              >
                Não
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleDataEdit;
