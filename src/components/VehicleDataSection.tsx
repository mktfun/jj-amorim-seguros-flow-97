
import React, { memo } from 'react';
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

interface VehicleDataSectionProps {
  data: VehicleData;
  onChange: (field: keyof VehicleData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
  isOptional?: boolean;
}

const VehicleDataSection: React.FC<VehicleDataSectionProps> = memo(({ 
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
            <Label htmlFor="model" className="text-sm font-medium jj-blue-dark">
              Modelo do Veículo{requiredLabel}
            </Label>
            <Input
              id="model"
              type="text"
              value={data.model}
              onChange={(e) => onChange('model', e.target.value)}
              onBlur={(e) => onFieldBlur('model', e.target.value)}
              className={`mt-1 ${errors.model ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}
              placeholder={isOptional ? "Apenas se mudou" : "Ex: Honda Civic 2020"}
            />
            {errors.model && (
              <p className="text-sm text-red-500 mt-1">{errors.model}</p>
            )}
          </div>

          <div>
            <Label htmlFor="plate" className="text-sm font-medium jj-blue-dark">
              Placa{requiredLabel}
            </Label>
            <InputMask
              mask="aaa-9999"
              value={data.plate}
              onChange={(e) => onChange('plate', e.target.value.toUpperCase())}
              onBlur={(e) => onFieldBlur('plate', e.target.value)}
              maskChar={null}
              alwaysShowMask={false}
              formatChars={{
                'a': '[A-Za-z]',
                '9': '[0-9]'
              }}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  id="plate"
                  type="text"
                  className={cn(
                    "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1",
                    errors.plate ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'
                  )}
                  placeholder="ABC-1234"
                />
              )}
            </InputMask>
            {errors.plate && (
              <p className="text-sm text-red-500 mt-1">{errors.plate}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="chassis" className="text-sm font-medium jj-blue-dark">
              Chassis{requiredLabel}
            </Label>
            <Input
              id="chassis"
              type="text"
              value={data.chassis}
              onChange={(e) => onChange('chassis', e.target.value)}
              onBlur={(e) => onFieldBlur('chassis', e.target.value)}
              className={`mt-1 ${errors.chassis ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}
              placeholder={isOptional ? "Apenas se mudou" : "Número do chassis"}
              maxLength={17}
            />
            {errors.chassis && (
              <p className="text-sm text-red-500 mt-1">{errors.chassis}</p>
            )}
          </div>

          <div>
            <Label htmlFor="year" className="text-sm font-medium jj-blue-dark">
              Ano/Modelo{requiredLabel}
            </Label>
            <Input
              id="year"
              type="text"
              value={data.year}
              onChange={(e) => onChange('year', e.target.value)}
              onBlur={(e) => onFieldBlur('year', e.target.value)}
              className={`mt-1 ${errors.year ? 'border-red-500' : 'border-jj-cyan-border focus:border-primary'}`}
              placeholder={isOptional ? "Apenas se mudou" : "2020/2021"}
              maxLength={9}
            />
            {errors.year && (
              <p className="text-sm text-red-500 mt-1">{errors.year}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium jj-blue-dark mb-3 block">
            O veículo está financiado?{requiredLabel}
          </Label>
          <RadioGroup 
            value={data.isFinanced} 
            onValueChange={(value) => onChange('isFinanced', value)}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value="sim" 
                id="financed-sim"
                className="border-2 border-primary"
              />
              <Label 
                htmlFor="financed-sim" 
                className="cursor-pointer text-muted-foreground hover:jj-blue-dark"
              >
                Sim
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value="nao" 
                id="financed-nao"
                className="border-2 border-primary"
              />
              <Label 
                htmlFor="financed-nao" 
                className="cursor-pointer text-muted-foreground hover:jj-blue-dark"
              >
                Não
              </Label>
            </div>
          </RadioGroup>
          {errors.isFinanced && (
            <p className="text-sm text-red-500 mt-1">{errors.isFinanced}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

VehicleDataSection.displayName = 'VehicleDataSection';

export default VehicleDataSection;
