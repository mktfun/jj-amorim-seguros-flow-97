
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, User, UserX, UserMinus } from 'lucide-react';

interface MaritalStatusSelectionStepProps {
  maritalStatus: string;
  onSelect: (value: string) => void;
}

const MaritalStatusSelectionStep: React.FC<MaritalStatusSelectionStepProps> = ({ 
  maritalStatus, 
  onSelect 
}) => {
  const options = [
    {
      id: 'casado',
      label: 'Casado',
      icon: Heart,
      description: 'Casado(a)'
    },
    {
      id: 'uniao_estavel',
      label: 'União Estável',
      icon: Users,
      description: 'União estável'
    },
    {
      id: 'solteiro',
      label: 'Solteiro',
      icon: User,
      description: 'Solteiro(a)'
    },
    {
      id: 'separado',
      label: 'Separado',
      icon: UserX,
      description: 'Separado(a)'
    },
    {
      id: 'viuvo',
      label: 'Viúvo',
      icon: UserMinus,
      description: 'Viúvo(a)'
    }
  ];

  return (
    <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Seu Estado Civil
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {options.map((option) => {
          const IconComponent = option.icon;
          const isSelected = maritalStatus === option.id;
          
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
              <CardContent className="p-4 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className={`p-3 rounded-full transition-colors ${
                    isSelected 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">
                      {option.label}
                    </h3>
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

export default MaritalStatusSelectionStep;
