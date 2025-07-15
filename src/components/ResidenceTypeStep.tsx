
import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ResidenceTypeStepProps {
  residenceType: string;
  onChange: (value: string) => void;
  error?: string;
}

const ResidenceTypeStep: React.FC<ResidenceTypeStepProps> = memo(({ 
  residenceType, 
  onChange, 
  error 
}) => {
  const residenceOptions = [
    { value: 'casa', label: 'Casa', icon: '🏠' },
    { value: 'apartamento', label: 'Apartamento', icon: '🏢' }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg border-0 rounded-2xl">
      <CardContent className="p-8">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-800">
              QUESTIONÁRIO DE RISCO
            </h2>
            <p className="text-lg text-gray-600">
              Você Reside em:
            </p>
          </div>

          <div className="flex justify-center">
            <RadioGroup 
              value={residenceType} 
              onValueChange={onChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl"
            >
              {residenceOptions.map((option) => (
                <div key={option.value} className="relative">
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={option.value}
                    className={`
                      flex flex-col items-center justify-center p-8 rounded-xl border-2 cursor-pointer
                      transition-all duration-200 hover:shadow-lg hover:scale-105
                      ${residenceType === option.value 
                        ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg' 
                        : 'border-gray-200 bg-white hover:border-blue-300'
                      }
                    `}
                  >
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <span className={`text-lg font-semibold ${
                      residenceType === option.value ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {option.label}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {error && (
            <div className="text-center">
              <p className="text-red-500 text-sm flex items-center justify-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {error}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

ResidenceTypeStep.displayName = 'ResidenceTypeStep';

export default ResidenceTypeStep;
