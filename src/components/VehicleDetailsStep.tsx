
import React from 'react';
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
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Detalhes do Veículo
        </h2>
        <p className="text-gray-600">
          Informe os dados do seu veículo
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl mx-auto">
        <StableFormField
          id="model"
          label="Qual é o Modelo do Veículo?"
          value={data.model}
          onChange={(value) => onChange('model', value)}
          onBlur={(value) => onFieldBlur('model', value)}
          error={errors.model}
          placeholder="Ex: Honda Civic, Toyota Corolla"
          required
        />

        <StableFormField
          id="plate"
          label="Placa"
          value={data.plate}
          onChange={(value) => onChange('plate', value)}
          onBlur={(value) => onFieldBlur('plate', value)}
          error={errors.plate}
          placeholder="AAA-0000 ou AAA0A00"
          required
        />

        <StableFormField
          id="year"
          label="Ano/Modelo"
          value={data.year}
          onChange={(value) => onChange('year', value)}
          onBlur={(value) => onFieldBlur('year', value)}
          error={errors.year}
          placeholder="Ex: 2023/2024"
          required
        />
      </div>
    </div>
  );
};

export default VehicleDetailsStep;
