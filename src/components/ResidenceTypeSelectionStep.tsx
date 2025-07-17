
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Building } from 'lucide-react';

interface ResidenceTypeSelectionStepProps {
  residenceType: string;
  onSelect: (value: string) => void;
}

const ResidenceTypeSelectionStep: React.FC<ResidenceTypeSelectionStepProps> = ({ 
  residenceType, 
  onSelect 
}) => {
  const options = [
    {
      id: 'casa',
      label: 'Casa',
      icon: Home,
      description: 'Casa individual'
    },
    {
      id: 'apartamento',
      label: 'Apartamento',
      icon: Building,
      description: 'Apartamento em prédio'
    }
  ];

  return (
    <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          QUESTIONÁRIO DE RISCO
        </h1>
        <p className="text-xl text-gray-600">
          Você reside em:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {options.map((option) => {
          const IconComponent = option.icon;
          const isSelected = residenceType === option.id;
          
          return (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => onSelect(option.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className={`p-4 rounded-full transition-colors ${
                    isSelected 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default ResidenceTypeSelectionStep;
