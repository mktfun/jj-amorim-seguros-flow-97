
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Shield, Target } from 'lucide-react';

interface RiskData {
  cep: string;
  garageType: string;
  residenceType: string;
  usesForWork: string;
  workParking: string;
  youngResidents: string;
  rideshareWork: string;
}

interface RiskQuestionnaireStepProps {
  data: RiskData;
  onChange: (field: keyof RiskData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const RiskQuestionnaireStep: React.FC<RiskQuestionnaireStepProps> = ({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur 
}) => {
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return value;
  };

  const handleCepChange = (value: string) => {
    const formatted = formatCEP(value);
    onChange('cep', formatted);
  };

  const CustomRadioOption = ({ value, label, field }: { value: string; label: string; field: string }) => (
    <div className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
      <RadioGroupItem 
        value={value} 
        id={`${field}-${value}`}
        className="w-5 h-5 border-2 border-blue-500 text-blue-600"
      />
      <Label 
        htmlFor={`${field}-${value}`} 
        className="cursor-pointer text-gray-700 font-medium flex-1"
      >
        {label}
      </Label>
    </div>
  );

  const RadioQuestion = ({ 
    title, 
    field, 
    options = [{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }] 
  }: { 
    title: string; 
    field: keyof RiskData; 
    options?: { value: string; label: string }[] 
  }) => (
    <div className="space-y-4">
      <Label className="text-base font-semibold text-gray-700 block">
        {title} <span className="text-blue-600">*</span>
      </Label>
      <RadioGroup 
        value={data[field]} 
        onValueChange={(value) => onChange(field, value)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {options.map((option) => (
          <CustomRadioOption 
            key={option.value}
            value={option.value} 
            label={option.label} 
            field={field}
          />
        ))}
      </RadioGroup>
      {errors[field] && (
        <p className="text-red-500 text-sm flex items-center">
          <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-6">
        <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          Questionário de Risco
        </CardTitle>
        <p className="text-gray-600 text-lg mt-2 ml-16">
          Hábitos de uso e moradia - essas informações nos ajudam a calcular o melhor preço para você
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-10">
          {/* CEP */}
          <div>
            <Label htmlFor="cep" className="text-base font-semibold text-gray-700 mb-2 block">
              CEP de pernoite do veículo <span className="text-blue-600">*</span>
            </Label>
            <Input
              id="cep"
              type="text"
              value={data.cep}
              onChange={(e) => handleCepChange(e.target.value)}
              onBlur={(e) => onFieldBlur('cep', e.target.value)}
              className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                errors.cep 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
              placeholder="00000-000"
              maxLength={9}
            />
            {errors.cep && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.cep}
              </p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              Local onde o veículo fica durante a noite
            </p>
          </div>

          <RadioQuestion
            title="Na garagem, o portão é automático ou manual?"
            field="garageType"
            options={[
              { value: 'automatico', label: 'Automático' },
              { value: 'manual', label: 'Manual' }
            ]}
          />

          <RadioQuestion
            title="Reside em casa ou apto?"
            field="residenceType"
            options={[
              { value: 'casa', label: 'Casa' },
              { value: 'apto', label: 'Apartamento' }
            ]}
          />

          <div className="space-y-6">
            <RadioQuestion
              title="Utiliza o veículo para ir ao trabalho?"
              field="usesForWork"
            />
            
            {data.usesForWork === 'sim' && (
              <div className="ml-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-l-4 border-blue-500">
                <RadioQuestion
                  title="Se sim, ele fica em estacionamento fechado e exclusivo?"
                  field="workParking"
                />
              </div>
            )}
          </div>

          <RadioQuestion
            title="Reside com pessoas entre 18 a 24 anos?"
            field="youngResidents"
          />

          <RadioQuestion
            title="Utiliza o veículo para trabalhar em transporte de passageiros por App (Uber e similares)?"
            field="rideshareWork"
          />

          {/* Dica Final */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-l-4 border-green-500">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-gray-700 font-medium">Quase lá!</p>
                <p className="text-gray-600 text-sm mt-1">
                  Após finalizar essas perguntas, teremos todas as informações necessárias para calcular seu orçamento personalizado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskQuestionnaireStep;
