
import React from 'react';
import { StableFormField } from '@/components/ui/stable-form-field';

interface ComplementaryDataStepProps {
  data: {
    birthDate: string;
    profession: string;
  };
  onChange: (field: string, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const ComplementaryDataStep: React.FC<ComplementaryDataStepProps> = ({
  data,
  onChange,
  errors,
  onFieldBlur
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Seus Dados Complementares
        </h2>
        <p className="text-gray-600">
          Complete as informações necessárias
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl mx-auto">
        <StableFormField
          id="birthDate"
          label="Data de Nascimento"
          value={data.birthDate}
          onChange={(value) => onChange('birthDate', value)}
          onBlur={(value) => onFieldBlur('birthDate', value)}
          error={errors.birthDate}
          placeholder="dd/mm/aaaa"
          mask="99/99/9999"
          required
        />

        <StableFormField
          id="profession"
          label="Profissão"
          value={data.profession}
          onChange={(value) => onChange('profession', value)}
          onBlur={(value) => onFieldBlur('profession', value)}
          error={errors.profession}
          placeholder="Digite sua profissão"
          required
        />
      </div>
    </div>
  );
};

export default ComplementaryDataStep;
