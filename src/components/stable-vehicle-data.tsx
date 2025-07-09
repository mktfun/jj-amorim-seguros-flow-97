
import React, { memo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { StableFormField } from '@/components/ui/stable-form-field';

interface VehicleData {
  model: string;
  plate: string;
  year: string;
  isFinanced: string;
}

interface StableVehicleDataProps {
  data: VehicleData;
  onChange: (field: keyof VehicleData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
  isOptional?: boolean;
}

const StableVehicleData = memo<StableVehicleDataProps>(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur,
  isOptional = false
}) => {
  const handleFieldChange = useCallback((field: keyof VehicleData) => {
    return (value: string) => onChange(field, value);
  }, [onChange]);

  const handleFieldBlur = useCallback((field: string) => {
    return (value: string) => onFieldBlur(field, value);
  }, [onFieldBlur]);

  const handlePlateChange = useCallback((value: string) => {
    onChange('plate', value.toUpperCase());
  }, [onChange]);

  const handleFinancedChange = useCallback((value: string) => {
    onChange('isFinanced', value);
  }, [onChange]);

  return (
    <Card className="border-2 border-blue-100 shadow-lg rounded-2xl">
      <CardContent className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StableFormField
            id="model"
            label="Modelo do Veículo"
            value={data.model}
            onChange={handleFieldChange('model')}
            onBlur={handleFieldBlur('model')}
            error={errors.model}
            placeholder="Ex: Honda Civic 2020"
            required={!isOptional}
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
            required={!isOptional}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <StableFormField
            id="year"
            label="Ano/Modelo"
            value={data.year}
            onChange={handleFieldChange('year')}
            onBlur={handleFieldBlur('year')}
            error={errors.year}
            placeholder="2020/2021"
            maxLength={9}
            required={!isOptional}
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-4 block">
            O veículo está financiado?
            {!isOptional && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <RadioGroup 
            value={data.isFinanced} 
            onValueChange={handleFinancedChange}
            className="flex space-x-8"
          >
            <div className="flex items-center space-x-3">
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
            <div className="flex items-center space-x-3">
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
      </CardContent>
    </Card>
  );
});

StableVehicleData.displayName = 'StableVehicleData';

export default StableVehicleData;
