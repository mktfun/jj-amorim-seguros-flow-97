
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StableFormField } from '@/components/ui/stable-form-field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ComplementaryDataStepProps {
  data: {
    birthDate: string;
    maritalStatus: string;
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
  const maritalStatusOptions = [
    { value: 'casado', label: 'Casado' },
    { value: 'uniao_estavel', label: 'União Estável' },
    { value: 'solteiro', label: 'Solteiro' },
    { value: 'separado', label: 'Separado' },
    { value: 'viuvo', label: 'Viúvo' }
  ];

  return (
    <div className="space-y-8">
      <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
            SEUS DADOS COMPLEMENTARES
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Estado Civil */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700 block">
              Estado Civil
              <span className="text-red-500 ml-1">*</span>
            </Label>
            
            <RadioGroup
              value={data.maritalStatus}
              onValueChange={(value) => onChange('maritalStatus', value)}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {maritalStatusOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <label className={`
                    flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                    ${data.maritalStatus === option.value 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                    }
                  `}>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <div className="font-semibold">
                        {option.label}
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </RadioGroup>
            
            {errors.maritalStatus && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.maritalStatus}
              </p>
            )}
          </div>

          {/* Formulário de Dados Complementares */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Data de Nascimento */}
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

            {/* Profissão */}
            <StableFormField
              id="profession"
              label="Profissão"
              value={data.profession}
              onChange={(value) => onChange('profession', value)}
              onBlur={(value) => onFieldBlur('profession', value)}
              error={errors.profession}
              placeholder="Informe sua profissão"
              required
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplementaryDataStep;
