
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Shield } from 'lucide-react';

interface DataChangeQuestionProps {
  hasChanges: string;
  onChange: (value: string) => void;
  error?: string;
}

const DataChangeQuestion: React.FC<DataChangeQuestionProps> = ({ 
  hasChanges, 
  onChange, 
  error 
}) => {
  const CustomRadioOption = ({ value, label }: { value: string; label: string }) => (
    <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
      <RadioGroupItem 
        value={value} 
        id={`changes-${value}`}
        className="w-5 h-5 border-2 border-blue-500 text-blue-600"
      />
      <Label 
        htmlFor={`changes-${value}`} 
        className="cursor-pointer text-gray-700 font-medium flex-1 text-base"
      >
        {label}
      </Label>
    </div>
  );

  return (
    <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-6">
        <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          Verificação de Dados
        </CardTitle>
        <p className="text-gray-600 text-lg mt-2 ml-16">
          Vamos verificar se houve alterações nos seus dados desde a última renovação
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div>
            <Label className="text-xl font-semibold text-gray-800 mb-6 block">
              Houve alguma alteração nos seus dados ou nas condições do veículo/uso desde a última renovação/cotação?
              <span className="text-blue-600 ml-1">*</span>
            </Label>
            
            <RadioGroup 
              value={hasChanges} 
              onValueChange={onChange}
              className="space-y-4"
            >
              <CustomRadioOption 
                value="sim" 
                label="Sim, houve alterações." 
              />
              <CustomRadioOption 
                value="nao" 
                label="Não, está tudo igual." 
              />
            </RadioGroup>
            
            {error && (
              <p className="text-red-500 text-sm mt-4 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {error}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataChangeQuestion;
