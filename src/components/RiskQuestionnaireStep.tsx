
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Shield, Target, Loader2, MapPin } from 'lucide-react';
import { useViaCEP } from '@/hooks/useViaCEP';

interface RiskData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
  complemento: string;
  garageType: string;
  residenceType: string;
  usesForWork: string;
  workParking: string;
  youngResidents: string;
  youngDriversUseVehicle: string;
  youngDriverAge: string;
  youngDriverGender: string;
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
  const { fetchAddress, loading, error: cepError, clearError } = useViaCEP();

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
    clearError();
  };

  const handleCepBlur = async (value: string) => {
    onFieldBlur('cep', value);
    
    // Only fetch address if CEP is complete (8 digits)
    const cleanCep = value.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      const addressData = await fetchAddress(cleanCep);
      if (addressData) {
        onChange('logradouro', addressData.logradouro);
        onChange('bairro', addressData.bairro);
        onChange('localidade', addressData.localidade);
        onChange('uf', addressData.uf);
      } else {
        // Clear address fields if CEP is invalid
        onChange('logradouro', '');
        onChange('bairro', '');
        onChange('localidade', '');
        onChange('uf', '');
      }
    }
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
            <div className="relative">
              <Input
                id="cep"
                type="text"
                value={data.cep}
                onChange={(e) => handleCepChange(e.target.value)}
                onBlur={(e) => handleCepBlur(e.target.value)}
                className={`h-12 text-base border-2 rounded-xl transition-all duration-200 ${
                  errors.cep || cepError
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
                placeholder="00000-000"
                maxLength={9}
              />
              {loading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                </div>
              )}
            </div>
            {(errors.cep || cepError) && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                {errors.cep || cepError}
              </p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              Local onde o veículo fica durante a noite
            </p>
          </div>

          {/* Campos de Endereço */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border-l-4 border-blue-500">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Endereço Completo</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="logradouro" className="text-sm font-medium text-gray-700 mb-2 block">
                  Logradouro (Rua)
                </Label>
                <Input
                  id="logradouro"
                  type="text"
                  value={data.logradouro}
                  onChange={(e) => onChange('logradouro', e.target.value)}
                  className="h-10 text-sm border-2 rounded-lg bg-white"
                  placeholder="Rua, Avenida..."
                  readOnly
                />
              </div>

              <div>
                <Label htmlFor="bairro" className="text-sm font-medium text-gray-700 mb-2 block">
                  Bairro
                </Label>
                <Input
                  id="bairro"
                  type="text"
                  value={data.bairro}
                  onChange={(e) => onChange('bairro', e.target.value)}
                  className="h-10 text-sm border-2 rounded-lg bg-white"
                  placeholder="Bairro"
                  readOnly
                />
              </div>

              <div>
                <Label htmlFor="numero" className="text-sm font-medium text-gray-700 mb-2 block">
                  Número <span className="text-blue-600">*</span>
                </Label>
                <Input
                  id="numero"
                  type="text"
                  value={data.numero}
                  onChange={(e) => onChange('numero', e.target.value)}
                  onBlur={(e) => onFieldBlur('numero', e.target.value)}
                  className={`h-10 text-sm border-2 rounded-lg bg-white ${
                    errors.numero ? 'border-red-400' : 'border-gray-200'
                  }`}
                  placeholder="123"
                />
                {errors.numero && (
                  <p className="text-red-500 text-xs mt-1">{errors.numero}</p>
                )}
              </div>

              <div>
                <Label htmlFor="complemento" className="text-sm font-medium text-gray-700 mb-2 block">
                  Complemento (opcional)
                </Label>
                <Input
                  id="complemento"
                  type="text"
                  value={data.complemento}
                  onChange={(e) => onChange('complemento', e.target.value)}
                  className="h-10 text-sm border-2 rounded-lg bg-white"
                  placeholder="Apto 45, Bloco B..."
                />
              </div>

              <div>
                <Label htmlFor="localidade" className="text-sm font-medium text-gray-700 mb-2 block">
                  Cidade
                </Label>
                <Input
                  id="localidade"
                  type="text"
                  value={data.localidade}
                  onChange={(e) => onChange('localidade', e.target.value)}
                  className="h-10 text-sm border-2 rounded-lg bg-white"
                  placeholder="Cidade"
                  readOnly
                />
              </div>

              <div>
                <Label htmlFor="uf" className="text-sm font-medium text-gray-700 mb-2 block">
                  Estado (UF)
                </Label>
                <Input
                  id="uf"
                  type="text"
                  value={data.uf}
                  onChange={(e) => onChange('uf', e.target.value)}
                  className="h-10 text-sm border-2 rounded-lg bg-white"
                  placeholder="UF"
                  readOnly
                />
              </div>
            </div>
            
            <p className="text-gray-600 text-xs mt-3">
              📍 Endereço preenchido automaticamente com base no CEP informado
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

          <div className="space-y-6">
            <RadioQuestion
              title="Reside com pessoas entre 18 a 24 anos?"
              field="youngResidents"
            />
            
            {data.youngResidents === 'sim' && (
              <div className="ml-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-l-4 border-green-500">
                <RadioQuestion
                  title="Essa(s) pessoa(s) utiliza(m) o veículo?"
                  field="youngDriversUseVehicle"
                />
                
                {data.youngDriversUseVehicle === 'sim' && (
                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="youngDriverAge" className="text-base font-semibold text-gray-700 mb-2 block">
                          Idade do jovem condutor <span className="text-blue-600">*</span>
                        </Label>
                        <Input
                          id="youngDriverAge"
                          type="number"
                          value={data.youngDriverAge}
                          onChange={(e) => onChange('youngDriverAge', e.target.value)}
                          onBlur={(e) => onFieldBlur('youngDriverAge', e.target.value)}
                          className={`h-12 text-base border-2 rounded-xl ${
                            errors.youngDriverAge ? 'border-red-400' : 'border-gray-200'
                          }`}
                          placeholder="Ex: 20"
                          min="18"
                          max="24"
                        />
                        {errors.youngDriverAge && (
                          <p className="text-red-500 text-sm mt-1">{errors.youngDriverAge}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-base font-semibold text-gray-700 mb-4 block">
                          Sexo do jovem condutor <span className="text-blue-600">*</span>
                        </Label>
                        <RadioGroup 
                          value={data.youngDriverGender} 
                          onValueChange={(value) => onChange('youngDriverGender', value)}
                          className="grid grid-cols-1 gap-4"
                        >
                          <CustomRadioOption 
                            value="masculino" 
                            label="Masculino" 
                            field="youngDriverGender"
                          />
                          <CustomRadioOption 
                            value="feminino" 
                            label="Feminino" 
                            field="youngDriverGender"
                          />
                        </RadioGroup>
                        {errors.youngDriverGender && (
                          <p className="text-red-500 text-sm mt-1">{errors.youngDriverGender}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

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
