
import React from 'react';
import { Card } from '@/components/ui/card';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  stepTitles 
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <Card className="p-6 mb-6 bg-white shadow-sm border border-gray-100 rounded-xl">
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">{currentStep}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Etapa {currentStep} de {totalSteps}
              </h3>
              <p className="text-sm text-gray-500">
                {stepTitles[currentStep - 1]}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">
              {Math.round(progressPercentage)}%
            </span>
            <p className="text-xs text-gray-500 mt-1">concluído</p>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProgressIndicator;
