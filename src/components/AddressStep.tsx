
import React, { memo, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StableFormField } from '@/components/ui/stable-form-field';
import { useViaCEP } from '@/hooks/useViaCEP';
import { AlertCircle, MapPin } from 'lucide-react';

interface AddressData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
  complemento: string;
}

interface AddressStepProps {
  data: AddressData;
  onChange: (field: keyof AddressData, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const AddressStep: React.FC<AddressStepProps> = memo(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur 
}) => {
  const { fetchAddress, loading, error: cepError, clearError } = useViaCEP();

  const handleCEPChange = useCallback((value: string) => {
    onChange('cep', value);
    clearError();
  }, [onChange, clearError]);

  const handleCEPBlur = useCallback(async (cepValue: string) => {
    onFieldBlur('cep', cepValue);
    
    if (cepValue && cepValue.length === 9) {
      console.log('Buscando endereço para CEP:', cepValue);
      const addressData = await fetchAddress(cepValue);
      
      if (addressData) {
        console.log('Dados do endereço encontrados:', addressData);
        onChange('logradouro', addressData.logradouro);
        onChange('bairro', addressData.bairro);
        onChange('localidade', addressData.localidade);
        onChange('uf', addressData.uf);
      }
    }
  }, [onFieldBlur, fetchAddress, onChange]);

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg border-0 rounded-2xl">
      <CardContent className="p-8">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">
                CEP de Pernoite do Veículo
              </h2>
            </div>
            <p className="text-lg text-gray-600">
              Informe onde o veículo fica durante a noite
            </p>
          </div>

          <div className="space-y-6">
            {/* Campo CEP */}
            <div className="relative">
              <StableFormField
                id="cep"
                label="CEP de pernoite do veículo"
                value={data.cep}
                onChange={handleCEPChange}
                onBlur={handleCEPBlur}
                error={errors.cep || cepError}
                placeholder="00000-000"
                mask="99999-999"
                required
                className="w-full"
              />
              {loading && (
                <div className="absolute right-3 top-12 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>

            {/* Campos auto-preenchidos */}
            {(data.logradouro || data.bairro || data.localidade) && (
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Endereço Encontrado
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StableFormField
                    id="logradouro"
                    label="Logradouro"
                    value={data.logradouro}
                    onChange={(value) => onChange('logradouro', value)}
                    onBlur={(value) => onFieldBlur('logradouro', value)}
                    placeholder="Rua, Avenida..."
                    className="bg-white"
                  />
                  
                  <StableFormField
                    id="bairro"
                    label="Bairro"
                    value={data.bairro}
                    onChange={(value) => onChange('bairro', value)}
                    onBlur={(value) => onFieldBlur('bairro', value)}
                    placeholder="Nome do bairro"
                    className="bg-white"
                  />
                  
                  <StableFormField
                    id="localidade"
                    label="Cidade"
                    value={data.localidade}
                    onChange={(value) => onChange('localidade', value)}
                    onBlur={(value) => onFieldBlur('localidade', value)}
                    placeholder="Nome da cidade"
                    className="bg-white"
                  />
                  
                  <StableFormField
                    id="uf"
                    label="Estado"
                    value={data.uf}
                    onChange={(value) => onChange('uf', value)}
                    onBlur={(value) => onFieldBlur('uf', value)}
                    placeholder="UF"
                    maxLength={2}
                    className="bg-white"
                  />
                </div>
              </div>
            )}

            {/* Campos obrigatórios para o usuário */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Complete o endereço:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StableFormField
                  id="numero"
                  label="Número"
                  value={data.numero}
                  onChange={(value) => onChange('numero', value)}
                  onBlur={(value) => onFieldBlur('numero', value)}
                  error={errors.numero}
                  placeholder="123"
                  required
                />
                
                <StableFormField
                  id="complemento"
                  label="Complemento"
                  value={data.complemento}
                  onChange={(value) => onChange('complemento', value)}
                  onBlur={(value) => onFieldBlur('complemento', value)}
                  placeholder="Apto, Bloco, Casa..."
                />
              </div>
            </div>

            {/* Aviso sobre CEP não encontrado */}
            {cepError && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 font-medium">CEP não encontrado</p>
                    <p className="text-yellow-700 text-sm mt-1">
                      Por favor, preencha o endereço manualmente nos campos acima.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

AddressStep.displayName = 'AddressStep';

export default AddressStep;
