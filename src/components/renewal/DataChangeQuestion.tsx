
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

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
  const CustomRadioOption = ({ value, label, icon: Icon, description }: { 
    value: string; 
    label: string; 
    icon: any;
    description: string;
  }) => (
    <div className={`flex items-center space-x-4 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
      hasChanges === value 
        ? 'border-blue-500 bg-blue-50 shadow-md' 
        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
    }`}>
      <RadioGroupItem 
        value={value} 
        id={`changes-${value}`}
        className="w-6 h-6 border-2 border-blue-500 text-blue-600"
      />
      <div className="flex items-center space-x-4 flex-1">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          hasChanges === value 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <Label 
            htmlFor={`changes-${value}`} 
            className="cursor-pointer text-gray-800 font-semibold text-xl block"
          >
            {label}
          </Label>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 pb-8">
        <CardTitle className="text-4xl font-bold text-gray-800 flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <div>Verificação de Dados</div>
            <p className="text-lg font-normal text-gray-600 mt-2">
              Vamos verificar se houve alterações nos seus dados desde a última renovação
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10">
        <div className="space-y-8">
          <div>
            <Label className="text-2xl font-semibold text-gray-800 mb-8 block">
              Houve alguma alteração nos seus dados ou nas condições do veículo/uso desde a última renovação/cotação?
              <span className="text-blue-600 ml-2">*</span>
            </Label>
            
            <RadioGroup 
              value={hasChanges} 
              onValueChange={onChange}
              className="space-y-6"
            >
              <CustomRadioOption 
                value="sim" 
                label="Sim, houve alterações" 
                icon={AlertCircle}
                description="Alguns dados mudaram e precisamos atualizá-los"
              />
              <CustomRadioOption 
                value="nao" 
                label="Não, está tudo igual" 
                icon={CheckCircle}
                description="Meus dados permanecem os mesmos da última renovação"
              />
            </RadioGroup>
            
            {error && (
              <p className="text-red-500 text-lg mt-6 flex items-center">
                <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mr-3">!</span>
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
