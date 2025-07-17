
import React from 'react';
import { Card } from '@/components/ui/card';
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
    <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Seus Dados Complementares
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <StableFormField
          id="birthDate"
          label="Data de Nascimento"
          value={data.birthDate}
          onChange={(value) => onChange('birthDate', value)}
          onBlur={(value) => onFieldBlur('birthDate', value)}
          error={errors.birthDate}
          mask="99/99/9999"
          placeholder="dd/mm/aaaa"
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
    </Card>
  );
};

export default ComplementaryDataStep;
