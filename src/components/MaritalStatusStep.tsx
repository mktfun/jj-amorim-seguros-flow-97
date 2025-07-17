
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface MaritalStatusStepProps {
  maritalStatus: string;
  onChange: (value: string) => void;
  error?: string;
}

const MaritalStatusStep: React.FC<MaritalStatusStepProps> = ({
  maritalStatus,
  onChange,
  error
}) => {
  const options = [
    { value: 'casado', label: 'Casado' },
    { value: 'uniao_estavel', label: 'União Estável' },
    { value: 'solteiro', label: 'Solteiro' },
    { value: 'separado', label: 'Separado' },
    { value: 'viuvo', label: 'Viúvo' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Seu Estado Civil
        </h2>
        <p className="text-gray-600">
          Selecione seu estado civil atual
        </p>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={maritalStatus === option.value ? "default" : "outline"}
            className={`w-full h-16 text-lg font-medium transition-all duration-200 ${
              maritalStatus === option.value
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                : 'border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-4 text-center flex items-center justify-center">
          <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default MaritalStatusStep;
