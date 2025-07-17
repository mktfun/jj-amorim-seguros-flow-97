
import React from 'react';
import { Card } from '@/components/ui/card';
import { StableFormField } from '@/components/ui/stable-form-field';

interface VehicleDetailsStepProps {
  data: {
    model: string;
    plate: string;
    year: string;
  };
  onChange: (field: string, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const VehicleDetailsStep: React.FC<VehicleDetailsStepProps> = ({
  data,
  onChange,
  errors,
  onFieldBlur
}) => {
  return (
    <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Detalhes do Veículo
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <StableFormField
          id="model"
          label="Qual é o Modelo do Veículo?"
          value={data.model}
          onChange={(value) => onChange('model', value)}
          onBlur={(value) => onFieldBlur('model', value)}
          error={errors.model}
          placeholder="Ex: Honda Civic, Toyota Corolla"
          required
          className="md:col-span-2"
        />

        <StableFormField
          id="plate"
          label="Placa"
          value={data.plate}
          onChange={(value) => onChange('plate', value)}
          onBlur={(value) => onFieldBlur('plate', value)}
          error={errors.plate}
          placeholder="Ex: ABC-1234 ou ABC1D23"
          required
        />

        <StableFormField
          id="year"
          label="Ano/Modelo"
          value={data.year}
          onChange={(value) => onChange('year', value)}
          onBlur={(value) => onFieldBlur('year', value)}
          error={errors.year}
          placeholder="Ex: 2020/2021"
          required
          maxLength={9}
        />
      </div>
    </Card>
  );
};

export default VehicleDetailsStep;
