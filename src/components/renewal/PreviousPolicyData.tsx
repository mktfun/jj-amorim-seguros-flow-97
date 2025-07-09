
import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { StableFormField } from '@/components/ui/stable-form-field';

interface PreviousPolicyDataType {
  seguradoraAnterior: string;
  novoBonusPG: string;
  codigoIdentificacao: string;
  numeroApoliceAnterior: string;
  vigFinalAnterior: string;
  qtdSinistros: string;
}

interface PreviousPolicyDataProps {
  data: PreviousPolicyDataType;
  onChange: (field: keyof PreviousPolicyDataType, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const PreviousPolicyData: React.FC<PreviousPolicyDataProps> = memo(({ 
  data, 
  onChange, 
  errors, 
  onFieldBlur 
}) => {
  const handleFieldChange = (field: keyof PreviousPolicyDataType) => {
    return (value: string) => onChange(field, value);
  };

  const handleFieldBlur = (field: string) => {
    return (value: string) => onFieldBlur(field, value);
  };

  return (
    <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 pb-8">
        <CardTitle className="text-4xl font-bold text-gray-800 flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div>
            <div>Dados para Renovação (Outra Corretora)</div>
            <p className="text-lg font-normal text-gray-600 mt-2">
              Informações da sua apólice anterior para processar a renovação.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10">
        <div className="space-y-8">
          <StableFormField
            id="seguradoraAnterior"
            label="Seguradora Anterior"
            value={data.seguradoraAnterior}
            onChange={handleFieldChange('seguradoraAnterior')}
            onBlur={handleFieldBlur('seguradoraAnterior')}
            error={errors.seguradoraAnterior}
            placeholder="Nome da seguradora anterior"
            required={true}
            className="space-y-3"
          />

          <div className="grid gap-8 md:grid-cols-2">
            <StableFormField
              id="novoBonusPG"
              label="Novo Bônus"
              value={data.novoBonusPG}
              onChange={handleFieldChange('novoBonusPG')}
              onBlur={handleFieldBlur('novoBonusPG')}
              error={errors.novoBonusPG}
              placeholder="0"
              type="number"
              maxLength={2}
              required={true}
              className="space-y-3"
            />

            <StableFormField
              id="qtdSinistros"
              label="Qtd. Sinistros"
              value={data.qtdSinistros}
              onChange={handleFieldChange('qtdSinistros')}
              onBlur={handleFieldBlur('qtdSinistros')}
              error={errors.qtdSinistros}
              placeholder="0"
              type="number"
              maxLength={2}
              required={true}
              className="space-y-3"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <StableFormField
              id="numeroApoliceAnterior"
              label="Número Apólice Anterior"
              value={data.numeroApoliceAnterior}
              onChange={handleFieldChange('numeroApoliceAnterior')}
              onBlur={handleFieldBlur('numeroApoliceAnterior')}
              error={errors.numeroApoliceAnterior}
              placeholder="Número da apólice anterior"
              required={true}
              className="space-y-3"
            />

            <StableFormField
              id="vigFinalAnterior"
              label="Vig. Final Anterior"
              value={data.vigFinalAnterior}
              onChange={handleFieldChange('vigFinalAnterior')}
              onBlur={handleFieldBlur('vigFinalAnterior')}
              error={errors.vigFinalAnterior}
              placeholder="dd/mm/aaaa"
              mask="99/99/9999"
              required={true}
              className="space-y-3"
            />
          </div>

          <StableFormField
            id="codigoIdentificacao"
            label="Código de Identificação"
            value={data.codigoIdentificacao}
            onChange={handleFieldChange('codigoIdentificacao')}
            onBlur={handleFieldBlur('codigoIdentificacao')}
            error={errors.codigoIdentificacao}
            placeholder="Código de identificação (opcional)"
            required={false}
            className="space-y-3"
          />

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-blue-700">Próxima etapa:</span> Vamos verificar se houve alterações nos seus dados desde a última renovação.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PreviousPolicyData.displayName = 'PreviousPolicyData';

export default PreviousPolicyData;
