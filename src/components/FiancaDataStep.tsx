
import React from 'react';
import { Card } from '@/components/ui/card';
import { StableFormField } from '@/components/ui/stable-form-field';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CEPInput from '@/components/risk-data/CEPInput';
import AddressDisplay from '@/components/risk-data/AddressDisplay';
import { useViaCEP } from '@/hooks/useViaCEP';

interface FiancaDataStepProps {
  seguradoData: {
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    profissao: string;
    rendaBrutaMensal: string;
  };
  imovelData: {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    numero: string;
    complemento: string;
    valorAluguel: string;
    valorCondominio: string;
    valorIPTU: string;
    tipoImovel: string;
    finalidadeImovel: string;
  };
  onSeguradoChange: (field: string, value: string) => void;
  onImovelChange: (field: string, value: string) => void;
  errors: { [key: string]: string };
  onFieldBlur: (field: string, value: string) => void;
}

const FiancaDataStep: React.FC<FiancaDataStepProps> = ({
  seguradoData,
  imovelData,
  onSeguradoChange,
  onImovelChange,
  errors,
  onFieldBlur
}) => {
  const { fetchAddress, loading: cepLoading, error: cepError, clearError } = useViaCEP();

  const handleCEPBlur = async (cep: string) => {
    onFieldBlur('cep', cep);
    clearError();
    
    if (cep && cep.replace(/\D/g, '').length === 8) {
      const addressData = await fetchAddress(cep);
      if (addressData) {
        onImovelChange('logradouro', addressData.logradouro);
        onImovelChange('bairro', addressData.bairro);
        onImovelChange('localidade', addressData.localidade);
        onImovelChange('uf', addressData.uf);
      }
    }
  };

  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    
    const number = parseInt(numericValue) / 100;
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleCurrencyChange = (field: string, value: string) => {
    const formattedValue = formatCurrency(value);
    if (field.includes('segurado')) {
      onSeguradoChange(field.replace('segurado.', ''), formattedValue);
    } else {
      onImovelChange(field, formattedValue);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            Cotação de Seguro Fiança - Seus Dados e do Imóvel
          </h2>
          <p className="text-gray-600">
            Preencha as informações abaixo para obter sua cotação personalizada
          </p>
        </div>

        {/* Dados do Segurado (Inquilino) */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            📋 Dados do Inquilino (Segurado)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StableFormField
              id="nomeCompleto"
              label="Nome Completo"
              value={seguradoData.nomeCompleto}
              onChange={(value) => onSeguradoChange('nomeCompleto', value)}
              onBlur={(value) => onFieldBlur('nomeCompleto', value)}
              error={errors.nomeCompleto}
              placeholder="Digite seu nome completo"
              required
              className="md:col-span-2"
            />

            <StableFormField
              id="cpf"
              label="CPF"
              value={seguradoData.cpf}
              onChange={(value) => onSeguradoChange('cpf', value)}
              onBlur={(value) => onFieldBlur('cpf', value)}
              error={errors.cpf}
              placeholder="000.000.000-00"
              mask="999.999.999-99"
              required
            />

            <StableFormField
              id="dataNascimento"
              label="Data de Nascimento"
              value={seguradoData.dataNascimento}
              onChange={(value) => onSeguradoChange('dataNascimento', value)}
              onBlur={(value) => onFieldBlur('dataNascimento', value)}
              error={errors.dataNascimento}
              placeholder="dd/mm/aaaa"
              mask="99/99/9999"
              required
            />

            <StableFormField
              id="email"
              label="Email"
              type="email"
              value={seguradoData.email}
              onChange={(value) => onSeguradoChange('email', value)}
              onBlur={(value) => onFieldBlur('email', value)}
              error={errors.email}
              placeholder="seu@email.com"
              required
            />

            <StableFormField
              id="telefone"
              label="Telefone (WhatsApp)"
              value={seguradoData.telefone}
              onChange={(value) => onSeguradoChange('telefone', value)}
              onBlur={(value) => onFieldBlur('telefone', value)}
              error={errors.telefone}
              placeholder="(00) 00000-0000"
              mask="(99) 99999-9999"
              required
            />

            <StableFormField
              id="profissao"
              label="Profissão"
              value={seguradoData.profissao}
              onChange={(value) => onSeguradoChange('profissao', value)}
              onBlur={(value) => onFieldBlur('profissao', value)}
              error={errors.profissao}
              placeholder="Digite sua profissão"
              required
            />

            <div className="md:col-span-2">
              <Label htmlFor="rendaBrutaMensal" className="text-sm font-medium text-gray-700 mb-2 block">
                Renda Bruta Mensal *
              </Label>
              <StableFormField
                id="rendaBrutaMensal"
                label=""
                value={seguradoData.rendaBrutaMensal}
                onChange={(value) => handleCurrencyChange('rendaBrutaMensal', value)}
                onBlur={(value) => onFieldBlur('rendaBrutaMensal', value)}
                error={errors.rendaBrutaMensal}
                placeholder="R$ 0,00"
                required
              />
            </div>
          </div>
        </div>

        {/* Dados do Imóvel */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            🏠 Dados do Imóvel a ser Alugado
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <CEPInput
                value={imovelData.cep}
                onChange={(value) => onImovelChange('cep', value)}
                onBlur={handleCEPBlur}
                error={errors.cep || cepError}
                loading={cepLoading}
              />
            </div>

            {(imovelData.logradouro || imovelData.bairro || imovelData.localidade) && (
              <div className="md:col-span-2">
                <AddressDisplay
                  logradouro={imovelData.logradouro}
                  bairro={imovelData.bairro}
                  localidade={imovelData.localidade}
                  uf={imovelData.uf}
                />
              </div>
            )}

            <StableFormField
              id="numero"
              label="Número"
              value={imovelData.numero}
              onChange={(value) => onImovelChange('numero', value)}
              onBlur={(value) => onFieldBlur('numero', value)}
              error={errors.numero}
              placeholder="123"
              required
            />

            <StableFormField
              id="complemento"
              label="Complemento"
              value={imovelData.complemento}
              onChange={(value) => onImovelChange('complemento', value)}
              error={errors.complemento}
              placeholder="Apto 45, Bloco B (opcional)"
            />

            <div>
              <Label htmlFor="valorAluguel" className="text-sm font-medium text-gray-700 mb-2 block">
                Valor do Aluguel Mensal *
              </Label>
              <StableFormField
                id="valorAluguel"
                label=""
                value={imovelData.valorAluguel}
                onChange={(value) => handleCurrencyChange('valorAluguel', value)}
                onBlur={(value) => onFieldBlur('valorAluguel', value)}
                error={errors.valorAluguel}
                placeholder="R$ 0,00"
                required
              />
            </div>

            <div>
              <Label htmlFor="valorCondominio" className="text-sm font-medium text-gray-700 mb-2 block">
                Valor do Condomínio (se houver)
              </Label>
              <StableFormField
                id="valorCondominio"
                label=""
                value={imovelData.valorCondominio}
                onChange={(value) => handleCurrencyChange('valorCondominio', value)}
                error={errors.valorCondominio}
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="valorIPTU" className="text-sm font-medium text-gray-700 mb-2 block">
                Valor do IPTU (se houver)
              </Label>
              <StableFormField
                id="valorIPTU"
                label=""
                value={imovelData.valorIPTU}
                onChange={(value) => handleCurrencyChange('valorIPTU', value)}
                error={errors.valorIPTU}
                placeholder="R$ 0,00"
              />
            </div>

            <div>
              <Label htmlFor="tipoImovel" className="text-sm font-medium text-gray-700 mb-2 block">
                Tipo de Imóvel *
              </Label>
              <Select value={imovelData.tipoImovel} onValueChange={(value) => onImovelChange('tipoImovel', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residencial">Residencial</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                </SelectContent>
              </Select>
              {errors.tipoImovel && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                  {errors.tipoImovel}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="finalidadeImovel" className="text-sm font-medium text-gray-700 mb-2 block">
                Finalidade do Imóvel *
              </Label>
              <Select value={imovelData.finalidadeImovel} onValueChange={(value) => onImovelChange('finalidadeImovel', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a finalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moradia">Moradia</SelectItem>
                  <SelectItem value="escritorio">Escritório</SelectItem>
                  <SelectItem value="loja">Loja</SelectItem>
                  <SelectItem value="consultorio">Consultório</SelectItem>
                  <SelectItem value="deposito">Depósito</SelectItem>
                </SelectContent>
              </Select>
              {errors.finalidadeImovel && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">!</span>
                  {errors.finalidadeImovel}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FiancaDataStep;
