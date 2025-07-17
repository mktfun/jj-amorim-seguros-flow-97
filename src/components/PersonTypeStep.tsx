
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PersonTypeStepProps {
  personType: string;
  onChange: (value: string) => void;
  error?: string;
}

const PersonTypeStep: React.FC<PersonTypeStepProps> = ({
  personType,
  onChange,
  error
}) => {
  return (
    <div className="space-y-8">
      <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
            DADOS DO PRINCIPAL CONDUTOR
          </CardTitle>
          <p className="text-lg text-gray-600 mt-4">
            Você é:
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <RadioGroup
            value={personType}
            onValueChange={onChange}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2">
              <label className={`
                flex-1 p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${personType === 'fisica' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                }
              `}>
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="fisica" id="fisica" />
                  <div className="text-center flex-1">
                    <div className="font-semibold text-lg">Pessoa Física</div>
                    <div className="text-sm text-gray-500 mt-1">CPF</div>
                  </div>
                </div>
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className={`
                flex-1 p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${personType === 'juridica' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                }
              `}>
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="juridica" id="juridica" />
                  <div className="text-center flex-1">
                    <div className="font-semibold text-lg">Pessoa Jurídica</div>
                    <div className="text-sm text-gray-500 mt-1">CNPJ</div>
                  </div>
                </div>
              </label>
            </div>
          </RadioGroup>
          
          {error && (
            <p className="text-red-500 text-sm mt-4 flex items-center justify-center">
              <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
              {error}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonTypeStep;
